<template>
	<div class="header">
		<div class="bg">
			<img :src="seller.avatar" alt="">
		</div>
		<img :src="seller.avatar" alt="" @click="showDetail">
		<div class="pingpai-one">
			<span id="pingpai">品牌</span>
			{{seller.name}}
		</div>
		
		<div class="description">
			{{seller.description}}
		</div>
		<div v-if="seller.supports" class="supports-description">
			<img src="../../../static/img/decrease_1@2x.png" alt="">
			{{seller.supports[0].description}}
		</div>

		<div class="clickbtn" @click="showDetail">5个 ></div>
		<br>

		<img src="../../../static/img/bulletin@2x.png" height="24" width="44" alt="" class="gonggaoimg">

		<div class="gonggao">
			<div class="gonggao-word">{{seller.bulletin}}</div>
			
		</div>
		<!-- 弹出层 -->
		
		<Detail></Detail>
	</div>
</template>

<script>	
	import {mapGetters} from 'vuex'
	import Detail from '../detail/Detail.vue'

	export default {
		created(){
			this.$store.dispatch('getSeller');
		},
		computed:{
			...mapGetters([
				'seller'
			]),
			msg(){
				return 'welcome to itany';
			}
		},
		components:{
			Detail
		},
		methods:{
			showDetail(){
				this.$store.dispatch('showDetail');
			}
		}
	}
</script>

<style lang="less" scoped>
	.header{
		width: 100%;
		height: 2.68rem;
		background-color: rgba(7,17,27,0.5);
		font-size: 0.32rem;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		color:#fff;
		position: relative;
		 .bg {
			position: absolute;
			z-index: -1;
			top: 0;
			left: 0;
			img{
				width: 50%; 
			}
		}  
		img{
			margin-left:1.14rem;
			width:1.28rem;
			height:1.28rem;
			border-radius:0.02rem;
			margin-top: 0.48rem;
			margin-left: 0.48rem;
		}
		& .pingpai-one{
			position: absolute;
			top:0.52rem;
			left:2.08rem;
			& #pingpai{
				width: 0.8rem;
				height: 0.35rem;
				background-color: red;
				text-align: center;
				
			}
		}
		
		& .description{
			font-size: 0.24rem;
			position: absolute;
			left:2.08rem;
			top:1.03rem;
		}
		.supports-description{
			position:absolute;
			top:1rem;
			left:1.6rem;
			font-size: 0.2rem;
			& img{
				width: 0.25rem;
				height: 0.25rem;
			}
		}
		
		& .gonggao{
			background-color:rgba(7,17,27,0.2);
			width: 100%;
			height: 0.56rem;
			font-size: 0.2rem;
			line-height: 0.56rem;
			position: absolute;
			bottom:0;
			& .gonggao-word{
				width:85%;
				// background-color: #564;
				height: 0.5rem;
				overflow: hidden;
				position: relative;

				left:0.84rem;
				// color:#000;
			}
		}
		& .gonggaoimg{
				width: 0.47rem;
				height: 0.28rem;
				position: relative;
				left:-0.2rem;
				top:-0.05rem;
			}
		& .clickbtn{
			width: 0.87rem;
			height: 0.48rem;
			text-align: center;
			line-height: 0.48rem;
			font-size: 0.2rem;
			background-color: rgba(0,0,0,0.5);
			border-radius:0.23rem;
			position: absolute;
			right: 0.24rem;
			bottom: 0.87rem;
		}
	}
</style>