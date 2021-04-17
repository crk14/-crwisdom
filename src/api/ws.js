	import pako from 'pako'
	export function wss(arr,url,call){
			
			// let hburl = 'wss://api.huobipro.com/ws';  // 实时币种价格
			let haurl = url;
			
			// console.log(arr,url)
			// return
			
			
			
			
			let socketK = new WebSocket(haurl);
			// this.socket =socketK
			socketK.onopen = function () {
				if(arr.constructor === Array){
					arr.forEach(item=>{
						let subK = { // 订阅数据
						    sub: `market.${item}usdt.kline.1day`,
						    id: `${item}usdt`
						};
						socketK.send(JSON.stringify(subK))
					})
				}else{
					let subK = { // 订阅数据
					    sub: `market.${arr}usdt.kline.1day`,
					    id: `${arr}usdt`
					};
					socketK.send(JSON.stringify(subK))
				}
				
			};
			
			socketK.onmessage = function (event) {
			    let blob = event.data;
			    let reader = new FileReader();
			    reader.onload = function (e) {
			        let ploydata = new Uint8Array(e.target.result);
			        let msg = pako.inflate(ploydata, {to: 'string'});
			        handleData(msg);
			    };
			    reader.readAsArrayBuffer(blob, "utf-8");
			};
			socketK.onclose = function () {
				socketK.close()
				
			    console.log('connection closed');
			};
		
			// 处理接收到的信息
			function handleData(msg) {
			    let data = JSON.parse(msg);
				// console.log(data)
			    if (data.ping) {
			        // 如果是 ping 消息
			        sendHeartMessage(data.ping);
			    } else if (data.status === 'ok') {
			        // 响应数据
			        handleReponseData(data);
			    } else {
			        // 数据体
			        call(data,socketK)
			    }
			}
			// 发送响应信息
			function sendHeartMessage(ping) {
			    socketK.send(JSON.stringify({"pong": ping}));
			}
			
			function handleReponseData(data) {
			}
			
			
	}