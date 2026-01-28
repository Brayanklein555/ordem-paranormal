const fx = document.getElementById("fx");
const fctx = fx.getContext("2d");

function resizeFX(){
    fx.width = innerWidth;
    fx.height = innerHeight;
}
window.onresize = resizeFX;
resizeFX();

const particles = Array.from({length:220},()=>({
    x:Math.random()*fx.width,
    y:fx.height + Math.random()*300,
    r:Math.random()*2+1,
    vy:Math.random()*1+0.4
}));

function drawFX(){
    fctx.clearRect(0,0,fx.width,fx.height);

    particles.forEach(p=>{
        p.y -= p.vy;
        if(p.y < -50) p.y = fx.height+100;
        fctx.beginPath();
        fctx.fillStyle="rgba(255,0,0,0.6)";
        fctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        fctx.fill();
    });

    const g = fctx.createLinearGradient(0,fx.height,0,fx.height-300);
    g.addColorStop(0,"rgba(255,0,0,0.7)");
    g.addColorStop(1,"rgba(255,0,0,0)");
    fctx.fillStyle=g;
    fctx.fillRect(0,fx.height-300,fx.width,300);

    requestAnimationFrame(drawFX);
}
drawFX();
