<style lang="less">
.wc-form-container {
	margin-bottom: 70px;
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
.wc-form-save-btn {
	position: fixed!important;
	bottom: 0;
	border-radius: 0!important;
	:after {
		border: none!important;
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
</style>
<template>
	<div class="wc-form-container">
		<group class="wc-form-reset-group">
			<group v-for="data in value">
				<!-- 
					手机号码
					* 默认会添加 is-type="china-mobile"
					* 默认格式化, 但是这样会让保存的时候的值也是格式化的值, 这个要注意
				 -->
				<x-input
					v-if="data.type=='tel' && data.show!==false"
					type="tel"
					is-type="china-mobile"
					mask="999 9999 9999"
					:placeholder="data.placeholder"
					:disabled="data.disabled"
					:required="data.required"
					v-model="data.value"
					@on-change="change"
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
					:title="data.name">
				</x-input>
				<x-input
					v-if="data.type=='vcode' && data.show!==false"
					@on-change="change"
					title="发送验证码">
					<x-button
						:disabled="countDownDisabled"
						@click.native="sendVCode" 
						slot="right" 
						type="primary" 
						mini>
						{{countDownText}} <span class="countdown" v-show="countDown">({{countDown}})</span>
					</x-button>
				</x-input>
				<!-- 
					poppicker 
					用户传递的 data 只要是 key:value 形式即可, 省去我的记忆负担
					用户可以随意传递 list, 但是要指明 key, value 都是什么字段.
					然后我通过这个可以自己转换
				-->
				<popup-picker
					v-if="data.type=='popuppicker' && data.show!==false"
					confirm-text="确定"
					cancel-text="取消"
					show-name
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
				<!-- 文本输入框 -->
				<x-textarea
					v-if="data.type=='textarea' && data.show!==false"
					v-model="data.value"
					:max="data.max" 
					:title="data.name"
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
					@on-change="change" 
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
		<x-button
			class="wc-form-save-btn"
			@click.native="save"
			:disabled="disabled"
			type="primary">
			保存
		</x-button>
		<div class="wc-form-mask" v-if="disabled">
		</div>
	</div>
</template>
<script>

	import cloneDeep from 'lodash/cloneDeep'
	import {XTextarea, Datetime, PopupPicker, XAddress, XSwitch, XNumber, Radio, PopupRadio, Checklist} from 'vux'

	export default {
		components: {
			PopupPicker,
			XTextarea,
			Datetime,
			XAddress,
			XSwitch,
			XNumber,
			Radio,
			PopupRadio,
			Checklist
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
					/* 因为 upload  有初始值, 所以在提交的时候还需要把初始值给 value */
					if (this.value[key].type == 'upload') {
						form[key] = this.value[key].data.concat(form[key])
					}
				}
				/* 如果通过验证, 就发送表单出去 */
				if (flag) {
					this.$emit('save', form);
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
				this.$emit('sendVCode');
			},
			/* change */
			change () {
				this.$emit('input', this.value);
			},
		}
	}
</script>