<template>
	<div class="matter">
		<div class="top">CR{{$t('matter.matter')}}</div>
		<div class="bots">
			<p>1、{{$t('matter.bound')}}</p>
			<p>2、{{$t('matter.deal')}}</p>
			<p>3、{{$t('matter.promptly')}}。</p>
		</div>
	</div>
</template>

<script>
</script>

<style scoped lang="less">
	.matter {
		top: 42%;
		width: 100%;
		min-height: 50%;
	
		.top {
			background: url("../assets/news.png") no-repeat;
			background-size: 100%;
			height: 2.33rem;
			line-height: 2.33rem;
			color: #fff;
			font-size: 0.36rem;
			padding-left: 0.3rem;
		}
	
		.bots {
			padding: 0.3rem;
	
			p {
				font-size: 0.22rem;
				margin-bottom: 0.3rem;
			}
		}
	}
</style>
