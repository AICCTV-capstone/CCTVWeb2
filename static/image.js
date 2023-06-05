var canvas;
var context;
var images=[];

// load 이벤트 리스너 등록. 웹페이지가 로딩된 후 실행
window.addEventListener("load", function () {
    canvas = document.getElementById("myCanvas1");
    context = canvas.getContext("2d");
    image = new Image();
    image.image = image
    image.context = context
    image.canvas = canvas
    image.onload = function () {
        // canvas 전체 영역에 image 그리기
        this.context.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
    }
    images.push(image)


    canvas = document.getElementById("myCanvas2");
    context = canvas.getContext("2d");
    image = new Image();
    image.image = image
    image.context = context
    image.canvas = canvas
    image.onload = function () {
        // canvas 전체 영역에 image 그리기
        this.context.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
    }
    images.push(image)


    canvas = document.getElementById("myCanvas3");
    context = canvas.getContext("2d");
    image = new Image();
    image.image = image
    image.context = context
    image.canvas = canvas
    image.onload = function(){
            //canvas 전체 영억에 image 그리기
        this.context.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
    }
    images.push(image)

    canvas = document.getElementById("myCanvas4");
    context = canvas.getContext("2d");
    image = new Image();
    image.image = image
    image.context = context
    image.canvas = canvas
    image.onload = function(){
            //canvas 전체 영억에 image 그리기
        this.context.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
    }
    images.push(image)
})


function playSound() {
  var audio = document.getElementById("myAudio");
  audio.play();
}

// drawImage()는 "Image" 토픽이 도착하였을 때 onMesssageArrived()에 의해 호출된>다.
function drawImage(topic, base64Image) {
    //64진수로 엔코딩된 데이터를 이미지로 저장
    flag = -1;
    if(topic == "jmlee"){
            flag = 0
    }
    if(topic == "cmlee"){
        flag = 1
    }
    if(topic == "gmlee"){
           flag=2
    }
    if(topic == "kmlee"){
           flag=3
    }

    if(flag != -1){
        images[flag].src = "data:image/jpg;base64," + base64Image;
    //  images[0].src = "data:image/jpg;base64," + base64Image;
    //  images[1].src = "data:image/jpg;base64," + base64Image;
    //  images[2].src = "data:image/jpg;base64," + base64Image;
    //  images[3].src = "data:image/jpg;base64," + base64Image;
    }

   if(topic == "jmlee1"){
        console.log("_______1="+base64Image);
        div = document.getElementById("person1");
        if (base64Image >= 5){
                div.innerHTML = "5+";
        }
        else{
                div.innerHTML = base64Image;
        }

   }
   if(topic == "cmlee1"){
        console.log("_______2="+base64Image);
        div = document.getElementById("person2");
        if (base64Image >= 5){
                div.innerHTML = "5+";
        }
        else{
                div.innerHTML = base64Image;
        }
   }
   if(topic == "gmlee1"){
        console.log("_______3="+base64Image);
        div = document.getElementById("person3");
        if (base64Image >= 5){
                div.innerHTML = "5+";
        }
        else{
                div.innerHTML = base64Image;
        }
   }
   if(topic == "kmlee1"){
        console.log("_______4="+base64Image);
        div = document.getElementById("person4");
        if (base64Image >= 5){
                div.innerHTML = "5+";
        }
        else{
                div.innerHTML = base64Image;
        }
   }
   if(topic == "urgent"){
        div = document.getElementById("alarm");
        if(base64Image=="on"){
                var modal = document.getElementById('myModal');
                modal.style.display = 'block';
                playSound();
                var modalCloseBtn = document.getElementById('modalCloseBtn');
                modalCloseBtn.addEventListener('click', function() {
                modal.style.display = 'none';
           });
        }
           else{
                   div.innerHTML =" ";
           }
}
}

var isImageSubscribed = false;
function recognize() {
    if(!isImageSubscribed) {
        subscribe('jmlee'); // 토픽 image 등록
        subscribe('cmlee'); // 토픽 image 등록
        subscribe('gmlee');
        subscribe('kmlee');
        isImageSubscribed = true;
    }
    publish('action', 'goStop');
}

function toggleZoom(canvasId) {
    var canvas = document.getElementById(canvasId);
    canvas.classList.toggle("zoomed");

    var otherCanvases = document.querySelectorAll("canvas:not(#" + canvasId + ")");
    for (var i = 0; i < otherCanvases.length; i++) {
      otherCanvases[i].classList.toggle("hidden");
    }

    var personDivs = document.querySelectorAll("#person1, #person2, #person3, #person4");
    for (var j = 0; j < personDivs.length; j++) {
      personDivs[j].classList.toggle("hidden");
    }
  }
