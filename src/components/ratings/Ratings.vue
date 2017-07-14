<template>
	<div class="ratings" ref = 'cc'>
		<div>
			<div class="score">
				<div class="colligate">
					<p class="scoreText">{{seller.score}}</p>
					<p class="scoreNum">综合评分</p>
					<p class="scoreRate">高于周边商家{{seller.rankRate}}%</p>
				</div>
				<div class="serve">
					<div class="service">服务态度
						<span class="star"><star :score = 'seller.score'></star></span>
						<div class="starText">
							{{seller.serviceScore}}
						</div>
					</div>
					<div class="service">商品得分
						<span class="star"><star :score = 'seller.score'></star></span>
						<div class="starText">
							{{seller.foodScore}}
						</div>
					</div>
					<div class="service">送达时间<span class="deliveryTime">{{seller.deliveryTime}}分钟</span></div>
				</div>
			</div>
			

			<div class="satisfaction">
				<div class="satisfaction-two">
					<div class="total" @click="showAll" ref="showall">
						全部 {{ratings.length}}
					</div>
					<div class="pleased" @click="showOk" ref="showok">
						滿意 {{snum}}
					</div>
					<div class="discontent" @click="showBad" ref="showbad">
						不滿意 {{unum}}
					</div>
				</div>
				<div class="satisfaction-three">
					<span class="icon-check_circle"  @click="showContent" ref="icons"></span>
					<span class="word-one" @click="showContent" ref="showcontent">只看有內容的评价</span>
				</div>
			</div>

			<div class="evaluate">
				<div v-for='item in ratings'>
					<div class="evaluate-left">
						<img :src="item.avatar" alt="">
					</div>
					
					<div class="evaluate-right">
						<span class="username">{{item.username}}</span>
						<span class="uTime" v-if="item.deliveryTime">
							{{item.deliveryTime}}分送达
						</span>
						<p class="item-text">{{item.text}}</p>
					</div>
					
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
		created(){
			this.$store.dispatch('getRatings');
			this.$nextTick(()=>{
				setTimeout(() => {
					this.$nextTick (()=>{
						this._initmenulist();
					})
				}, 100);
			})
		},
		data(){
			return{
				snum: 0,
				unum: 0,
				arrOk: [],
				arrBad: [],
				arr: [],
				arrContent: [],
				arrc: []
			}
		},
		components:{
			star
			// 'v-foot':Foot
		},
		computed:mapGetters([
			'ratings',
			'seller'
		]),
		watch:{
			ratings(){
				this.$nextTick (()=>{
					this.satis();
					this._initmenulist();
				})
			}
		},
		methods:{
			_initmenulist(){
				this.cc = new BScroll( this.$refs.cc , {
					click:true
				})
			},
			satis() {
				for (let i = 0; i < this.ratings.length; i++) {
					if (this.ratings[i].score >= 4) {
						this.snum++;
					}else{
						this.unum++;
					}
					if (this.ratings[i].text !== '') {
						this.arrc.push(this.ratings[i]);	
					}
				}
				this.arr = this.ratings;
			},
			showOk() {
				this.cc.refresh();
				this.arrc = [];
				this.arrOk = [];
				for (let i = 0; i < this.ratings.length; i++) {
					if (this.ratings[i].score >= 4) {
						this.arrOk.push(this.ratings[i]);
						if (this.ratings[i].text !== '') {
							this.arrc.push(this.ratings[i]);
						}
					}
				}
				this.arr = this.arrOk;
				this.$refs.showok.style.backgroundColor = 'rgb(0, 160, 220)';
				this.$refs.showall.style.backgroundColor = 'lightblue';
				this.$refs.showbad.style.backgroundColor = 'rgba(77, 85, 93, 0.2)';
				this.$refs.showcontent.style.color = 'rgb(147, 153, 159)';
				this.$refs.icons.style.color = 'rgb(147, 153, 159)';
			},
			showBad() {
				this.cc.refresh();
				this.arrc = [];
				this.arrBad = [];
				for (let i = 0; i < this.ratings.length; i++) {
					if (this.ratings[i].score < 4) {
						// this.snum++;
						this.arrBad.push(this.ratings[i]);
						if (this.ratings[i].text !== '') {
							this.arrc.push(this.ratings[i]);	
						}
					}
				}
				this.arr = this.arrBad;
				this.$refs.showbad.style.backgroundColor = 'rgb(0, 160, 220)';
				this.$refs.showok.style.backgroundColor = 'rgba(0, 160, 220, 0.2)';
				this.$refs.showall.style.backgroundColor = 'lightblue';
				this.$refs.showcontent.style.color = 'rgb(147, 153, 159)';
				this.$refs.icons.style.color = 'rgb(147, 153, 159)';
			},
			showAll() {
				this.cc.refresh();
				this.arrc = [];
				this.arr = this.ratings;
				for (let i = 0; i < this.ratings.length; i++) {
					if (this.ratings[i].text !== '') {
						this.arrc.push(this.ratings[i]);	
					}
				}
				this.$refs.showall.style.backgroundColor = 'rgb(0, 160, 220)';
				this.$refs.showok.style.backgroundColor = 'rgba(0, 160, 220, 0.2)';
				this.$refs.showbad.style.backgroundColor = 'rgba(77, 85, 93, 0.2)';
				this.$refs.showcontent.style.color = 'rgb(147, 153, 159)';
				this.$refs.icons.style.color = 'rgb(147, 153, 159)';
			},
			showContent() {
				this.cc.refresh();
				this.arr = this.arrc;
				this.$refs.showbad.style.backgroundColor = 'rgba(77, 85, 93, 0.2)';
				this.$refs.showok.style.backgroundColor = 'rgba(0, 160, 220, 0.2)';
				this.$refs.showall.style.backgroundColor = 'lightblue';
				this.$refs.showcontent.style.color = 'rgb(0, 160, 220)';
				this.$refs.icons.style.color = 'rgb(0, 160, 220)';
			}
		}
	}
</script>

<style lang="less" scoped>
	.ratings{
		width: 100%;
		height: 9.34rem; 
		overflow: hidden;

		background-color: #f3f5f7;
		.score{
			height: 2.12rem;
			background-color: #fff;
			border-top:1px solid #e6e7e8;
			border-bottom:1px solid #e6e7e8;
			display: flex;
			& .colligate{
				width: 2.75rem;
				height: 100%;
				// background-color: #456;
				border-right: 1px #fff solid;
				float: left;
				text-align: center;
				// line-height: 1rem;
				
				& .scoreText{
					font-size: 0.48rem;
					color:rgb(255,153,0);
					line-height: 0.56rem;
					margin-top: 0.2rem;
				}
				& .scoreNum{
					font-size: 0.24rem;
					color:rgb(7,17,27);
					line-height: 0.24rem;
					margin-top: -0.3rem;
				}
				& .scoreRate{
					font-size: 0.2rem;
					color:#93999f;
					line-height: 0.2rem;
				}
			}
			& .serve{
				width: 4.75rem;
				// height: 100%;
				// background-color: #ccc;
				margin-top: 0.3rem;
				& .service{
					font-size: 0.24rem;
					color:rgb(7,17,27);
					line-height: 0.36rem;
					display: flex;
					margin-left: 0.5rem;
					// margin-top: 0.4rem;
				}
				& .star{
					float: left;
					margin-left: 0.27rem;
					color:rgb(255,153,0);
				}
				& .starText{
					// float: left;
					// margin-left: 0.27rem;
					color:rgb(255,153,0);
				}
				& .deliveryTime{
					margin-left: 0.53rem;
					color:rgb(174,153,159);
				}
			}
		}
		.satisfaction{
			width: 100%;
			height: 2.23rem;
			border-top:1px solid #e6e7e8;
			border-bottom:1px solid #e6e7e8;
			background-color: #fff;
			margin-top: 0.33rem;
			& .satisfaction-two{
				display: flex;
				width: 6.78rem;
				height: 1.34rem;
				border-bottom:1px solid #e6e7e8;
				margin:0 auto;
				& div{
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
				& .total{
					float: left;
					background-color: #00a0dc;
				}
				& .pleased{
					background-color: #ccecf8;
				}
				& .discontent{
					background-color: #e9ebec;
				}
			}
			& .satisfaction-three{
				// width: 100%;
				height: 0.68rem;
				line-height: 0.4rem;
				margin-left: 0.4rem;

				 & .icon-check_circle{
					font-size: 0.4rem;
					color:#b7bbbf;
					margin-top: -0.2rem;
				}
				& .word-one{
					font-size: 0.24rem;
					color:#b7bbbf;
					font-weight: 700;
					position: relative;
					top:-0.05rem;
					left:-0.1rem;
				} 
			}
			
		}
		 .evaluate{
		 	width: 100%;
		 	// height: 200%;
		 	overflow: hidden;
			background-color: #fff;
			
			& div{
				width: 6.78rem;
				height: 2.6rem;
				margin:0 auto;
				border-bottom:1px solid #e6e7e8;
				& .evaluate-left{

				}
				
				& .evaluate-right{
					width: 5.6rem;
					margin-left: 1.3rem;
					margin-top:-2.8rem;
					border-color: #fff;
					& .username{
						font-size: 0.2rem;
					}
					& .uTime{
						font-size: 0.2rem;
					}
					& .item-text{
						font-size: 0.24rem;
						// margin-top: -0.2rem;
					}

				}
			}


			
		} 
	}

</style>