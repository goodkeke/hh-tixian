<template>
	<div class="promotionPage">
		<div class="promotion-title">素材中已合成您的专属二维码<br />通过此二维码注册的新用户都在您的绑定关系中</div>
		<div class="section section-one">
			<div class="tag tag-down">扩展商家黑白传单</div>
			<div class="main">
				<div class="canvas" id="poster1" v-if="poster1">
					<img class="bg" :src="imgData1.images" alt="" @click="openImg(imgData1.images)" />
					<img class="code" :src="imgData1.qrCode" alt="" />
				</div>
				<img class="bg" @click="saveImages(posterUrl1)" v-else :src="posterUrl1" />
			</div>
			<div class="download-text tag-up">{{isInBrowser ? '长按保存图片':'点击图片下载'}}，A4纸黑白打印低成本物料</div>
			<div class="download-desc">到店 → 简易介绍 → 放下传单 → 下一家</div>
			<div class="download-desc-2">打印100份放包里，每个商家五分钟，再来两次加深印象。商家扫码注册，这个客户永远都是你的！</div>
		</div>
		<div class="block-gray"></div>
		<div class="section section-two">
			<div class="tag tag-down">邀请商家电子海报</div>
			<div class="main">
				<div class="canvas" id="poster2" v-if="poster2">
					<img class="bg" :src="imgData2.images" alt="" />
					<img class="code" :src="imgData2.qrCode" alt="" />
				</div>
				<img class="bg" @click="saveImages(posterUrl2)" v-else :src="posterUrl2" />
			</div>
			<div class="download-text tag-up">{{isInBrowser ? '长按保存图片':'点击图片下载'}}，用于发微信好友及朋友圈等</div>
		</div>
		<div class="block-gray"></div>
		<div class="section section-three">
			<div class="tag tag-down">电子海报-给商家或朋友</div>
			<div class="main" :class="{'scroll-box': isDone}">
				<div class="cell" v-for="(item,index) in  imgData3.images" :key="index">
					<div class="canvas" :id="poster3[index].id">
						<img class="bg" :src="item" alt="" @click="saveImages(item)" />
						<img class="code" v-show="posts.length < 1" :src="imgData3.qrCode" alt="" />
					</div>
					<!--                    <img :src="posterUrl3"/>-->
				</div>
				<div class="block"></div>
			</div>
			<div class="download-text tag-up">{{isInBrowser?'长按保存图片':'点击图片下载'}} ，用于发微信好友及朋友圈等<br />请根据您的社交圈特色自主选择</div>
		</div>
		<!-- 查看大图 -->
		<div class="back-drop" v-show="popupShow" style="background:#000000;" @click="popupShow=false"></div>
		<div class="images-box" v-show="popupShow" id="pop-up" @click="popupShow=false">
			<img :src="popupUrl" />
		</div>
		<transition name="fade">
			<div class="mask" v-if="showMask" @touchmove.prevent=''>
				<div class="loadding">
					<div class="thing"></div>
					<div class="thing"></div>
					<div class="thing"></div>
					<div class="thing"></div>
				</div>
				<div class="text">海报合成中...</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import {
		commonApi
	} from '@/api/index';
	import html2canvas from 'html2canvas'

	export default {
		name: "promotionPage",
		data() {
			return {
				showMask: true,
				imgData1: '',
				imgData2: '',
				imgData3: '',
				popupShow: false,
				popupUrl: '',
				posterUrl: '',
				isDone: false,
				poster1: true,
				posterUrl1: '',
				poster2: true,
				posterUrl2: '',
				poster3: [],
				posterUrl3: [],
				posts: [],
				postType: {
					'alliance_posterA': {
						name: 'poster1',
						img: 'imgData1'
					},
					'alliance_posterB': {
						name: 'poster2',
						img: 'imgData2'
					},

				}
			}
		},
		created() {},
		computed:{
			isInBrowser(){
				let state = this.tools.isWeiXin() ? true : false;
				return state
			}
		},
		async mounted() {
			await this.sendInviteFn('alliance_posterA');
			await this.sendInviteFn('alliance_posterB');
			await this.sendInviteFn('alliance_posterC');
		},
		methods: {
			//合成并渲染完毕
			async finished() {
				if (this.posts.length === 6) {
					this.imgData3.images = this.posts;
					this.isDone = true;
					this.showMask = false;
				}
			},
			saveImages(base64) {
				if (this.tools.isWeiXin()) return;
				if (this.tools.isiOS()) {
					this.bridge.callhandler('saveImages', base64.split(',')[1]);
				} else {
					window.android.saveImages(base64.split(',')[1]);
				}
			},
			//轮播图合成函数
			async draw2(element) {
				let poster = document.getElementById(element); //海报
				let obj = {
					'poster1': {
						img: 'posterUrl1',
						config: {
							useCORS: true,
							allowTaint: true,
						}
					},
					'poster2': {
						img: 'posterUrl2',
						config: {
							useCORS: true,
							allowTaint: true,
							windowWidth: poster.scrollWidth,
							windowHeight: poster.scrollHeight
						}
					},
				}
				let config = obj[element] ? obj[element].config : obj['poster2'].config;
				let timer = obj[element] ? 2000 : 1000;
				setTimeout(() => {
					html2canvas(poster, config).then(canvas => {
						if (obj[element]) {
							this[element] = false;
							this[obj[element].img] = canvas.toDataURL("image/png");
						} else {
							let imgUrl = canvas.toDataURL("image/png");
							this.posts.push(imgUrl);
							document.getElementById(element).firstElementChild.src = imgUrl;
							this.finished();
						}

					});
				}, timer)
			},
			// 查看大图
			openImg(url) {
				this.popupUrl = url;
				this.popupShow = true;
			},
			// 获取海报
			async sendInviteFn(type) {
				let params = {
					shareType: type, // 海报类型
					invitationCode: this.$route.query.code // 邀请码
				}
				const data = await commonApi(params, 'sendInvite', 'post');
				if (data.retType === 1) {
					if (type == 'alliance_posterC') {
						this.imgData3 = data.data;
						this.imgData3.images = data.data.images.split(',')
						this.imgData3.images.forEach((item, index) => {
							this.poster3.push({
								id: 'poster3' + index,
								show: true
							});
							setTimeout(() => {
								this.draw2('poster3' + index)
							}, 500)
						})
					} else {
						this[this.postType[type].img] = data.data;
						this.draw2(this.postType[type].name);
					}
				} else {
					this.showMask = false;
				}
			}
		}
	}
</script>
<style scoped lang="scss">
	@import '~@/style/mixin';

	.mask {
		position: fixed;
		height: 100%;
		width: 100%;
		background: rgba(51, 51, 51, .7);
		z-index: 100;
		$size: 50px;

		.text {
			color: white;
			width: 150px;
			margin-top: 80px;
			margin-left: 20px;
			@include setCenter();
		}

		.loadding {
			@include setCenter();
			height: #{$size * 2};
			width: #{$size * 2};
			position: relative;
			perspective: 1000px;

			.thing {
				height: $size;
				width: $size;
				background-color: #E87722;
				position: absolute;
				box-sizing: border-box;
				top: 0;
				left: 0;
			}

		}
	}

	@for $i from 1 through 4 {
		.thing:nth-of-type(#{$i}) {
			animation: bounce 0.5s ease-in-out infinite alternate,
			move 4s #{-$i}s infinite;
		}
	}

	@keyframes bounce {
		from {
			transform: scale(1);
		}

		to {
			transform: scale(0.8);
		}
	}

	@keyframes move {
		0% {
			top: 0;
			left: 0;
			background-color: #E87722;
		}

		25% {
			top: 0;
			left: 50%;
			background-color: #A4D65E;
		}

		50% {
			top: 50%;
			left: 50%;
			background-color: #69B3E7;
		}

		75% {
			top: 50%;
			left: 0;
			background-color: #FFC845;
		}
	}

	#poster2 {
		width: 100%;
		height: auto;
		margin: auto;

		img {
			&:first-child {
				width: 100%;
			}
		}
	}

	#poster1 {
		width: 100%;

		img {
			&:first-child {
				width: 100%;
			}
		}
	}

	.promotionPage {
		.back-drop {
			height: 100%;
			width: 100%;
			background: #000;
			left: 0;
			bottom: 0;
			position: fixed;
			z-index: 100;
		}

		.promotion-title {
			background: #E0E0E0;
			color: #f34f43;
			text-align: center;
			font-size: 13px;
			padding: 10px 0;
		}

		.block-gray {
			height: 10px;
			background: #f8f8f8;
		}

		.section {
			.tag-down {
				&::after {
					content: '';
					display: block;
					@include angle-down();
					position: absolute;
					bottom: 5px;
					margin-left: -10px;
					left: 50%;
					border-radius: 3px;

				}
			}

			.tag-up {
				margin-top: 10px;
				padding-top: 10px;

				&:after {
					content: '';
					display: block;
					position: absolute;
					top: -10px;
					margin-left: -10px;
					left: 50%;
					border-radius: 3px;
					@include angle-down(12px, 18px, #333333, bottom);
				}
			}

			.tag {
				position: relative;
				color: #333;
				font-weight: bold;
				font-size: 18px;
				text-align: center;
				padding: 10px 0;
				padding-bottom: 30px;

			}

			.download-text {
				color: #2196F3;
				font-size: 16px;
				text-align: center;
				margin: 15px 0 10px 0;
				position: relative;
			}

			.download-desc {
				font-size: 16px;
				color: #333;
				text-align: center;
				margin-bottom: 10px;
				font-weight: bold;
			}

			.download-desc-2 {
				padding: 0 30px;
				font-size: 14px;
				color: #333;
				text-align: center;
				margin-bottom: 10px;
			}

			.canvas {
				width: 100%;
				position: relative;
				margin: 0 auto;
			}

			.main {
				text-align: center;
				width: 100%;
				margin: auto;
				display: block;

				.bg {
					width: 100%;
					display: block;
					margin: auto;
				}

				// .code {
				//    width: 30px;
				//    position: absolute;
				//    bottom: 35px;
				//    right: 25px;
				// }
			}

			.scroll-box {
				display: flex;
				display: -moz-flex;
				display: -webkit-flex;
				overflow-x: scroll;
				-webkit-overflow-scrolling: touch;

				.cell {
					margin-left: 10px;

					div {
						width: 200px;
						height: auto;
					}
				}

				img {

					display: block;
				}

				.block {
					width: 10px;
				}
			}
		}

		.section-one {
			.code {
				width: 52px;
				bottom: 56px;
				right: 43px;
				position: absolute;
			}
		}

		.section-two {
			.code {
				width: 92px;
				position: absolute;
				top: 702px;
				right: 141px;
				;
			}
		}

		.section-three {
			.code {
				width: 80px;
				position: absolute;
				bottom: 25px;
				right: 45px;
			}

			.main {
				width: 100% !important;
			}
		}

		// 查看大图
		.images-box {
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 100%;
			z-index: 999;
			text-align: center;

			img {
				max-width: 80%;
			}
		}
	}
</style>
