<template >
	<transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
		<div class="detail" v-show="detailShow">
			<!-- 详情页 -->
			
			<div class="seller-name">{{seller.name}}</div>
			<span class="star"><star :score = 'seller.score'></star></span>
 			<div class="utl">
	 			<div class="line">
	 				<div class="line-one"></div>
			 			<div id="info">优惠信息</div>
			 		<div class="line-one"></div>
	 			</div>
	 		</div>

			<div v-for="v in seller.supports" class="v-word">
				<img src="../../../static/img/decrease_1@3x.png" alt="">
					{{v.description}}
			</div>


 			<div class="utl">
	 			<div class="line">
	 				<div class="line-one"></div>
			 			<div id="info">商家公告</div>
			 		<div class="line-one"></div>
	 			</div>
	 		</div>
 			
			<div class="bulletin">
				{{seller.bulletin}}
			</div>

			<div id="icon">
				<span class="icon-close" @click="hideDetail"></span>
			</div>

		</div>
	</transition>
</template>

<script>
	import {mapGetters} from 'vuex'
	import 'animate.css/animate.css'
	import star from '../star/Star.vue'

	export default {
		computed:{
			...mapGetters([
				'detailShow',
				'seller'
			])
		},
		components:{
			star
		},
		methods:{
			hideDetail(){
				this.$store.dispatch('hideDetail');
			}
		}
	}
</script>

<style lang="less" scoped>
	.detail{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 666;
		width: 100%;
		height: 100%; 
		padding:0 0.72rem 0 0.72rem;
		background-color: rgba(7,17,27,0.8);
		color:#fff;
		
		.seller-name{
			font-size: 0.32rem;
			padding-top: 1.28rem;
			text-align: center;
			margin-left: -1rem;
			font-weight: 700;
		}
		
		.star{
			margin-left:2.1rem;
		}
		.utl{
			
			.line{
				display: flex;
			}
			#info{
				float: left;
				font-size: 0.28rem;
				padding:0.28rem 0.24rem 0 0.24rem;
			}

			.line-one{
				width: 2.24rem;
				height: 0.02rem;
				// background-color: rgba(255,255,255,0.5);
				background-color: #fff;
				margin-top: 0.56rem;
			}
				
		}



		.v-word{
				font-size: 0.24rem;
				// margin-left: 20%;
				padding-top: 0.12rem;
				img{
					width: 0.32rem;
					height: 0.32rem;
				}
			}
		.bulletin{
			font-size: 0.24rem;
			padding-right:1.3rem;
		}
		.icon-close{
			font-size: 0.64rem;
			// position: absolute;
		}
		#icon{
			// margin:auto;
			
			position: absolute;
			bottom:0.64rem;
			left:3.55rem;
		}
	}
</style>