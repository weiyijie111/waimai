<template>
	<div class="star">
		<span v-for = 'itemClass in itemlist' class="cc" :class = 'itemClass'></span>
	</div>
</template>
	
<script type="text/javascript">
	const length=5;
	const STAR_ON = 'on';
	const STAR_HALF = 'half';
	const STAR_OFF = 'off';


	export default {
		// 获取父组建传过来得分数
		props : ['score'],
		// 计算属性
		computed :{
			// itemlist用来便利span
			itemlist(){
				// 定义一个空数组用来存变量值
				let result = [];
				// 取分数的整数部分
				let integer = Math.floor(this.score);
				// 取小数部分
				let litter = this.score - integer;
				// 循环整数部分的次数
				for ( let i = 0 ; i < integer ; i++ ){
					// 将变量On存进去
					result.push( STAR_ON );
				}
				// 将小数的half存进去
				if( litter > 0.5 ){
					result.push( STAR_HALF );
				}
				// 不足的部分用空的星星
				while( result.length < length ){
					result.push( STAR_OFF );
				}
				// 返回result
				return result;
			}
		}
	}
</script>

<style lang='less' scoped>
	.star{

		.cc{
			display: inline-block;
			width: 0.4rem;
			height: 0.4rem;
			// 如果是on的class 那么用完整的星星做背景
			&.on{
				background-image: url(star_on.png);
				background-size: 0.3rem 0.3rem;
				background-repeat: no-repeat;
			}
			&.off{
				background-image: url(star_off.png);
				background-size: 0.3rem 0.3rem;
				background-repeat: no-repeat;
			}
			&.half{
				background-image: url(star_half.png);
				background-size: 0.3rem 0.3rem;
				background-repeat: no-repeat;
			}
		}
	}
</style>