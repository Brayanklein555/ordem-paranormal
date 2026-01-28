const canvas=document.getElementById("mapCanvas");
const ctx=canvas.getContext("2d");
canvas.width=2000;
canvas.height=2000;

let bg=null;
let tokens=[];
let start=null;

const metersPerGrid = 1.5;

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if(bg) ctx.drawImage(bg,0,0,canvas.width,canvas.height);

    tokens.forEach(t=>{
        const img=new Image();
        img.src=t.img;
        ctx.drawImage(img,t.x,t.y,50,50);
    });
}

canvas.onclick=e=>{
    const r=canvas.getBoundingClientRect();
    tokens.push({
        x:e.clientX-r.left,
        y:e.clientY-r.top,
        img: avatarPreview.src
    });
    draw();
};

canvas.onmousedown=e=>{
    start={x:e.offsetX,y:e.offsetY};
};

canvas.onmouseup=e=>{
    const dx=e.offsetX-start.x;
    const dy=e.offsetY-start.y;
    const dist=Math.sqrt(dx*dx+dy*dy);
    const squares=Math.round(dist/50);
    const meters=(squares*metersPerGrid).toFixed(1);
    alert(`📏 ${squares} quadrados ≈ ${meters} metros`);
};

const Map = {
    upload(e){
        const img=new Image();
        img.onload=()=>{ bg=img; draw(); };
        img.src=URL.createObjectURL(e.target.files[0]);
    }
};
