<style lang="less" scoped>
.bind-container {


	user-select: none;
	.header {
		height: 2rem;
		width: 100%;
		background: red;

      background: linear-gradient(top left, #01b5ce, #0183bd);
        background: -ms-linear-gradient(top left, #01b5ce, #0183bd);
        background: -webkit-linear-gradient(top left, #01b5ce, #0183bd);
        background: -moz-linear-gradient(top left, #01b5ce, #0183bd);

        display: flex;
        align-items: center;
        justify-content: center;

        position: relative;
	
		.text {
			text-align: center;
			font-weight: bold;
			font-size: 25px;
			// position: relative;
			// transition: 
			// top: 50px;
			color: white;
		}

		.icon-wrapper {
			position: absolute;
			bottom: 0;
			left: 50%;
			transform: translate(-50%, 50%) rotate(30deg);

			height: 70px;
			width: 70px;
			background: white;
			border-radius: 50%;

			display: flex;
			align-items: center;
			justify-content: center;

			box-shadow: 0 0 10px rgba(0,0,0,0.2);

		}


	}



	.content {
		

		width: 80%;
		margin: 0 auto;

		margin-top: 70px;

		font-size: 15px;
		

		.field {
			border-bottom: 1px solid #eee;
			padding: 10px 0;

			display: flex;

			align-items: center;

			.label {
				color: #585858;
				min-width: 20%;
			}

			input {
				

				border:none;
				outline: none;

				flex:1;
				width: 50%;

				font-size: 15px;

				color: #018ccf;

				margin: 0 10px;
				
				&:focus{
					// background:red;
				}


				&:first-child {
					letter-spacing: 1px;
				}

				&:last-child {
					letter-spacing: 2px;
				}

			}


			.send-code {
				// float: right;
				width: 30%;
				border-radius: 4px;
				// padding: 4px 8px;
				border: .5px solid #018ccf;
				color: #018ccf;
				padding: 4px 0;

				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 13px;
			}




		}
	}


	.btn {


      background: linear-gradient(top left, #01b5ce, #0183bd);
        background: -ms-linear-gradient(top left, #01b5ce, #0183bd);
        background: -webkit-linear-gradient(top left, #01b5ce, #0183bd);
        background: -moz-linear-gradient(top left, #01b5ce, #0183bd);

        display: flex;
        align-items: center;
        justify-content: center;
		
		font-size: 16px;
		
		color: white;


		width: 80%;
		margin: 0 auto;

		padding: 10px;

		margin-top: 40px;




	}


}

</style>
<template>
	<div class="bind-container">
		<div class="header">
			<p class="text">绑定手机号码</p>




<div class="icon-wrapper">
	
	<svg t="1521459335538" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2704" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><defs></defs><path d="M512 917.333333c12.8 0 21.333333-8.533333 21.333333-21.333333 0-12.8-8.533333-21.333333-21.333333-21.333333-12.8 0-21.333333 8.533333-21.333333 21.333333C490.666667 908.8 499.2 917.333333 512 917.333333zM682.666667 42.666667 341.333333 42.666667c-46.933333 0-85.333333 38.4-85.333333 85.333333l0 768c0 46.933333 38.4 85.333333 85.333333 85.333333l341.333333 0c46.933333 0 85.333333-38.4 85.333333-85.333333L768 128C768 81.066667 729.6 42.666667 682.666667 42.666667zM725.333333 896c0 23.466667-19.2 42.666667-42.666667 42.666667L341.333333 938.666667c-23.466667 0-42.666667-19.2-42.666667-42.666667l0-42.666667 426.666667 0L725.333333 896zM725.333333 810.666667 298.666667 810.666667 298.666667 213.333333l426.666667 0L725.333333 810.666667zM725.333333 170.666667 298.666667 170.666667 298.666667 128c0-23.466667 19.2-42.666667 42.666667-42.666667l341.333333 0c23.466667 0 42.666667 19.2 42.666667 42.666667L725.333333 170.666667zM533.333333 106.666667l-42.666667 0c-12.8 0-21.333333 8.533333-21.333333 21.333333s8.533333 21.333333 21.333333 21.333333l42.666667 0c12.8 0 21.333333-8.533333 21.333333-21.333333S546.133333 106.666667 533.333333 106.666667z" p-id="2705"></path></svg>

</div>



		</div>



		
		<div class="content">


			<div class="field">
				<div class="label">手机号码</div>

				<input type="tel" maxlength="11"> 

				<div class="send-code disabled"> 发送验证码</div>
			</div>

			<div class="field">
				<div class="label">验证码</div>

				<input type="tel" maxlength="6">
			</div>


		</div>


		<div class="btn">
			立即绑定
		</div>


	</div>
</template>
<script>
export default {
	  components: {

	  },
	  data () {
	    return {

	    }
	  },
	  mounted () {

	  }, /* end mounted */
	  methods: {

	  } /* end methods */
} /* end export */
</script>