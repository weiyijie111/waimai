<template>
	<transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
		<div class="lists" v-show="showLists" ref = 'cc'>
			<div>
				<span @click="hideList"><span class="icon-arrow_lift"></span></span>
				<div class="modul">
					<img :src="food.image" alt="" class="foodimg">
					<div class="modul-one">
						<div class="food-name">
							{{food.name}}
						</div>
					
						<div class="food-sellCount">月销售：{{food.sellCount}}份  好评率：{{food.rating}}%</div>
						<div class="food-price"><span class="mo">￥</span>{{food.price}} <span class="oldPrice" >{{food.oldPrice}}</span></div>
						<div class="add">加入购物车</div>
					</div>
				</div>
				
				<div class="modul-two">
					<div class="one">商品介绍</div>
					<div class="info">{{food.info}}</div>
				</div>
				
				<div class="modul-three" >
					<div class="two">商品评价</div>

					<div class="satisfaction-two">
						<div class="total">
							全部
						</div>
						<div class="pleased">
							滿意
						</div>
						<div class="discontent">
							不滿意
						</div>
					</div>

					<div class="satisfaction-three">
						<span class="icon-check_circle"></span>
						<span class="word-one">只看有內容的评价</span>
					</div>
				</div>
				
				<div class="modul-four">
					<div v-for="item in food.ratings" class="contents">
						<div class="infos-left">
							<span>{{item.rateTime | times}}</span>
						</div>
						<span v-show="item.rateType==0" class="icon-thumb_up"></span>
						<span v-show="item.rateType==1" class="icon-thumb_down"></span>
						<span class="text">{{item.text}}</span>
					</div>
				</div>
				


			</div>

		</div>
	</transition>
	
</template>

<script type="text/javascript">
	import {mapGetters} from 'vuex'
	import 'animate.css/animate.css'
	import Vue from 'vue'

	export default{
		created(){
			this.$store.dispatch('hideList');
			this.$nextTick(()=>{
				setTimeout(() => {
					this.$nextTick (()=>{
						this._initmenulist();
					})
				}, 100);
			})
		},
		filters: {
			times: function(value) {
				let time = new Date(value);
				let y = time.getFullYear();
				let m = time.getMonth()+1;
				let d = time.getDate();
				let h = time.getHours();
				let mi = time.getMinutes();
				if (m < 10) {
					m = '0' + m
				}
				if (d < 10) {
					d = '0' + d
				}
				if (h < 10) {
					h = '0' + h
				}
				if (mi < 10) {
					mi = '0' + mi
				}
				return y+'-'+m+'-'+d+' '+h+':'+mi;
			}
		},
		props:['food'],
		computed: {
			...mapGetters([
				'goods',
				'showLists'
			])
		},
		watch:{
			showLists(){
				this.$nextTick (()=>{
					this._initmenulist();
				})
			}
		},
		methods: {
			hideList() {
				this.$store.dispatch('hideList');
			},
			_initmenulist(){
				this.cc = new BScroll( this.$refs.cc , {
					click:true
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.lists {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #f3f5f7;
		// overflow: hidden;
		.icon-arrow_lift{
			font-size: 0.4rem;
			color:#666;
			position: absolute;
			top:0.3rem;
			left:0.3rem;
		}
		.modul{
			height: 9.67rem;
			margin-bottom: 0.32rem;
			.foodimg{
				height: 7.5rem;
			}
			.modul-one{
				// height: 2.17rem;
				background-color: #fff;
				margin-top: -0.36rem;
				padding:0.36rem;
				position: relative;
				border-bottom: 1px solid #e6e7e8;
				.food-name{
					font-size: 0.28rem;
					font-weight: 700;	
					color:rgb(7,17,27);

				}
				.food-sellCount{
					font-size: 0.2rem;
					padding-top: 0.16rem;
				}
				.food-price{
					padding-top: 0.36rem;
					color:red;
					font-size: 0.28rem;
					font-weight: 700;
					.mo{
						font-size: 0.2rem;
						font-weight: 0;
					}
				}
				.oldPrice{
					font-size: 0.20rem;
					font-weight: 700;
					color:#93999f;
					text-decoration:line-through;
				}
				.add{
					width: 1.48rem;
					padding:0.12rem 0;
					color:#fff;
					line-height: 0.24rem;
					font-size: 0.2rem;
					text-align: center;
					background-color: #00a0dc;
					border-radius: 0.5rem;
					position: absolute;
					right: 0.36rem;
					bottom: 0.36rem;
				}
			}
			
			
		}
		.modul-two{
			border-top: 1px solid #e6e7e8;
			margin-top: 0.55rem;
			padding:0.36rem;
			background-color: #fff;
			.one{
				font-size: 0.28rem;
				font-weight: 700;
			}
			.info{
				font-size: 0.24rem;
				padding-top: 0.12rem;
				color:#4d555d;
			}
		}
		.modul-three{
			border-top: 1px solid #e6e7e8;
			// margin-top: 0.55rem;
			padding:0.36rem;
			background-color: #fff;
			.two{
				font-size: 0.28rem;
				font-weight: 700;
			}

			.satisfaction-two{
				display: flex;
				width: 6.78rem;
				height: 1.34rem;
				border-bottom:1px solid #e6e7e8;
				margin:0 auto;
				div{
					width: 1.2rem;
					height: 0.64rem;
					font-size: 0.24rem;
					line-height: 0.64rem;
					text-align: center;
					color: #fff;
					margin-right: 0.15rem;
					font-weight: 700;
					margin-top: 0.36rem;
					// border:
				}
				.total{
					float: left;
					background-color: #00a0dc;
				}
				.pleased{
					background-color: #ccecf8;
				}
				.discontent{
					background-color: #e9ebec;
				}
			}

			.satisfaction-three{
				// width: 100%;
				height: 0.68rem;
				line-height: 0.4rem;
				margin-left: 0.4rem;

				.icon-check_circle{
					font-size: 0.4rem;
					color:#b7bbbf;
					margin-top: -0.2rem;
				}
				.word-one{
					font-size: 0.24rem;
					color:#b7bbbf;
					font-weight: 700;
					position: relative;
					top:-0.05rem;
					left:-0.1rem;

				}
			}
		}

		.modul-four{
			padding:0 0.36rem ;
			padding-bottom: 0.93rem;
			background-color: #fff;
			.contents{
				// display: flex;
				border-bottom: 0.01rem solid rgba(7, 17, 27, 0.1);
				// padding:0 0 0.32rem 0 ;
				position: relative;
				height: 1.35rem;
				.infos-left {
					display: flex;
					span {
						font-size: 0.2rem;
						line-height: 0.24rem;
						color: rgb(147, 153, 159);
						margin-top: 0.32rem;
					}
				}
				.icon-thumb_up {
					font-size: 0.24rem;
					color: rgb(0, 160, 220);
					margin-right: 0.08rem;
					position: absolute;
					top:0.72rem;
					// padding-bottom: 0.32rem;
					// line-height: 0.48rem;
				}
				.icon-thumb_down {
					font-size: 0.24rem;
					color: rgb(147, 153, 159);
					margin-right: 0.08rem;
					position: absolute;
					top:0.72rem;
					// padding-bottom: 0.32rem;
				}
				.text {
					font-size: 0.24rem;
					color: rgb(7, 17, 27);
					position: absolute;
					top:0.69rem;
					left:0.33rem;

					// padding:0.32rem 0 0.32rem ;
					
				}
			}
			
		}
	}
</style>