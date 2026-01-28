const canvas = document.getElementById("mapCanvas");
const ctx = canvas.getContext("2d");

function resize(){
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
}
window.onresize = resize;
resize();

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    requestAnimationFrame(draw);
}
draw();
