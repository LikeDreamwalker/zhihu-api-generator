// 作者： LikeDreamwalker
// 版本： Ver 1.20
// 更新日期： 20200912
// 想要了解更多有关LikeDreamwalker的内容？
// 访问： ldwid.com

// 获取具有ContentItem类属性的元素, 得到数组
let ContentItems = document.getElementsByClassName("ContentItem");
console.log(ContentItems);
let info = {};
for (item in ContentItems) {
	// 转换item，防止类型不匹配报错
	let temp = parseInt(item);
	// 获取headline
	let headline = getElementByAttr(
		"meta",
		"itemprop",
		"headline",
		ContentItems,
		temp
	)[0].getAttribute("content");
	// 获取url
	let url = getElementByAttr("meta", "itemprop", "url", ContentItems, temp)[1]
		.getAttribute("content")
		.substring(2);
	// 获取dataP
	let dataP = getElementByAttr(
		"meta",
		"itemprop",
		"datePublished",
		ContentItems,
		temp
	)[0].getAttribute("content");
	// 获取dataM
	let dataM = getElementByAttr(
		"meta",
		"itemprop",
		"dateModified",
		ContentItems,
		temp
	)[0].getAttribute("content");
	// 获取img
	let img = getElementByAttr(
		"meta",
		"itemprop",
		"image",
		ContentItems,
		temp
	)[1].getAttribute("content");
	// 获取text
	// 使用textContent规避元素内子元素
	let text = getElementByAttr(
		"span",
		"itemprop",
		"articleBody",
		ContentItems,
		temp
	)[0].textContent;
	// 存储至info对象
	info[item] = new Articles(headline, url, dataP, dataM, img, text);

	// 判断遍历是否完成
	if (temp === ContentItems.length - 1) {
		++temp;
		console.log("Complete. We got " + temp + " articles.");
		// 加入length属性
		info.length = temp;
		console.log(info.length);
		break;
	}
}
// 保存为json
let authorName = document.getElementsByClassName("ProfileHeader-name")[0]
	.textContent;
saveJSON(info, authorName + ".json");
alert("即将下载一个该页面用户名.json的文件，请避免浏览器拦截");

// 导出json
function saveJSON(data, filename) {
	if (!data) {
		alert(
			"获取的内容有错误，你可能使用了过时的脚本或者该脚本还未更新，请联系我"
		);
		return;
	}
	if (typeof data === "object") {
		data = JSON.stringify(data, undefined, 4);
	}
	let blob = new Blob([data], { type: "text/json" }),
		e = document.createEvent("MouseEvents"),
		a = document.createElement("a");
	a.download = filename;
	a.href = window.URL.createObjectURL(blob);
	a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
	e.initMouseEvent(
		"click",
		true,
		false,
		window,
		0,
		0,
		0,
		0,
		0,
		false,
		false,
		false,
		false,
		0,
		null
	);
	a.dispatchEvent(e);
}
// 依据属性值获取元素
function getElementByAttr(tag, attr, value, cla, temp) {
	let aElements = cla[temp].getElementsByTagName(tag);
	let aEle = [];
	for (let i = 0; i < aElements.length; i++) {
		if (aElements[i].getAttribute(attr) == value) aEle.push(aElements[i]);
	}
	console.log(aEle);
	return aEle;
}
// 构造函数
function Articles(headline, url, dateP, dateM, img, text) {
	this.headline = headline;
	this.url = url;
	this.dateP = dateP;
	this.dateM = dateM;
	this.img = img;
	this.text = text;
}
