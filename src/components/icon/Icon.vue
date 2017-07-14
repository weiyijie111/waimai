<template>
	<!-- 操作goods页面 -->
	<div class="count">
		<span class="icon-remove_circle_outline icon1" @click="doRemove" v-if="food.count>0"></span>
		<span class="num" v-if="food.count>0">{{food.count}}</span>
		<span class="icon-add_circle icon2" @click="doAdd"></span>
	</div>
</template>
<script>
	import {mapGetters} from 'vuex'
	import Vue from 'vue'
	export default {
		props: {
			food: {
				type: Object
			}
		},
		computed: {
			...mapGetters([
				'seller'
			])
		},
		methods: {
			doAdd() {
				if (!this.food.count){
					Vue.set(this.food,'count',1)
				}else{
					this.food.count++;
				}
			}

		}
	}

</script>
<style lang="less" scoped>
	.count {
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
</style>