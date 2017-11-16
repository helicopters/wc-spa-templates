let download = require('download-git-repo');
let path = require('path');

download('helicopters/wc-resources' , path.join(process.cwd(), 'src/modules/resources'), function(){
	console.log('复制结束~~~~~~~~~~~~');
});