<style lang="less">
.wc-form-container {
	// margin-bottom: 70px;
	position: relative;
}
.wc-form-reset-group {
	background: red;
	.weui-cells  {
		margin-top: -1px;
	}
	.wc-upload-container {
		padding: 10px;
	}
	.vux-number-round .vux-number-selector-sub svg {
	    position: relative;
	    top: -1px;
	    left: -2px;
	}
	.vux-number-selector-plus {
		svg {
		    position: relative;
		    top: -3px;
		    left: -3px;			
		}
	}
}

.wc-form-mask {
	position: absolute;
	background: white;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	opacity: 0;
}

.wc-form-mock {
	height: .5rem;
	background: red;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 16px;
	color:white;
}
</style>
<template>
	<div class="wc-form-container">
		<group class="wc-form-reset-group">
			<group v-for="(data,key) in value" :key="key">
				<!-- 
					手机号码
					* 默认会添加 is-type="china-mobile"
					* 默认格式化, 但是这样会让保存的时候的值也是格式化的值, 这个要注意
				 -->
				<x-input
					v-if="data.type=='tel' && data.show!==false"
					type="tel"
					is-type="china-mobile"

					:placeholder="data.placeholder"
					:disabled="data.disabled"
					:required="data.required"
					v-model="data.value"
					@on-change="change"
					:readonly="data.readonly"
					:title="data.name">
				</x-input>
				<!-- 
				 -->
				<x-input
					v-if="data.type=='text' && data.show!==false"
					type="text"
					:placeholder="data.placeholder"
					:disabled="data.disabled"
					:required="data.required"
					v-model="data.value"
					@on-change="change"
					:readonly="data.readonly"
					:title="data.name">
				</x-input>
				<!-- number -->
				<x-input
					v-if="data.type=='number' && data.show!==false"
					type="number"
					:placeholder="data.placeholder"
					:disabled="data.disabled"
					:required="data.required"
					v-model="data.value"
					@on-change="change"
					:readonly="data.readonly"
					:title="data.name">
				</x-input>
				<!-- email -->
				<x-input
					v-if="data.type=='email' && data.show!==false"
					type="email"
					:placeholder="data.placeholder"
					:disabled="data.disabled"
					:required="data.required"
					v-model="data.value"
					@on-change="change"
					:readonly="data.readonly"
					:title="data.name">
				</x-input>
				<!-- password -->
				<x-input
					v-if="data.type=='password' && data.show!==false"
					type="password"
					:placeholder="data.placeholder"
					:disabled="data.disabled"
					:required="data.required"
					v-model="data.value"
					@on-change="change"
					:readonly="data.readonly"
					:title="data.name">
				</x-input>
				<x-input
					v-if="data.type=='vcode' && data.show!==false"
					@on-change="change"
					v-model="data.value"
					title="发送验证码">
					<x-button
						:disabled="countDownDisabled||data.disabled"
						@click.native="sendVCode" 
						slot="right" 
						type="primary" 
						mini>
						{{countDownText}} <span class="countdown" v-show="countDown">({{countDown}})</span>
					</x-button>
				</x-input>
				<popup-picker
					v-if="data.type=='popuppicker' && data.show!==false"
					confirm-text="确定"
					cancel-text="取消"
					show-name
					:columns="data.columns"
					:data="data.data"
					:title="data.name"
					@on-change="change"
					v-model="data.value">
				</popup-picker>	
				<!-- 日期选择 -->
				<datetime 
					v-if="data.type=='date' && data.show!==false"
					confirm-text="确定"
					cancel-text="取消"
					:start-date="data.startDate"
					:end-date="data.endDate"
					v-model="data.value"
					@on-change="change" 
					:title="data.name">
				</datetime>

				<!-- textarea -->
				<x-textarea
					v-if="data.type=='textarea' && data.show!==false"
					v-model="data.value"
					:max="data.max" 
					:title="data.name"
					:rows="data.rows"
					:autosize="data.autoSize"
					@on-change="change" 
					:placeholder="data.placeholder">
				</x-textarea>
				<!-- 左右切换, 开关-->
				<x-switch
					v-if="data.type=='switch' && data.show!==false"
					:disabled="data.disabled"
					:title="data.name"
					@on-change="change"
					v-model="data.value">
				</x-switch>
				<!-- 数字加减 -->
				<x-number 
					v-if="data.type=='numberPicker' && data.show!==false"
					:title="data.name" 
					v-model="data.value" 
					button-style="round" 
					:min="data.min"
					@on-change="change" 
					:max="data.max">
				</x-number>
				<!-- 地址选择 -->
				<x-address
					v-if="data.type=='address' && data.show!==false"
					confirm-text="确定"
					cancel-text="取消" 
					:title="data.name" 
					v-model="data.value" 
					:list="data.data"
					@on-show="change" 
					:placeholder="data.placeholder">
				</x-address>	
				<!-- 单选 -->
				<!-- 这个是必须要有 group 包裹来设置标题, 否则 -->
			    <group :title="data.name" v-if="data.type=='radio' && data.show!==false">
			      <radio
			      	@on-change="change"
			      	v-model="data.value"
			      	:options="data.data">
			      </radio>
			    </group>
			    <!-- 复选框 -->
				<checklist
					@on-change="change"
					v-if="data.type=='checklist' && data.show!==false" 
					:title="data.name" 
					:required="data.required"
					:options="data.data" 
					v-model="data.value">
				</checklist>
				<wc-upload
					v-if="data.type=='upload' && data.show!==false"
					@upload="v=>data.value.push(v)"
					@del="index=>data.value.splice(index, 1)"
					:list="data.data"
					:max="data.max">
				</wc-upload>
			</group>
		</group>
		<!-- 允许用户自己定义按钮 -->
		<slot/>
		<!-- 生成mock 数据的按钮 -->
		<div class="wc-form-mock" @click="toMock" v-show="mock">生成mock 数据</div>
		<div class="wc-form-mask" v-if="disabled">
		</div>
	</div>
</template>
<script>

	import cloneDeep from 'lodash/cloneDeep'
	import {Group, XInput, XTextarea, Datetime, PopupPicker, XAddress, XSwitch, XNumber, Radio, PopupRadio, Checklist, XButton} from 'vux'

	export default {
		components: {
			Group,
			XInput,
			PopupPicker,
			XTextarea,
			Datetime,
			XAddress,
			XSwitch,
			XNumber,
			Radio,
			PopupRadio,
			Checklist,
			XButton
		},
		/* 获取 form 的值*/
		props: {
			value: {
				default () {
					return {}
				}
			},
			/* 当前表单是否可以被编辑, 我是直接在表单上面加了一个 mask*/
			disabled: {
				default: false
			},
			mock: {
				default: false
			}
		},
		data () {
			return {
				countDownText: '发送验证码',
				countDown: '',
				countDownDisabled: false,
			}
		},
		watch: {
			value: {
				deep: true,
				handler (n) {
					/* 清空当前已经渲染出来的list, 否则会重复渲染 */
				}
			},
		},
		methods: {
			/* 点击保存按钮的时候 */
			save () {
				let form = {};
				let flag = true;
				/* 验证必填值是否已经填写 */
				for (let key in this.value) {
					/* 
						value 可能是字符串, 也能是 bool, 还可能是一个 list, 所以要区分对待 
					*/
					/* 如果值必填, 并且在页面上是需要显示这个值的 */
					if (this.value[key].required && this.value[key].show!==false) {
						let v = this.value[key].value;
						if (typeof v === 'string' && !v) {
							this.$alert(this.value[key].name + '必填');
							flag = false;
							break;
						} else if (Array.isArray(v) && v.length === 0) {
							this.$alert(this.value[key].name + '必选');
							flag = false;
							break;
						} else {
							/* 切记这一句 */
							form[key] = this.value[key].value;
						}
					} else {
						form[key] = this.value[key].value;	
					}
					/*
						最近更新
						关于 form upload 的描述
						比如进来之后已经有默认值的时候, 哎不想写. 
					*/

					/* 因为 upload  有初始值, 所以在提交的时候还需要把初始值给 value */
					/* 不用,如果用户自己忘记了初始化, 这个不管你的事情 */
					// if (this.value[key].type == 'upload') {
					// 	form[key] = this.value[key].data.concat(form[key])
					// }

					// console.log(JSON.stringify(this.value))
				}
				/* 如果通过验证, 就发送表单出去 */
				if (flag) {
					// this.$emit('save', form);
					return form;
				} else {
					return false;
				}
			},
			/* 发送验证码 */
			sendVCode () {
				this.countDown = 59;
				this.countDownDisabled = true;
				let timer = setInterval(()=>{
					this.countDown--;
					if (this.countDown==0) {
						this.countDownText = '重新发送';
						this.countDownDisabled = false;
						clearInterval(timer);
					}
				}, 1000);
				/* 因为用 sendVCode 太麻烦, 所以直接用 send */
				this.$emit('send');
			},
			/* change */
			change () {
				this.$emit('input', this.value);
			},
			/* 生成 mock 数据*/
			toMock () {
				for (let key in this.value) {
					let v = this.value[key];

					if (v.type == 'text') {
						v.value = `mock老谢好帅${utils.timeFormat().hour}:${utils.timeFormat().minute}`
					}
					if (v.type == 'textarea') {
						v.value = '云破月来花弄影'
					}
					if (v.type == 'tel') {
						v.value = '18888888888'
					}
					if (v.type == 'radio') {
						v.value = v.data[0].key;
					}

					if (v.type == 'checklist') {
						v.value = [v.data[0].key];
					}

					if (v.type == 'address') {
						v.value = ["140000","140100","140105"]
					}

					if (v.type == 'popuppicker') {
						if (v.columns == 2) {
							// v.value.push()
						}
					}

					if (v.type == 'date') {
						v.value = v.startDate;
					}

					if (v.type == 'upload') {
						v.data = ['http://n.sinaimg.cn/news/transform/w1000h500/20180119/gOqx-fyqtwzu6122241.jpg'];
					}

				}
			}
		}
	}
</script>