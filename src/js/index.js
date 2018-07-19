require.config({
	paths: {
		// "jquery": "jquery.min",
		"body": "../tpl/body"
	}
})

require(['../tpl/body'], function (body) {
	var data = {
		user1: {
			name: 'a',
			email: '1@q.com'
		},
		user2: {
			name: 'b',
			email: '2@q.com'
		},
		list: ['a', 'b', 'c', 'd']
	}
	var html = body(data);
	
	document.getElementById('body').innerHTML = html;
});
