// require.js配置
require.config({ // 也可以写作requirejs.config()
	baseUrl: '../tpl', // BUG:基地址必须指向模板文件夹，否则引用的main不能正确定位template位置 
	paths: { // 配置路径 
		// 'jquery': '/js/lib/jquery.min', // 在启动服务器调试时候，服务器地址为“build”目录，开头的“/”为根目录，所以“/”目录就是“build”目录，可以执行，但是打包静态文件后不能执行
		'jquery': '../js/lib/jquery.min',// 静态文件下打开网页会根据文件所处位置定位根目录到(C|D|E|F……)盘，所以应该使用相对路径，避免使用绝对路径
		'echarts': '../js/lib/echarts.min',
		'Mock': '../js/lib/mock.min',
		'main': './main', // 因为“baseUrl”目录是“/tpl”目录，所以此处写“main”。实际位置 = baseUrl + main
		'content': './content',
		'mockConfig': '../js/mock.config'
	}
})

// 主函数
require(['jquery', 'Mock', 'echarts', 'main', 'content', 'mockConfig'], ($, Mock, echarts, main, content, mockConfig) => {
	// 显示首页结构和内容
	$('#main').html(main({}));
	
	// 模拟数据集
	Mock.mock('http://localhost:8000',{
		'name|+1': mockConfig.names,
		'sex|1': ['男', '女'],
		'birthplace|1': mockConfig.birthplace,
		'birthday|1': mockConfig.birthday,
	})
	
	// 发起数据请求并传递给模板引擎渲染
	$('button').on('click', () => {
		$.ajax({
			url: 'http://localhost:8000',
			dataType: 'json',
			success: user => {
				$('#content').html(content(user));
			}
		})
	})
	
	
});
