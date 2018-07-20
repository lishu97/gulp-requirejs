<div id="content">
	{{if user1}}
		<p><span>用户名</span><span>：</span>{{user1.name}}</p>
		<p><span>邮箱</span><span>：</span>{{user1.email}}</p>
	{{else if user2}}
		<p><span>用户名</span><span>：</span>{{user2.name}}</p>
		<p><span>邮箱</span><span>：</span>{{user2.email}}</p>
	{{else}}
		<p>当前不存在用户</p>
	{{/if}}
	<ul>
		{{each list as value index}}
			<li>{{index}} ================= {{value}}</li>
		{{/each}}
	</ul>
</div>