<template>
	<transition  enter-active-class="animated slideInUp" leave-active-class="animated fadeOutDown">
		<div class="footerLists" v-show="footerListShow">
			<div class="listContent">
				<div class="nav">
					<span @click="hideFooterList" class="back">返回</span>
					<span class="shopcart">购物车</span>
					<span @click="clear" class="emptycart">清空</span>
				</div>
				<div class="content" ref = 'cc'>
					<div>
						<ul>
							<li v-for="(item, index) in sfoods" class="listfd" v-show="item.count>0">
								<span class="name">{{item.name}}</span>
								<div class="counts">
									<span class="icon-remove_circle_outline icon1" @click="doRemove(index)"></span>
									<span class="num">{{item.count}}</span>
									<span class="icon-add_circle icon2" @click="doAdd(index)"></span>
								</div>
							</li>
						</ul>
					</div>
					
				</div>
				<div class="empty" v-show="totalCount==0">
					<p>购物车里没有东西哦</p>
				</div>
			</div>
		</div>
	</transition>
	
</template>
<script>
 	import {mapGetters} from 'vuex'
 	import 'animate.css/animate.css'
	export default {
		created() {
			this.$store.dispatch('hideFooterList');
			this.$nextTick(() => {
				setTimeout(() => {
					this.$nextTick(() => {
						this._initmenulist();
					})
				}, 100);
			});
		},
		watch: {
			sfoods() {
				this.$nextTick(() => {
					this._initmenulist();
				});
			}
		},
		computed: {
			...mapGetters([
				'goods',
				'footerListShow'
			]),
			//用于判断购物车是否为空
			totalCount() {
				let count = 0;
				this.sfoods.forEach(food => {
					count += food.count;
				});
				return count;
			}
		},
		components: {
		
		},
		props:['sfoods'],
		methods: {
			hideFooterList() {
				this.$store.dispatch('hideFooterList');
			},
			clear() {
				this.sfoods.forEach(food => {
					food.count = 0;
				});
			},
			doRemove(index) {
				this.sfoods[index].count--;
			},
			doAdd(index) {
				this.sfoods[index].count++;
			},
			_initmenulist() {
				this.cc = new BScroll(this.$refs.cc, {
					click: true
				})
			}
		}
	}
</script>
<style lang="less" scpoed>
	.footerLists {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 100;
		background-color: rgba(7, 17, 27, 0.6);
		blur: 0.1rem; 

		.listContent {
			width: 100%;
			height: 40%;
			margin-top: 94%;
			background-color: #fff;
			position: relative;
			.nav {
				display: flex;
				justify-content: space-between;
				background-color: #f3f5f7;
				border-bottom: 0.01rem solid rgba(7, 17, 27, 0.1);
				.back {
					height:  0.24rem;
					font-size: 0.24rem;
					font-weight: 200;
					line-height: 0.44rem;
					padding: 0.2rem;
					margin-left: 0.3rem;
				}
				.shopcart{
					font-size: 0.28rem;
					font-weight: 200;
					color: rgb(7, 17, 27);
					line-height: 0.8rem;
				}
				.emptycart{
					height:  0.24rem;
					font-size: 0.24rem;
					padding: 0.2rem;
					line-height: 0.44rem;

				}
			}
			.content {
				padding: 0 0.36rem;
				height: 5rem;
				overflow: hidden;
				.listfd {
					padding: 0.24rem 0;
					display: flex;
					justify-content: space-between;
					border-bottom: 0.01rem solid rgba(7, 17, 27, 0.1);
					.name {
						font-size: 0.28rem;
						color: rgb(7, 17, 27);
						line-height: 0.48rem;
					}
					.counts {
						display: flex;
						width: 1.44rem;
						position: relative;
						.icon1 {
							font-size: 0.48rem;
							line-height: 0.48rem;
							color: rgb(0, 160, 220);
							position: absolute;
							left: 0;
						}
						.num {
							width: 0.4rem;
							font-size: 0.2rem;
							line-height: 0.48rem;
							color: rgb(147, 153, 159);
							margin-left: 0.15rem;
							position: absolute;
							left: 50%;
							margin-left: -0.1rem;
						}
						.icon2 {
							font-size: 0.48rem;
							line-height: 0.48rem;
							color: rgb(0, 160, 220);
							position: absolute;
							right: 0;
						}
					}
				}
			}
			.empty {
				text-align: center;
				padding-top: 1rem;
				p {
					font-size: 0.48rem;
				}
				span {
					font-size: 0.28rem;
					padding: 0.2rem 0.3rem;
					background-color: rgb(0, 160, 220);
				}
			}
		}
	}
</style>