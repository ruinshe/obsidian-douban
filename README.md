# Obsidian Douban Plugin

![GitHub release](https://img.shields.io/github/v/release/Wanxp/obsidian-douban)

Import Movies, Books, Music Data from Douban in [Obsidian](https://obsidian.md/)

在[Obsidian](https://obsidian.md/)使用并导入豆瓣中的电影/音乐/以及书籍等, 评分/发布日期/演员表等信息

If you want some features or have any questions about this plugin, create issues or join the development is welcome.
关于当前的插件如果有任何疑问或者想要什么功能, 欢迎提issues或加入到开发当中.

- [Bugs, Issues, & Feature Requests](https://github.com/Wanxp/obsidian-douban/issues)
- [Development Roadmap](https://github.com/users/Wanxp/projects/1)


## Target
- [x] Movie/电影
- [x] Teleplay/电视剧
- [x] Book/书籍
- [x] Music/音乐
- [x] Note/日记
- [ ] Broadcast/广播

## How to use
### Movie
- Search Movie By Input Text/通过输入文本搜索
![Search Movie By Input Text](./doc/search_by_input.gif)

- Search Movie By File Name/通过文件名搜索
![Search Movie By File Name](./doc/search_by_file_name.gif)

## Settings
- Setting Example1/设置案例1
![Setting Example1](./doc/setting_zh.gif)


- Setting Example2/设置案例2
![Setting Example2](./doc/setting_en.gif)

## How to install 
### From Obsidian 
1. Go to Obsidian plugin center/进入Obsidian插件中心
2. Search obsidian-douban/搜索obsidian-douban
3. Click install/安装
4. Enable plugin/开启插件
### Manmel
1. Download `main.js`, `manifest.json`, `styles.css` from GitHub release page  
从Github release 页面下载 `main.js`, `manifest.json`, `styles.css`
2. Copy step1 downloaded file to your vault folder `/.obsidian/plugins/obsidian-douban/`    
将下载的文件复制到你的Obsidian文档根目录下的`/.obsidian/plugins/obsidian-douban`路径,若不存在则新建文件夹(注意.obsidian文件夹可能是个隐藏为文件夹)  
3. Enable plugin in Obsidian  
在obsidian插件中心开启当前插件功能
## How to Develop
1. Enter your test vault folder `/.obsidian/plugins/`  
进入你的Obsidian测试文档文件夹下的`/.obsidian/plugins/`  
2. Clone Code/克隆代码  
`git clone git@github.com:Wanxp/obsidian-douban.git`  
3. Enter folder/进入代码文件夹  
`cd obsidian-douban`  
4. Build/构建  
`npm run build`  
5. Run and Watch code change/运行  
`npm run dev`  
6. Go to your Obsidian plugin center reload this plugin  
进入Obsidian插件中心重新加载当前插件  
7. Enjoy your develop  
享受开发吧  