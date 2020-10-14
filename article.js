// 作者： LikeDreamwalker
// 版本： Ver 3.10
// 更新日期： 20201014
// 想要了解更多有关LikeDreamwalker的内容？
// 访问： ldwid.com
// 联系我： a@ldwid.com / ldw@ldwid.com

// 最终数组
alert("如果你遇到的undefined错误，请尝试更换浏览器或网络环境");
let mainArray = [];
recursion(mainArray);

// 获取内容
// info是目标对象，items是DOM对象
function getInfo(info, items) {
	for (item in items) {
		// 转换item，防止类型不匹配报错
		let temp = parseInt(item);
		// 获取headline
		let headline = getElementByAttr(
			"meta",
			"itemprop",
			"headline",
			items,
			temp
		)[0].getAttribute("content");
		// 获取url
		let url =
			"https://" +
			getElementByAttr("meta", "itemprop", "url", items, temp)[1]
				.getAttribute("content")
				.substring(2);
		// 获取dataP
		let dataP = getElementByAttr(
			"meta",
			"itemprop",
			"datePublished",
			items,
			temp
		)[0].getAttribute("content");
		// 获取dataM
		let dataM = getElementByAttr(
			"meta",
			"itemprop",
			"dateModified",
			items,
			temp
		)[0].getAttribute("content");
		// 获取img
		let img = getElementByAttr(
			"meta",
			"itemprop",
			"image",
			items,
			temp
		)[1].getAttribute("content");
		// 获取text
		// 使用textContent规避元素内子元素
		let text = getElementByAttr(
			"span",
			"itemprop",
			"articleBody",
			items,
			temp
		)[0].textContent;
		// 存储至info对象
		info[item] = new Articles(headline, url, dataP, dataM, img, text);
		// 判断遍历是否完成
		if (temp === items.length - 1) {
			break;
		}
	}
	// 构造函数
	function Articles(headline, url, dateP, dateM, img, text) {
		this.headline = headline;
		this.url = url;
		this.dateP = dateP;
		this.dateM = dateM;
		this.img = img;
		this.text = text;
		// 标识状态
		this.status = false;
		// 标识状态（备用）
		this.statusB = true;
	}
}
// 导出json
function saveJSON(data, filename) {
	if (!data) {
		alert(
			"获取的内容有错误，你可能使用了过时的脚本或者该脚本还未更新，请联系我"
		);
		return;
	}
	data = JSON.stringify(data, undefined, 4);
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
		if (aElements[i].getAttribute(attr) === value) {
			aEle.push(aElements[i]);
		}
	}
	return aEle;
}
// 依据innerText获取元素
// tag: 标签名 innerText: 元素内文字 fCla: 包含tag的父级元素 index: fCla的索引
function getElementByInnerText(tag, innerText, fCla, index) {
	// 依据提供的fCla获取对象
	let Cla = document.getElementsByClassName(fCla);
	// 在fCla中获取到的所有具有tag标签的元素
	let tagElements = Cla[index].getElementsByTagName(tag);
	// 声明具有innerText的元素的数组
	let iTElements = [];
	for (let i = 0; i < tagElements.length; i++) {
		if (tagElements[i].innerText === innerText) {
			iTElements.push(tagElements[i]);
		}
	}
	if (iTElements.length === 0) {
		throw "Get element failed. ";
	}
	return iTElements;
}

// 合并对象
function merge(mainArray, newObj) {
	let length = mainArray.length;
	for (let key in newObj) {
		if (newObj.hasOwnProperty(key)) {
			let a = length + parseInt(key);
			mainArray[a] = { ...newObj[key] };
		}
	}
}
// 开发者
function developer(authorName) {
	console.log(
		"%c\n       ",
		"font-size:80px;background:url('https://ldwid-1258491808.cos.ap-beijing.myqcloud.com/LDW_2020_Web_Small.png')no-repeat;"
	);
	console.log(
		"你好 " +
			authorName +
			"\n感谢使用zhihu-api-generator/article.js，如果您对我感兴趣或者想雇佣我\n可访问 ldwid.com\n或发送邮件至 a@ldwid.com ldw@ldwid.com(仅备用)"
	);
	console.log("%c      LikeDreamwalker 2012 - 2020", "color:#0066ff;");
	alert("即将下载" + authorName + "_article" + ".json，请避免浏览器拦截");
}
// 递归
function recursion(mainArray) {
	// DOM
	let contentItems = document.getElementsByClassName("ContentItem");
	// info
	let info = {};
	// status 默认存在下一页
	let status = true;
	// 使用定时器将多个同步操作转化为异步操作
	setTimeout(() => {
		try {
			// 检测是否存在下一页按钮，如果存在则不抛出错误
			let btn = getElementByInnerText("button", "下一页", "Pagination", 0);
		} catch (error) {
			status = false;
		}
	}, 0);
	setTimeout(() => {
		if (status) {
			setTimeout(() => {
				// 当下一页存在时
				let btn = getElementByInnerText("button", "下一页", "Pagination", 0);
				// let domStatus = false;
				// 捕获DOM
				getInfo(info, contentItems);
				// 将DOM内容存储于mainArray
				merge(mainArray, info);
				// 跳转下一页
				btn[0].click();
			}, 0);
			// 如果你遇到了undefined错误，请尝试适当增加等待时间，如1500，2000
			// 过长的时间会导致性能与效率降低
			setTimeout(() => {
				// 递归，期望捕获下一页的内容，并且再次检测下一页是否存在
				recursion(mainArray);
			}, 100);
		} else {
			// 当下一页不存在时
			getInfo(info, contentItems);
			merge(mainArray, info);
			console.table(mainArray);
			let authorName = document.getElementsByClassName("ProfileHeader-name")[0]
				.textContent;
			developer(authorName);
			// 保存为json
			saveJSON(mainArray, authorName + ".json");
			return true;
		}
	}, 0);
}
