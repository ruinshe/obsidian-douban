import SettingsManager from "../setting/SettingsManager";
import {request, RequestUrlParam} from "obsidian";
import {CheerioAPI, load} from "cheerio";
import {log} from "../../utils/Logutil";
import {i18nHelper} from "../../lang/helper";
import User from "./User";
import StringUtil from "../../utils/StringUtil";

export default class UserComponent {
	private settingsManager: SettingsManager;
	private user: User;

	constructor(settingsManager: SettingsManager) {
		this.settingsManager = settingsManager;

	}

	getUser() {
		return this.user;
	}

	getUserId() {
		return this.user?this.user.id:null;
	}


	isLogin() {
		return this.user && this.user.login;
	}

	logout() {
		if (this.user) {
			this.user.login = false;
		}
		this.user = null;
		this.settingsManager.updateSetting('loginCookiesContent', '');
	}



	needLogin() {
		const cookie:any = this.settingsManager.getSetting('loginCookiesContent') ;
		if(!cookie) {
			return false;
		}
		return !this.isLogin();
	}

	async loginByCookie():Promise<User> {
		let cookie = this.settingsManager.getSetting('loginCookiesContent');
		if(!cookie) {
			this.settingsManager.debug('主界面:loginByCookie:无豆瓣cookies信息，获取用户信息失败');
			return new User();
		}
		this.settingsManager.debug('主界面:loginByCookie:豆瓣cookies信息正常，尝试获取用户信息');
		await this.loadUserInfo(cookie).then(user => {
			this.user = user;
			this.settingsManager.debug(`主界面:loginByCookie:豆瓣cookies信息正常，${user&&user.id?'获取用户信息成功id:'+ StringUtil.confuse(user.id) + ',用户名:'+ StringUtil.confuse(user.name) :'获取用户信息失败'}`);
		});
		return this.user;
	}

	async loginCookie(cookie: any):Promise<User> {
		if(!cookie) {
			return new User();
		}
		this.settingsManager.debug('配置界面:loginCookie:豆瓣cookies信息正常，尝试获取用户信息');
		await this.loadUserInfo(cookie).then(user => {
			this.user = user;
			this.settingsManager.debug(`配置界面:loginCookie:豆瓣cookies信息正常，${user&&user.id?'获取用户信息成功id:'+ StringUtil.confuse(user.id) + ',用户名:'+ StringUtil.confuse(user.name) :'获取用户信息失败'}`);
		});
		if(this.user) {
			this.settingsManager.updateSetting('loginCookiesContent', cookie);
		}
		return this.user;
	}

	 async loadUserInfo(cookie: any): Promise<User> {
		let requestUrlParam: RequestUrlParam = {
			url: 'https://www.douban.com/mine/',
			method: "GET",
			headers: {'Cookie': cookie},
			throw: true
		};
		 this.settingsManager.debug('loadUserInfo:尝试获取用户信息:https://www.douban.com/mine/');
		 return request(requestUrlParam)
			 .then(requestUrlResponse => {
				 if (requestUrlResponse.indexOf('https://sec.douban.com/a') > 0) {
					 throw new Error(i18nHelper.getMessage('130105'));
				 }
				 return requestUrlResponse;
			 })
			.then(load)
			.then(this.getUserInfo)
			.catch(e =>  {
				if(e.toString().indexOf('403') > 0) {
					throw new Error(i18nHelper.getMessage('130105'));
				}else {
					throw log.error(i18nHelper.getMessage('130101').replace('{0}',   e.toString()), e)
				}
			});
	};


	private getUserInfo(dataHtml: CheerioAPI): User {
		let elements = dataHtml("#db-usr-profile > div.pic > a");
		if (!elements) {
			return new User();
		}
		let name = dataHtml(dataHtml("head > title").get(0)).text().trim();
		let userUrl = dataHtml(elements.get(0)).attr("href");
		if (!name && !userUrl) {
			return new User();
		}
		let id = '';
		if (userUrl && userUrl.indexOf('people/') > 0) {
			id = userUrl.substring(userUrl.lastIndexOf('people/') + 7, userUrl.lastIndexOf('/'));
		}
		return {
			id: id,
			name: name,
			url: userUrl,
			login: true
		};
	};

}
