const canvas = document.getElementById("mapCanvas");
const ctx = canvas.getContext("2d");

let scale = 1;
let offsetX = 0;
let offsetY = 0;

let dragging=false;
let ruler=false;
let start=null, end=null;

function resize(){
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
}
window.onresize = resize;
resize();

canvas.addEventListener("wheel", e=>{
    e.preventDefault();
    scale += e.deltaY * -0.001;
    scale = Math.min(Math.max(.5, scale), 3);
});

canvas.addEventListener("mousedown", e=>{
    if(e.shiftKey){
        ruler=true;
        start={x:e.offsetX,y:e.offsetY};
        end=start;
    } else {
        dragging=true;
    }
});

canvas.addEventListener("mousemove", e=>{
    if(dragging){
        offsetX += e.movementX;
        offsetY += e.movementY;
    }
    if(ruler){
        end={x:e.offsetX,y:e.offsetY};
    }
});

window.addEventListener("mouseup", ()=>{
    dragging=false;
    ruler=false;
});

function drawGrid(){
    const size = 60 * scale;
    ctx.strokeStyle = "rgba(255,0,0,0.2)";

    for(let x=offsetX%size; x<canvas.width; x+=size){
        ctx.beginPath();
        ctx.moveTo(x,0);
        ctx.lineTo(x,canvas.height);
        ctx.stroke();
    }
    for(let y=offsetY%size; y<canvas.height; y+=size){
        ctx.beginPath();
        ctx.moveTo(0,y);
        ctx.lineTo(canvas.width,y);
        ctx.stroke();
    }
}

function drawRuler(){
    if(!start || !end) return;
    ctx.strokeStyle="yellow";
    ctx.beginPath();
    ctx.moveTo(start.x,start.y);
    ctx.lineTo(end.x,end.y);
    ctx.stroke();

    const dx=end.x-start.x;
    const dy=end.y-start.y;
    const dist=Math.round(Math.sqrt(dx*dx+dy*dy));
    ctx.fillText(`${dist}px`, end.x+10, end.y+10);
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawGrid();
    drawRuler();
    requestAnimationFrame(draw);
}
draw();
