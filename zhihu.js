// 作者： LikeDreamwalker
// 版本： Ver 1.00
// 更新日期： 20200907
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
	info["Article_" + item] = new Articles(headline, url, dataP, dataM, img);
	// 判断遍历是否完成
	if (temp === ContentItems.length - 1) {
		temp++;
		console.log("Complete. We got " + temp + " articles.");
		break;
	}
}
// 保存为json
let authorName = document.getElementsByClassName("ProfileHeader-name")[0]
	.textContent;
saveJSON(info, authorName + ".json");

// 导出json
function saveJSON(data, filename) {
	if (!data) {
		alert("未得到数据");
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
function Articles(headline, url, dateP, dateM, img) {
	this.headline = headline;
	this.url = url;
	this.dateP = dateP;
	this.dateM = dateM;
	this.img = img;
}
