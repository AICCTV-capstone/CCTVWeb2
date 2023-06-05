var port = 9001; // mosquitto의 디폴트 웹 포트
var client = null; //null이면 연결되지 않음

function startConnect() { // 접속을 시도하는 함수
    clientID = "clientID-" + parseInt(Math.random() * 100); // 랜덤한 사용자 ID 생성

    // 사용자가 입력한 브로커의 IP 주소와 포트 번호 알아내기
    broker = document.getElementById("broker").value; // 브로커의 IP 주소

    //id가 message인 DIV 객체에 브로커의 IP와 포트 번호 출력
    //MQTT 메시지 전송 기능을 모두 가진 Paho client 객체 생성
    client = new Paho.MQTT.Client(broker, Number(port), clientID);
// client 객체에 콜백 함수 등록
//    client.onConnectionLost = onConnectionLost; // 접속이 끊어졌을 때 실행되는
 함수 등록
    client.onMessageArrived = onMessageArrived; // 메시지가 도착하였을 때 실행되
는 함수 등록

    // 브로커에 접속. 매개변수는 객체 {onSuccess : onConnect}로서, 객체의 프로퍼
틴느 onSuccess이고 그 값이 onConnect.
    // 접속에 성공하면 onConnect 함수를 실행하라는 지시
    client.connect({
        onSuccess: onConnect,
    });
}

// 브로커의 접속이 성공할 때 호출되는 함수
var isConnected = false;
function onConnect() {
    isConnected = true;
    subscribe("jmlee1")
    subscribe("result")
    subscribe("gmlee1")
    subscribe("cmlee1")
    subscribe("kmlee1")
    subscribe("urgent")
    //document.getElementById("messages").innerHTML += '<span>Connected</span><br/>';
}

var topicSave;
function subscribe(topic) {
    if(client == null) return;
    if(isConnected != true) {
        topicSave = topic;
        window.setTimeout("subscribe(topicSave)", 500);
        return
    }
    // 토픽으로 subscribe 하고 있음을 id가 message인 DIV에 출력
    //document.getElementById("messages").innerHTML += '<span>Subscribing to: ' + topic + '</span><br/>';
    client.subscribe(topic); // 브로커에 subscribe
}

function onMessageArrived(msg) { // 매개변수 msg는 도착한 MQTT 메시지를 담고 있>는 객체
        // 토픽 image가 도착하면 payload에 담긴 파일 이름의 이미지 그리기
        drawImage(msg.destinationName, msg.payloadString);
}

function startDisconnect() {
    client.disconnect();
}
        
