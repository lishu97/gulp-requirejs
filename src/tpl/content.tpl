<div id="content">
	{{if name}}
		<p><span>姓名</span><span>：</span>{{name}}</p>
		<p><span>性别</span><span>：</span>{{sex}}</p>
		<p><span>出生地</span><span>：</span>{{birthplace}}</p>
		<p><span>出生日期</span><span>：</span>{{birthday}}</p>
	{{else}}
		<p>点击按钮获取用户信息</p>
	{{/if}}
</div>