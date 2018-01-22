<style lang="less" scoped>

/*
	不要使用那种 square grid layout, 通过 padding-bottom 来实现正方形的
	情况, 我觉得宁愿使用 js 来计算, 都强过这种. 

	因为这种布局适应不了千变万化的外部布局. 导致了很多种异常情况. 
	所以我还是使用一个固定宽度布局. 
*/

.wc-upload-item {
	height: 86px;
	min-width: 82px;
	width: 25%;
	float: left;
	position: relative;
	
	img {
		height: 100%;
		width: 100%;
	}
	.del {
		position: absolute;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		width: 100%;
		font-size: 13px;
		color: white;
		text-align: center;
		padding: 4px 0;
	}

	&:last-child{
		display: flex;
		align-items: center;
		justify-content: center;
		border: .5px dashed #e5e5e5;
		color: #ddd;
		font-size: 50px;
		background: #f9f9f9;
	}
}	
/* 会默认放在中间, 都不知道为什么 */
.wc-upload-logo {
	height: 80px;
	width: 80px;
	display: flex;
	background: #f9f9f9;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	svg {
		height: 26px;
		width: 26px;
	}

	.logo {
		height: 100%;
		width: 100%;
		border-radius: 50%;
	}
}

// .single-item {
// 	background: red;
// 	height: 88px;
// 	width: 88px;
// 	padding-bottom: 0;

// 	.inner-item {
// 		background: red;
// 	}
// }
</style>
<template>
	<div class="wc-upload-container clearfix">

		<div class="wc-upload-item" v-for="(url, key) in previewList" :key="key" v-if="type=='list'">
			<img :src="url" alt="">
			<div class="del" @click="del(key)" v-show="!disabled">删除</div>					
		</div>

		<div class="wc-upload-item" @click="upload" v-if="previewList.length<max && type=='list'">
			+
		</div>
		
		<div class="wc-upload-logo" @click="upload" v-if="type=='logo'">
			<svg v-show="!previewList.length" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1640" xmlns:xlink="http://www.w3.org/1999/xlink">
				<path d="M512 288c-124.8 0-224 99.2-224 224s99.2 224 224 224 224-99.2 224-224S636.8 288 512 288zM512 688c-96 0-176-80-176-176s80-176 176-176 176 80 176 176S608 688 512 688z" p-id="1641">
					
				</path>
				<path d="M768 371.2a1.6 1.6 0 1 0 102.4 0 1.6 1.6 0 1 0-102.4 0Z" p-id="1642">
					
				</path>
				<path d="M864 224l-96 0-22.4-67.2c-6.4-16-25.6-28.8-41.6-28.8l-384 0c-19.2 0-35.2 12.8-41.6 28.8l-22.4 67.2-96 0c-54.4 0-96 41.6-96 96l0 448c0 54.4 44.8 96 96 96l704 0c54.4 0 96-41.6 96-96l0-448C960 265.6 918.4 224 864 224zM912 768c0 25.6-22.4 48-48 48l-704 0c-25.6 0-48-22.4-48-48l0-448c0-25.6 22.4-48 48-48l96 0 35.2 0 9.6-32 22.4-64 377.6 0 22.4 64 9.6 32 35.2 0 96 0c25.6 0 48 22.4 48 48L912 768z" p-id="1643">
					
				</path>
			</svg>

			<img :src="previewList[0]" alt="" class="logo" v-show="previewList.length">
		</div>

	</div>
</template>
<script>

	/*
		所有依赖外界的玩意, 都被我打上了 ### 的标记, 搜索即可看见
		1. import WX
	*/
	
	// ###
	import WX from 'config/wx'
	export default {
		props: {
			/* list 是所有的预览图容器, 用户选择图片之后, 拿到的预览就会放在这里 */
			list: {
				default () {
					return []
				}
			},
			max: {
				default: 9
			},
			type: {
				default: 'list'
			},
			/* 是否显示删除按钮,  有时候可能不允许用户再修改这个玩意了, 所以删除和点击, 都要干掉*/
			disabled: {
				default: false
			}
		},
		data () {
			return {
				previewList: []
			}
		},
		mounted () {
			/* 这个处理 list 同步 */
			this.previewList = this.list;
		},
		/* 
			watch list 的主要原因, 是因为当父组件异步更新 list 之后, 我们是同样要显示
			出来的 
		*/
		watch: {
			list: {
				deep:true,
				handler (n) {
					this.previewList = [];
					n.forEach(item=>{
						this.previewList.push(item);
					})
				}
			}
		},
		methods: {
			/* 上传图片 */
			upload () {
				if (this.disabled) {
					return;
				}

				let that = this;
				/* 先拿到微信签名 */
				this.fetchWXSign()
					.then(res=>{
						/* 然后配置 wx.config */
						let configParams = {
							debug: false,
							// ###
							appId: WX[process.env.NODE_ENV].APP_ID,
							timestamp: res.timestamp,
							nonceStr: res.noncestr,
							signature: res.signature,
							jsApiList: ['checkJsApi','chooseImage', 'uploadImage'] 
						}

						wx.config(configParams);

						/* 然后在 ready 之后开始调用 */
						/* 从这里开始所有的 this, 都使用 that 替代*/
						wx.ready(()=>{
							let count = that.count(this.previewList.length, that.max);
							/* 如果当次上传数量为0, 就不允许再上传了
							   这个可能是因为上次上传d
							 */
							if (count == 0) {
								return;
							}
							wx.chooseImage({
								// 默认9
								count: count, 
								// 可以指定是原图还是压缩图，默认二者都有
								sizeType: ['original', 'compressed'], 
								// 可以指定来源是相册还是相机，默认二者都有
								sourceType: ['album', 'camera'], 
								success (res) {
									/*
										拿到列表之后保存到当前列表
									*/
									that.previewList = that.previewList.concat(res.localIds); 
									/*
										将 localId 变成 serverId
										并且一次只能将一个 localId 变成 serverId
									*/
									let count = 0;
									let curIds = res.localIds;

									let transformToServerId = localId => {
										/* 如果当前 count 的数量大于等于整个当次选中的
										图片的个数, 那么就停止这种转换, 因为说明已经转换
										的差不多了*/
										if (count >= res.localIds.length) {
											// this.uploadDone = true;
											this.$emit('uploadEnd', true);
											return;
										}

										wx.uploadImage({
											localId: localId,
											isShowProgressTips: 1,
											success (res) {

												that.$store.dispatch('saveImg', {
													image: res.serverId
												}).then(res=>{
													that.$emit('upload', res.data);

													count++;
													/* 继续下一个*/
													transformToServerId(curIds[count]);

												});
											}
										});
									}

									transformToServerId(curIds[count]);
								}
							});
						})
					});
			},

			/* ###拿微信签名 */
			fetchWXSign () {
				/* 拿到微信授权 */
				let signParams = {
					data: {
						reqUrl: encodeURIComponent(location.href.split('#')[0])
					}
				}
				return wc.get({
					path: 'weixin/signature',
					params: signParams
				}).then(res=>{
					if (res.code == 200) {
						return new Promise((resolve)=>{
							resolve(res.data[0])
						});
					}
				})
			},
			/* 计算当前可以上传多少张图片 */
			count (already, max) {
				/* 如果已经上传了最大张数 */
				if (already == max) {
					return 0;
				}
				/* 如果没有到最大上传个数*/
				if (already < max) {
					/* 如果还有超过 9 张可以上传, 那么本次上传只允许 9 张*/
					if (max - already >= 9) {
						return 9;
					} else {
						return max -already;
					}
				}
			},
			/* 删除 */
			del (index) {
				this.previewList.splice(index, 1);
				this.$emit('del', index);
			}
		}
	}
</script>