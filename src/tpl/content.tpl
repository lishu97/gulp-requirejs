{{if user1}}
	<p>{{user1.name}}</p>
	<p>{{user1.email}}</p>
{{else if user2}}
	<p>{{user2.name}}</p>
	<p>{{user2.email}}</p>
{{else}}
	<p>当前不存在用户</p>
{{/if}}
<ul>
	{{each list as value index}}
		<li>{{index}} {{value}}</li>
	{{/each}}
	<p>=======================================================================</p>
	{{each list}}
		<li>{{$index}} {{$value}}</li>
	{{/each}}
</ul>