<template>
	<div class="goods">
		<div class="menu-wrapper" ref="scrollmenu">
			<ul>
				<li class="menulist" v-for="(item, key) in goods" :class="{'current':key===currentIndex}" @click="menuSelect(key, $event)">
					<span class="text">
						{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="scrollfoods">
			<ul>
				<li v-for="item in goods" class="food-list">
					<div class="navSelect">
						<div class="bar"></div>
						<div class="food-name navSelectName">{{item.name}}</div>
					</div>
					<ul class="foodsInfo">
						<li v-for="(food, index) in item.foods">
							<div class="foodsInfo-contents">
								<img :src="food.icon" @click="showList(food)" class="foodimg">
								<div class="foodsInfo-details">
									<p>{{food.name}}</p>
									<p>月销售{{food.sellCount}}<span>好评率{{food.rating}}%</span> </p>
									<p>&yen;{{food.price}}</p>
								</div>
								<icons class="icon" :food="food"></icons>
							</div>
						</li>
					</ul>
				</li>
			</ul>
			
		</div>
		<!-- 引入底部插件 获取底部$emit发送过来的数据 -->
		<v-footer  @sendFood="getFood"></v-footer>

		<listDetail :food="selectFoods" :foods="selectedFoods"></listDetail>

		<!-- 引入购物车插件并传递数据给购物车 -->
		<footerList :sfoods="selectedFoods"></footerList>
	</div>

</template>
<script>
	import {mapGetters} from 'vuex'
	import {mapState} from 'vuex'
	import icons from '../icon/Icon.vue'
	import listDetail from '../listdetail/ListDetail.vue'
	import Foot from '../foot/Foot.vue'
	import footerList from '../footerlist/FooterList.vue'

	export default {
		created() {
			this.$store.dispatch('getGoods');

		},
		watch: {
			goods() {
				this.$nextTick(() => {
					this.scrolllist();
					this.initfoods();
					this._initHeight();
				});
			}
		},
		components: {
			icons,
			listDetail,
			'v-footer': Foot,
			footerList
		},
		computed: {
			...mapGetters([
				'goods'
			]),
			currentIndex(){
				for (let i = 0; i < this.listHeight.length; i++){
					let height1 = this.listHeight[i];
					let height2 = this.listHeight[i+1];
					if(!height2 || (this.scrollY >= height1 &&  this.scrollY < height2)){
						return i;
					}
				}
				return 0;
			}
		},
		data(){
			return {
				menulist:{},
				foodslist:{},
				scrollY: '',
				listHeight: [],
				selectFoods: {},
				selectedFoods: []
			}
		},
		methods: {
			scrolllist() {
				this.menulist = new BScroll(this.$refs.scrollmenu, {
					click: true
				});

			},
			initfoods() {
				this.foodslist = new BScroll(this.$refs.scrollfoods, {
					click: true,
					probeType: 3
				});
				this.foodslist.on('scroll', (position) => {
					this.scrollY = Math.abs(Math.round(position.y));
				});

			},
			_initHeight() {
				let foodlist = this.$refs.scrollfoods.getElementsByClassName('food-list');
				let height = 0;
				this.listHeight.push(height);
				for(let i = 0; i < foodlist.length; i++){
					height += foodlist[i].clientHeight;
					this.listHeight.push(height);
				} 
				// console.log(this.listHeight);
			},
			menuSelect(key, e) {
				if (!event._constructed) {
		          // 去掉自带click事件的点击
		          return;
		        }
				let foodlist = this.$refs.scrollfoods.getElementsByClassName('food-list');
				this.foodslist.scrollToElement(foodlist[key],300);
			},
			showList(obj) {
				this.selectFoods = obj;
				this.$store.dispatch('showList');
			},
			getFood(msg) {
				// 获取$emit发送过来的数据
				this.selectedFoods = msg;
				// console.log(this.selectedFoods);
			}
		}
	}

</script>
<style lang="less" scoped>
	.goods {
		display: flex;
		position: absolute;
		top: 3.6rem;
		bottom:1rem;
		width: 100%;
		overflow: hidden;
		.menu-wrapper {
			flex: 0 0 1.6rem;
			width: 1.6rem;
			background-color: #f3f5f7;
			.menulist {
				width: 1.12rem;
				padding: 0 0.24rem;
				font-size: 0.24rem;
				text-align: center;
				display: table;
				height: 1.08rem;
				color: rgb(77, 85, 93);
				.text {
					border-bottom: 0.01rem solid #d9dde1;
					display: table-cell;
					vertical-align: middle;
				}
				&.current {
					background-color: #fff;
					color: red;
					.text {
						border: none;
					}
				}
			}
		}
		.foods-wrapper {
			font-size: 0.24rem;
			flex: 1;
			.navSelect {
				height: 0.52rem;
				color: rgb(147, 153, 159);
				font-size: 0.24rem;
				display: flex;
				background-color: #f3f5f7;
				.bar {
					width: 0.06rem;
					background-color: #d9dde1;
				}
				.navSelectName {
					line-height: 0.52rem;
					margin-left: 0.28rem;
				}
			}
			.foodsInfo {
				.foodsInfo-contents {
					display: flex;
					padding: 0.36rem 0.36rem 0 0.36rem;
					position: relative;
					border-bottom: 0.01rem solid #d9dde1;
					img {
						display: inline-block;
						width: 1.5rem;
						height: 1.5rem;
						margin-right: 0.2rem;
						border-radius: 0.04rem;
					}
					.foodsInfo-details p:nth-child(1){
						font-size: 0.28rem;
						color: rgb(7, 17, 27);
						margin-bottom: 0.16rem;
						margin-top: 0.06rem;
					}
					.foodsInfo-details p:nth-child(2){
						font-size: 0.2rem;
						color: rgb(147, 153, 159);
						margin-bottom: 0.16rem;
						span {
							margin-left: 0.2rem;
						}
					}
					.foodsInfo-details p:nth-child(3){
						font-size: 0.28rem;
						color: rgb(240, 20, 20);
						font-weight: 700;
					}
					.icon {
						position: absolute;
						right: 0.36rem;
						bottom: 0.64rem;
					}
				}
			}
		}
	}

</style>