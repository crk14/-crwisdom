<template>
	<div class="tabul">
			<div>
				<p>{{$t('spot.singular')}} ({{$t('spot.odd')}})</p>
		
				<p>{{item.buy_count}}</p>
			</div>
			<div>
				<p>{{$t('spot.number')}}({{item.bidui.split('/')[0]}})</p>
				<p>{{item.buy_count_amount}}</p>
			</div>
			<div>
				<p>{{$t('spot.average')}}({{item.bidui.split('/')[1]}})</p>
				<p>{{item.buy_count_average}}</p>
		
			</div>
			<div>
				<p>{{$t('spot.storehouse')}}({{item.bidui.split('/')[1]}})</p>
		
				<p>{{item.lastprice}}</p>
			</div>
			<div>
				<p>{{$t('spot.receipt')}}({{$t('spot.odd')}})</p>
				<p>{{item.sell_count}}</p>
			</div>
			<div>
				<p>{{$t('spot.profit')}}({{item.bidui.split('/')[1]}})</p>
		
				<p>{{item.profit}}</p>
			</div>
		</div>
</template>

<script>
	export default{
		props:['item'],
		data(){
			return{
			}
		},
		
	}
</script>

<style scoped>
	.tabul {
		display: flex;
		justify-content: space-between;
		flex-flow: wrap;
		font-size: 0.24rem;
		padding-top: 0.2rem;
		width: 100%;
		
	}
	div{
		width: 33.3%;
		margin-bottom: 0.15rem;
		line-height: 16px;
		
	}
		
	div:nth-of-type(1), div:nth-of-type(4){
		text-align: left;
	}
		
	div p:nth-of-type(1) {
		color: #bababa;
		margin-bottom: 6px;
	}
		
	div:nth-of-type(2),
	div:nth-of-type(5) {
		text-align: center;
	}
		
	div:nth-of-type(3),
	div:nth-of-type(6) {
		text-align: right;
	}
</style>
