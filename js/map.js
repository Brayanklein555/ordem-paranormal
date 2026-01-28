const canvas = document.getElementById("mapCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 2000;
canvas.height = 2000;

let bg = null;
let objects = [];
let tokens = [];
let selectedAsset = null;
let measuring = false;
let start = null;

const GRID = 50;
const METERS_PER_GRID = 1.5;

const assets = {
    tree: "assets/map/tree.png",
    rock: "assets/map/rock.png",
    house: "assets/map/house.png",
    monster: "assets/map/monster.png",
    animal: "assets/map/animal.png",
    chest: "assets/map/chest.png"
};

// UI palette
const palette = document.createElement("div");
palette.className = "palette";
palette.innerHTML = Object.keys(assets).map(a =>
    `<button onclick="selectAsset('${a}')">${a}</button>`
).join("");
document.body.appendChild(palette);

function selectAsset(name){
    selectedAsset = assets[name];
}

function drawGrid(){
    ctx.strokeStyle="#222";
    for(let x=0;x<canvas.width;x+=GRID){
        ctx.beginPath();
        ctx.moveTo(x,0);
        ctx.lineTo(x,canvas.height);
        ctx.stroke();
    }
    for(let y=0;y<canvas.height;y+=GRID){
        ctx.beginPath();
        ctx.moveTo(0,y);
        ctx.lineTo(canvas.width,y);
        ctx.stroke();
    }
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if(bg) ctx.drawImage(bg,0,0,canvas.width,canvas.height);
    drawGrid();

    objects.forEach(o=>{
        const img=new Image();
        img.src=o.src;
        ctx.drawImage(img,o.x,o.y,50,50);
    });

    tokens.forEach(t=>{
        const img=new Image();
        img.src=t.img;
        ctx.drawImage(img,t.x,t.y,50,50);
    });
}

canvas.onclick = e => {
    const r = canvas.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    if(selectedAsset){
        objects.push({src:selectedAsset,x,y});
        saveMap();
        draw();
    } else {
        tokens.push({x,y,img:avatarPreview.src});
        saveMap();
        draw();
    }
};

canvas.onmousedown = e => {
    measuring = true;
    start = {x:e.offsetX,y:e.offsetY};
};

canvas.onmouseup = e => {
    if(!measuring) return;
    measuring=false;

    const dx = e.offsetX - start.x;
    const dy = e.offsetY - start.y;
    const dist = Math.sqrt(dx*dx + dy*dy);
    const squares = Math.round(dist / GRID);
    const meters = (squares * METERS_PER_GRID).toFixed(1);

    alert(`📏 ${squares} quadrados ≈ ${meters} metros`);
};

function saveMap(){
    localStorage.setItem("mapData",JSON.stringify({objects,tokens}));
}

function loadMap(){
    const d = JSON.parse(localStorage.getItem("mapData")||"{}");
    objects = d.objects || [];
    tokens = d.tokens || [];
}

const Map = {
    upload(e){
        const img=new Image();
        img.onload=()=>{ bg=img; draw(); };
        img.src = URL.createObjectURL(e.target.files[0]);
    }
};

loadMap();
draw();
