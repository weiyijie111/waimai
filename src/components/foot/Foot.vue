<template>
	<div class="footer" @click="showFooterList">
		<div class="shop" :class="{'currentClass':totalCount>0}">
			<span class="icon-shopping_cart shopicon" :class="{'iconClass':totalCount>0}"></span>
		</div>


		<!-- 小球 -->
		<div class="total" v-show="totalCount>0">{{totalCount}}</div>
		<div class="price">
			<span>&yen; {{totalPrice}}</span>
		</div>
		<div class="bars"></div>
		<div class="deliveryCost">
			<span>另需配送费&yen;</span>
			<span>4</span>
		</div>
		<div class="deliveryCondition" :class="{'deliveryClass':totalPrice>=20}">
			<span :class="{'txtClass':totalPrice>=20}">{{desc}}</span>
		</div>

	</div>
</template>
<script>
	import {mapGetters} from 'vuex'

	export default {
		components: {
			// footerList
		},
		computed: {
			...mapGetters([
				'seller',
				'goods'
			]),
			//取得所有被选中食物的对象数组
			selectedFood() {
				let foods = [];
				this.goods.forEach(good => {
					good.foods.forEach(food => {
						if (food.count > 0) {
							foods.push(food);
						}
					});
				});
				return foods;
			},
			// 购物车的总数
			totalCount() {
				let count = 0;
				this.selectedFood.forEach(food => {
					count += food.count;
				});
				return count;
			},
			// 购物车的总价钱
			totalPrice() {
				let price = 0;
				this.selectedFood.forEach(food => {
					price += food.price*food.count;
				});
				return price;
			},
			desc() {
				if (this.totalPrice === 0) {
					return `¥${this.seller.minPrice}起送`;
				}else if(this.totalPrice < 20) {
					let num = 20 - this.totalPrice;
					return `还需${num}起送`;
				}else{
					return '确认支付';
				}
			}
		},
		methods: {
			showFooterList() {
				this.$store.dispatch('showFooterList');
				// 发送数据给goods页面
				this.$emit('sendFood', this.selectedFood);
			}
		}
	}
</script>
<style lang="less" scoped>
	.footer {
		width: 100%;
		height: 0.96rem;
		background-color: #141d27;
		position: fixed;
		bottom: 0;
		z-index: 200;
		.shop {
			display: inline-block;
			width: 0.9rem;
			height: 0.9rem;
			border-radius: 0.86rem;
			background-color: #2b343d;
			position: absolute;
			border:0.1rem solid #141c27;
			left: 0.48rem;
			bottom: 0.2rem;
			line-height: 0.8rem;
			text-align: center;
			z-index: 20;
			.shopicon {
				font-size: 0.5rem;
				color:#80858a;
				// line-height: 0.1rem;
				margin-top: -0.1rem;
				text-align: center;
				position: relative;
				bottom: 0.1rem;
				&.iconClass {
					color: rgb(255, 255, 255);
				}
			}
			&.currentClass {
				background-color: rgb(0, 160, 220);
			}
		}

		.total {
			width: 0.5rem;
			height: 0.35rem;
			border-radius: 0.2rem;
			background-color:#f01414;
			position: absolute;
			top: -0.27rem;
			left: 1.2rem;
			font-size: 0.18rem;
			font-weight: 700;
			color: #fff;
			line-height: 0.35rem;
			text-align: center;
			z-index: 20;
		}
		.price {
			font-size: 0.24rem;
			color: rgba(255, 255, 255, 0.4);
			font-weight: 700;
			margin-left: 1.6rem;
			line-height: 1rem;
		}
		.bars {
			height: 0.5rem;
			width: 0.02rem;
			position: absolute;
			left: 2.4rem;
			top: 0.25rem;
			background-color: rgba(255, 255, 255, 0.1);
		}
		.deliveryCost {
			font-size: 0.24rem;
			color: rgba(255, 255, 255, 0.4);
			font-weight: 700;
			position: absolute;
			left: 2.74rem;
			top: 0rem;
			line-height: 1rem;
		}
		.deliveryCondition {
			height: 1rem;
			width: 2.1rem;
			position: absolute;
			right: 0;
			top: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: rgba(255, 255, 255, 0.2);
			&.deliveryClass {
				background-color: #00a0dc;
			}
			span {
				display: inline-block;
				font-size: 0.24rem;
				color: rgba(255, 255, 255, 0.4);
				&.txtClass {
					color: rgb(255, 255, 255);
				}
			}
		}
	}

</style>