# zhihu-articles-api

将你的知乎文章导出为可使用的API（.json)。

## 什么是 zhihu-articles-api ？

zhihu-articles-api是一个基于JavaScript DOM的脚本，通过DOM方式将你的知乎文章导出为json格式的API文档，其中包括了标题，链接，题图等信息，你可以在其他站点又或者是你自己的站点中使用这些API，从而显示你创作的内容。当用户访问这些内容时，用户会跳转到知乎，从而对你的内容进行赞同、评论等操作。

## 如何使用zhihu-articles-api？

和其他的JavaScript脚本一样，你需要使用浏览器的调试功能执行这些脚本。

**首先，你需要访问到你的个人主页。**

知乎的个人主页一般为：

*www.zhihu.com/people/你的个人域名*

如果你不清楚你的个人域名，你可以从首页右上角头像处，访问“我的主页”。

**切换到“文章”选项卡**

zaa只能在该选项卡下工作。

*如果你期望导出其他的内容，请务必仔细阅读源码并修改相关内容*。

**在该选项卡下，通过调试执行脚本，浏览器将会自动下载一个名为*用户名.json*的文件。**

脚本：https://github.com/LikeDreamwalker/zhihu-articles-json/blob/master/zhihu.js

示例：

`{
    "Article_0": {
        "headline": "为K100 Pro更换更大容量的电池",
        "url": "zhuanlan.zhihu.com/p/205607070",
        "dateP": "2020-08-29T14:22:15.000Z",
        "dateM": "2020-09-01T17:17:49.000Z",
        "img": "https://pic4.zhimg.com/v2-8ac0ec7ef990ca579657ae5b8bea714c_r.jpg"
    },
    "Article_1": {
        "headline": "ES6动态计算属性名的另外一种用法/属性名表达式",
        "url": "zhuanlan.zhihu.com/p/199698763",
        "dateP": "2020-08-26T15:24:06.000Z",
        "dateM": "2020-08-27T02:42:41.000Z",
        "img": "https://pic4.zhimg.com/v2-8ac0ec7ef990ca579657ae5b8bea714c_r.jpg"
    },
    "Article_2": {
        "headline": "为Vuetify的UI组件添加滚动条",
        "url": "zhuanlan.zhihu.com/p/196736891",
        "dateP": "2020-08-24T10:25:53.000Z",
        "dateM": "2020-08-24T10:25:53.000Z",
        "img": "https://pic4.zhimg.com/v2-8ac0ec7ef990ca579657ae5b8bea714c_r.jpg"
    },
    "Article_3": {
        "headline": "解决移动端左右滑动/溢出问题",
        "url": "zhuanlan.zhihu.com/p/194403402",
        "dateP": "2020-08-22T16:20:05.000Z",
        "dateM": "2020-08-22T16:20:05.000Z",
        "img": "https://pic4.zhimg.com/v2-8ac0ec7ef990ca579657ae5b8bea714c_r.jpg"
    },
    ...`

## zhihu-articles-api合法吗？

正如所有的爬虫，API等等内容，请确保你在相关用户协议的规范下使用你获取的内容。

由于zhihu-articles-api使用DOM进行操作，获取的是公开可获取且已经加载在用户端的内容，所以我不认为这会导致违法行为。

但是，请不要将此脚本用于非你创作的内容，也不要将此脚本获取的内容用于商业目的，我不承担由于使用此脚本所造成的一切责任。

## 我还是不明白这个脚本有什么用

对于基于Github托管的静态页面来说，如何动态的生成博文是非常棘手的问题。如果使用常见的静态页面生成器（markdown），虽然可行，但是依然不便于更新，也不便于维护。而个人站点往往拥有较少的流量，也不利于实现创作内容的分发。

通过zhihu-articles-api，将你的文章转化为API，并生成json文件。将此文件部署到对象存储，并进行CDN分发。通过基于此json文件生成文章列表，就可以实现创作内容的迁移。而只要在云端修改此json文件，就可以实现动态修改静态页面的内容，而不再需要重新生成静态页面。

简单来说，**你将创作的内容托管于知乎，相关的静态资源也托管于知乎的服务器。**

## 已知问题 与 版本更新：

Ver 1.00：

如果你的题图是.png格式的透明文件，知乎有可能在服务器上同时生成了白底与源文件两个文件，当你通过zhihu-articles-api生成json文件后，仅能访问到前者。如果你的站点使用暗色主题或者夜间模式，有必要考虑使用其他来源的.png文件替换知乎源文件。