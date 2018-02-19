<style lang="less">
.w1 {
	margin-top: 20px;
}
</style>
<template>
	<div class="container">
		<group>
			<x-textarea 
				title="标题" 
				placeholder="请用一句话描述你的需求" 
				:show-counter="false" 
				:rows="1"
				v-model="title"
				autosize>
			</x-textarea>
			<x-textarea 
				v-model="content"
				:max="1000" 
				name="描述" 
				placeholder="内容越清晰, 需求完成率就越高哦">
			</x-textarea>
			<!-- 上传图片 -->

			<wc-upload
				@upload="v=>uploadImgList.push(v)"
				@del="index=>uploadImgList.splice(index, 1)"
				:list="previewList"
				:max="10">
			</wc-upload>


<!-- 			<div class="wc-file-list clearfix">
				<div class="file-item" v-for="(url, key) in localIds" :key="key">
					<img :src="url" alt="" class="img-control">
					<div class="del" @click="del(key)">删除</div>
				</div>				
			</div>
			<div class="wc-upload" v-show="isShowUploadBtn" @click="chooseImgs">
				+
			</div> -->
			<!-- end 上传图片 -->
		</group>
		<group>
			
			<!-- 订单类型 -->
			<popup-picker 
				confirm-text="确定"
				cancel-text="取消"
				title="订单类型" 
				:columns="2"
				show-name
				:data="orderTypeList" 
				v-model="orderTypeChooseValue">
			</popup-picker>

			<x-input type="text" title="订单数量:" v-model="num" :required="true" placeholder="记得加上单位哦"></x-input>

			<!-- 交易方式 -->
			<popup-picker 
				confirm-text="确定"
				cancel-text="取消"
				title="交易方式"
				show-name
				:data="tradeWayList" 
				v-model="tradeWayChooseValue">
			</popup-picker>

			<!-- 截止日期 -->
			<datetime 
				confirm-text="确定"
				cancel-text="取消"
				:start-date="startDate"
				:end-date="endDate"
				v-model="endTime" 
				title="截止日期">
			</datetime>

			<!-- 所在地址 -->
			<x-address
				confirm-text="确定"
				cancel-text="取消" 
				title="所在地址" 
				v-model="addressChooseList" 
				:list="addressData" 
				placeholder="请选择地址">
			</x-address>

			<x-input type="tel" v-model="telephone" title="手机号码:" :required="true" is-type="china-mobile" :disabled="true"></x-input>
			<x-input type="text" v-model="linkman" title="联系人:" :required="true" is-type="china-name"></x-input>
			<checklist title="优先选择" :max="3" :options="periorList" v-model="periorChooseList" class="perior">
			</checklist>

		</group>


		<div class="btn-bar" v-show="isEditing">
			<x-button type="primary" class="w1" @click.native="pubslih" :disabled="disabled">
				保存修改
			</x-button>
			<x-button type="warn" class="w1" @click.native="delOrder" :disabled="disabled">
				删除
			</x-button>
		</div>
	
		<x-button v-show="!isEditing" type="primary" class="w1" @click.native="pubslih" :disabled="disabled">
			确认发布
		</x-button>
	</div>
</template>
<script>
	// const MAX_UPLOAD_NUM = 10;
	// import WX from 'config/wx'

	import PopupPicker from 'modules/vux/components/popup-picker'
	import XTextarea from 'modules/vux/components/x-textarea'
	import Checklist from 'modules/vux/components/checklist'
	import Datetime from 'modules/vux/components/datetime'
	import XAddress from 'modules/vux/components/x-address'
	


	export default {
		components: {
			PopupPicker,
			XTextarea,
			Checklist,
			Datetime,
			XAddress
		},
		data () {
			return {
				/* 用于显示本地预览*/
				// localIds: [],
				// isShowUploadBtn: true,
				/* 保存真实图片 url */
				uploadImgList: [],
				previewList: [],

				/* 整体需要的数据*/
				title: '',
				content: '',

				orderTypeList: [],
				orderTypeChooseValue:[],
				/* 订单数量*/
				num: '',

				/* 交易方式*/
				tradeWayChooseValue: [],

				/*截止日期*/
				endTime: '',

				addressChooseList: [],
				/* 手机号*/
				telephone: '',
				/* 联系人 */
				linkman: '',

				/* 优先选择 */
				periorChooseList: [1,2,3],
				disabled: false,

				isEditing: false,

				/* 订单保存 */
				noteId: ''
			}
		},
		computed: {
			tradeWayList () {
				return this.$store.state.tradeWayList
			},
			startDate () {
				return this.$store.state.startDate
			},
			endDate () {
				return this.$store.state.endDate
			},
			periorList () {
				return this.$store.state.periorList
			},
			addressData () {
				return this.$store.state.addressData
			}
		},
		mounted () {

			let user = utils.safeParse(ss.get('user'));

			if (user) {
				this.init(user);
			}
			
			/* 判断什么状态 */
			if (this.$route.query.isEditing) {
				this.isEditing = true;

				this.init(JSON.parse(this.$route.query.data));

			} else {
				this.isEditing = false;
			}

			let now = +new Date().getTime();
			let threeDays = now + 15*24*60*60*1000;
			let obj = utils.timeFormat(threeDays);

			let endDate = obj.year + '-' + obj.month + '-' + obj.day;

			setTimeout(()=>{
				this.endTime = endDate
			},100)



			/* 拿订单类型 */
			this.$store.dispatch('orderType')
				.then(res=>{
					this.orderTypeList = res;

					console.log(JSON.stringify(this.orderTypeList))
				});
		},
		methods: {
			init (data) {


				this.noteId = data.id;

				/* title */
				this.title = data.title;
				this.content = data.content;

				/* 订单类型 */

				if (data.orderTypeId) {
					this.orderTypeChooseValue.push(data.orderTypeId.toString());
					this.orderTypeChooseValue.push(data.orderTypeParentId.toString());	
					
				}
				

				this.num = data.num;

				if (data.tradeWay) {
					this.tradeWayChooseValue.push(data.tradeWay.toString());
				}

				

				this.addressChooseList.push(data.provinceId.toString(), data.cityId.toString(), data.townId.toString());

				this.telephone = data.telephone;

				this.linkman = data.linkman;

				this.periorChooseList = [];
				// this.periorChooseList.
				if (data.isCredit) {
					this.periorChooseList.push(2);
				}
				if (data.isIdentity) {
					this.periorChooseList.push(1);
				}
				if (data.isQuality) {
					this.periorChooseList.push(3)
				}

				if (data.image) {
					this.previewList = data.image.split(',') || [];

					console.log(data.image.split(','), JSON.stringify(this.previewList))
				}

				if (data.endTime) {
					let timeObj = utils.timeFormat(data.endTime*1000);

					setTimeout(()=>{
						this.endTime = timeObj.year + '-' + timeObj.month + '-' + timeObj.day;

					},100)					
				}



				// this.timePlaceholder = this.endTime;

				// console.log(this.endTime)


			},

			delOrder () {

				this.$confirm('确定删除吗?')
					.then(res=>{
						this.$loading.show('正在删除')
						this.$store.dispatch('orderDel', {
							data: {
								id: this.noteId
							}
						}).then(res=>{
							this.$loading.hide();
							if (res.code == 200) {
								this.$toast('删除成功');
								setTimeout(()=>{
									this.$router.push({
										path: '/mypublish'
									});
								}, 1000);
							} else {
								this.$alert(res.msg);
							}
						})					
					}).catch(res=>{

					})


			},
			/* 上传 */
			pubslih () {

				console.log(this.endTime)
				/*
					参数校验
				*/
				/* 标题*/
				if (!this.title) {
					this.$alert('标题必填');
					return;
				}

				if (!this.content) {
					this.$alert('描述必填');
					return;
				}

				if (!this.num) {
					this.$alert('订单数量必填');
					return;
				}


				if (!this.orderTypeChooseValue.length) {
					this.$alert('订单类型必选');
					return;
				}

				if (!this.tradeWayChooseValue.length) {
					this.$alert('订单类型必选');
					return;
				}

				if (!this.endTime) {
					this.$alert('时间必选');
					return;
				}

				if (!this.addressChooseList.length) {
					this.$alert('地址必选');
					return;
				}

				if (!this.telephone) {
					this.$alert('手机号必填');
					return;
				}

				if (!this.linkman) {
					this.$alert('联系人必填');
					return;
				}

				/* 拼接参数 */

				let params = {
					type: this.$route.query.type,
					title: this.title,
					content: this.content,
					image: this.uploadImgList.join(','),
					num: this.num,
					telephone: this.telephone,
					linkman: this.linkman,
					/* 订单类型 */
					orderTypeId: this.orderTypeChooseValue[0],
					orderTypeParentId: this.orderTypeChooseValue[1],
					/* 交易方式*/
					tradeWay: this.tradeWayChooseValue[0],
					/* 截止日期, s 级别*/
					endTime: new Date(this.endTime).getTime()/1000,

				}

				if (this.isEditing) {
					params.id = this.noteId;
				}


				params.provinceId = this.addressChooseList[0];
				params.cityId = this.addressChooseList[1];
				params.townId = this.addressChooseList[2];


				/* 是否实名认证 */
				params.isIdentity = (this.periorChooseList.indexOf(1) > -1 ? 1 : 0);

				/* 是否诚信保障 */
				params.isCredit = (this.periorChooseList.indexOf(2) > -1 ? 1 : 0);

				/* 是否品质监护 */
				params.isQuality = (this.periorChooseList.indexOf(3) > -1 ? 1 : 0);

				/*feedback*/
				this.disabled = true;


				if (this.isEditing) {
					this.$loading.show('正在保存');
					this.$store.dispatch('orderEdit', {
						data: params
					}).then(res=>{
						this.disabled = false;
						this.$loading.hide();
						if (res.code == 200) {
							this.$toast('保存成功');
							setTimeout(()=>{
								this.$router.push({
									path: '/mypublish'
								})
							},1000)
						}
					})					
				} else {

					this.$loading.show('正在发布');
					this.$store.dispatch('publish', {
						data: params
					}).then(res=>{
						this.disabled = false;
						this.$loading.hide();
						if (res.code == 200) {
							this.$toast('发布成功');
							setTimeout(()=>{
								this.$router.push({
									path: '/lookfororder'
								})
							},1000)							
						}
					})	

				}



			},
			// /* 删除图片 */
			// del (index) {
			// 	this.localIds.splice(index,1);
			// 	this.uploadImgList.splice(index,1);
			// 	if (this.localIds.length < MAX_UPLOAD_NUM) {
			// 		this.isShowUploadBtn = true;
			// 	}
			// },
			// chooseImgs () {
			// 	/*
			// 		上传步骤
			// 		1. 拿微信签名
			// 		2. 配置 config 的参数
			// 		3. config 
			// 		4. 在 ready 里面开始拿接口
			// 		5. 拿到图片之后保存图片的连接
			// 		6. 上传图片
			// 		依赖关系
			// 		1. app_id
			// 	*/
			// 	/* 
			// 		动态计算一下当前还可以选择几张图片
			// 		1. 拿到上传图片的最大数量 
			// 		2. 拿到当前已经上传的图片数量
			// 		3. 计算还可以选择 几张
			// 			如果大于 9, 则为 9
			// 			如果小于 9, 则就是本身的值
			// 	*/
			// 	let alreadyUploadImgsNum = this.localIds.length;
			// 	let curMaxUploadImgsNum = 9;
			// 	if (MAX_UPLOAD_NUM - alreadyUploadImgsNum < 9) {
			// 		curMaxUploadImgsNum = MAX_UPLOAD_NUM - alreadyUploadImgsNum;
			// 		/* 一般不会出现这样的状况 */
			// 		if (curMaxUploadImgsNum<0) {
			// 			curMaxUploadImgsNum = 0;
			// 		}
			// 	}
			// 	/* 因为在回调里面 this 不指向 vue */
			// 	let that = this;
			// 	/* 拿到微信授权 */
			// 	let signParams = {
			// 		data: {
			// 			reqUrl: encodeURIComponent(location.href)
			// 		}
			// 	}
			// 	wc.get({
			// 		path: 'weixin/signature',
			// 		params: signParams
			// 	}).then(res=>{
			// 		if (res.code == 200) {
			// 			return new Promise((resolve)=>{
			// 				resolve(res.data[0])
			// 			});
			// 		}
			// 	}).then(res=>{
			// 		let configParams = {
			// 			debug: false,
			// 			appId: WX[process.env.NODE_ENV].APP_ID,
			// 			timestamp: res.timestamp,
			// 			nonceStr: res.noncestr,
			// 			signature: res.signature,
			// 			jsApiList: ['checkJsApi','chooseImage', 'uploadImage'] 
			// 		}
			// 		wx.config(configParams);
			// 		wx.ready(()=>{
			// 			wx.chooseImage({
			// 				// 默认9
			// 				count: curMaxUploadImgsNum, 
			// 				// 可以指定是原图还是压缩图，默认二者都有
			// 				sizeType: ['original', 'compressed'], 
			// 				// 可以指定来源是相册还是相机，默认二者都有
			// 				sourceType: ['album', 'camera'], 
			// 				success (res) {
			// 					// 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
			// 					that.localIds = that.localIds.concat(res.localIds); 
			// 					if (that.localIds.length >= MAX_UPLOAD_NUM) {
			// 						that.isShowUploadBtn = false;
			// 					}
			// 					/* 上传图片 */
			// 					let count = 0;
			// 					let curIds = res.localIds;
			// 					uploadImg(curIds[count]);
			// 					function uploadImg (localId) {
			// 						wx.uploadImage({
			// 							// 需要上传的图片的本地ID，由chooseImage接口获得
			// 							localId: localId, 
			// 							// 默认为1，显示进度提示
			// 							isShowProgressTips: 1, 
			// 							success (res) {
			// 								/*
			// 									调用接口, 拿到图片的真实 url, 并且保存到 
			// 									uploadImgList
			// 								*/
			// 								that.$store.dispatch('saveImg', {
			// 									image: localId
			// 								}).then(res=>{
			// 										that.uploadImgList.push(res.data);
			// 										count++
			// 										uploadImg(curIds[count]);	
			// 									})
			// 							}
			// 						});						
			// 					}
			// 				}
			// 			});
			// 		})
			// 	});
			// }
		}
	}
</script>