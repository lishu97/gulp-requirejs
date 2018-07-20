// require.js配置
require.config({ // 也可以写作requirejs.config()
	baseUrl: '../tpl', // BUG:基地址必须指向模板文件夹，否则引用的main不能正确定位template位置 
	paths: { // 配置路径 
		// "jquery": "/js/lib/jquery.min", // 在启动服务器调试时候，服务器地址为“build”目录，开头的“/”为根目录，所以“/”目录就是“build”目录，可以执行，但是打包静态文件后不能执行
		"jquery": "../js/lib/jquery.min",// 静态文件下打开网页会根据文件所处位置定位根目录到(C|D|E|F……)盘，所以应该使用相对路径，避免使用绝对路径
		"main": "./main" // 因为“baseUrl”目录是“/tpl”目录，所以此处写“main”。实际位置 = baseUrl + main
	}
})

// 主函数
require(['jquery', "main"], function ($, main) {
	var data = {
		user1: {
			name: 'xiaoming',
			email: 'xiaoming@email.com'
		},
		user2: {
			name: 'username2',
			email: 'username2@email.com'
		},
		imgSrc: "../img/62d8efadgw1ej30downrsj20hs0hq0ws.jpg",
		list: ['a', 'b', 'c', 'd', 'e', 'f'],
		footer: 'goodbye'
	}
	
	var html = main(data);
	document.getElementById('main').innerHTML = html;
	
	$('#header').css({background: 'red'})
	
});
