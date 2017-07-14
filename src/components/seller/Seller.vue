<template>
	<div class="sellers" ref = 'scrollall'>
		<div>
			<div class="module-one">
				<div class="module-top">
					<div class="activity">{{seller.name}}</div>
					<div class="star"><star :score = 'seller.score'></star><div class="sellCount">(661)&月销售{{seller.sellCount}}单</div></div>
					<div class="collect">
						<span class="icon-favorite"></span>
						<p class="collect-one">已收藏</p>
					</div>
				</div>
				<div class="module-bot">
					<div class="seller-minPrice">起送价<br><span class="minPrice">{{seller.minPrice}}</span>元</div>
					<div class="seller-minPrice " id="one">商家配送<br><span class="minPrice">{{seller.deliveryPrice}}</span>元</div>
					<div class="seller-minPrice">平均配送时间<br><span class="minPrice">39</span>分钟</div>
				</div>
			</div>

			<div class="module-two">
				<p class="activity">公告与活动</p>
				<div  class="bulletin">{{seller.bulletin}}</div>
				<ul v-for="item in seller.supports" >
					<li class="supports-word">{{item.description}}</li>
				</ul>
			</div>

			<div class="module-three">
				<p class="word-one">商店实景</p>
				<div  class="pics-img">
					<div class="pics">
						<div v-for='img in seller.pics'>
							<img :src="img">
						</div>
						
					</div>
				</div>
			</div>

			<div class="module-four">
				<p class="activity">商家信息</p>
				<div class="supports-word" v-for='v in seller.infos'>
					{{v}}
						
				</div>
			</div>
		</div>
		<!-- <v-foot id="foot"></v-foot> -->
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import star from '../star/Star.vue'
	// import Foot from '../foot/Foot.vue'

	export default {
		created() {
			this.$nextTick(() => {
				setTimeout(() => {
					this.$nextTick(() => {
						this._initmenulist();
					})
				}, 100);
			});
		},
		watch: {
			seller() {
				this.$nextTick(() => {
					this._initmenulist();
				});
			}
		},
		computed: {
			...mapGetters([
				'seller'
			]),
		},
		components: {
			star,
			// 'v-foot':Foot
		},
		methods: {
			_initmenulist() {
				this.scrollAll = new BScroll(this.$refs.scrollall, {
					click: true
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.sellers{
		width: 100%;
		height: 9.34rem; 
		background-color: #f3f5f7;
		overflow: hidden;
		.module-one{
			
			height: 3rem;
			background-color: #fff;
			padding:0.36rem 0.36rem 0;
			border-bottom: 1px solid rgba(7,17,27,0.1);
			
			.module-top{
				// background-color: #f56;
				height: 1.5rem;
				border-bottom: 1px solid rgba(7,17,27,0.1);
				.activity{
					font-size: 0.28rem;
					color:rgb(7,17,27);
					line-height: 0.28rem;
					font-weight: 700;
				}
				.star{
					margin-top: -0.45rem;
					.sellCount{
						font-size: 0.2rem;
						margin-top:-0.7rem;
						margin-left: 30%;
						line-height: 0.36rem;
					}
					
				}
				.collect{
					margin-top: -1.75rem;
					margin-left: 80%;
					.icon-favorite{
						font-size: 0.48rem;
						color: rgb(240,20,20);
						line-height: 0.48rem;
						text-align: center;
						margin-left:0.1rem;
					}
					.collect-one{
						font-size: 0.2rem;
						color: rgb(77,85,93);
						margin-top: -0.15rem;
					}
				}
			}

			.module-bot{
					width: 100%;
					display: flex;
				div{
					flex:1;
					color:rgb(147,153,159);
					font-size: 0.2rem;
					padding:0.24rem ;
					text-align: center;
					line-height: 0.48rem;
					// border-right: 1px solid rgba(7,17,27,0.1);
					
					span{	
						font-size: 0.48rem;
						color:rgb(7,17,27);
					}
				}
				#one{
						border-left: 1px solid rgba(7,17,27,0.1);
						border-right: 1px solid rgba(7,17,27,0.1);
					}
			}
		}
		.module-two{
			border-top: 1px solid rgba(7,17,27,0.1);
			padding:0.36rem 0.36rem 0;
			margin-top: 0.34rem;
			background-color: #fff;
			.activity{
				font-size: 0.28rem;
				color:rgb(7,17,27);
				line-height: 0.28rem;
				font-weight: 700;
			}
			.bulletin{
				padding:0 0.24rem 0.24rem;
				font-size: 0.24rem;
				line-height: 0.48rem;
				color:rgb(270,20,20);
				border-bottom: 1px solid rgba(7,17,27,0.1);
			}
			.supports-word{
				font-size: 0.24rem;
				padding:0.32rem 0.24rem;
				border-bottom: 1px solid rgba(7,17,27,0.1);
			}
			
		}

		.module-three{
			margin-top: 0.34rem;  
			padding:0.36rem 0.36rem 0;
			background-color: #fff;
			// display: flex;
			.word-one{
				font-size: 0.28rem;
				color:rgb(7,17,27);
				line-height: 0.28rem;
				font-weight: 700;
			}

			.pics-img{
				overflow: hidden;
				height: 1.8rem;
				.pics{
					width: 10rem;
					white-space: nowrap;
					// float: left;
					div{
						display: inline-block;
						img{
							
							width: 2.4rem;
							height: 1.8rem;
							margin-right: 0.12rem;
						}
					}
				}
			}
		}
	

		.module-four{
			border-top: 1px solid rgba(7,17,27,0.1);
			padding:0.36rem 0.36rem 0.5rem ;
			margin-top: 0.34rem;
			background-color: #fff;
			// margin-bottom: 0.96rem;

			.activity{
				font-size: 0.28rem;
				color:rgb(7,17,27);
				line-height: 0.28rem;
				font-weight: 700;
			}
			.supports-word{
				font-size: 0.24rem;
				padding:0.32rem 0.24rem;
				border-bottom: 1px solid rgba(7,17,27,0.1);
			}
		}
	}
	
	
</style>