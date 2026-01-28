const Map = {
    canvas: document.getElementById("mapCanvas"),
    ctx:null,
    bgImage:null,
    tokens:[],
    ruler:false,
    area:false,
    start:null,
    savedMaps: JSON.parse(localStorage.getItem("maps")) || [],

    init(){
        this.ctx = this.canvas.getContext("2d");
        this.resize();
        window.onresize = ()=>this.resize();

        this.canvas.onmousedown = e=>{
            this.start = this.getMouse(e);
        };

        this.canvas.onmouseup = e=>{
            if(this.ruler || this.area){
                const end = this.getMouse(e);
                const dist = Math.hypot(end.x-this.start.x, end.y-this.start.y);
                const squares = Math.round(dist/60);
                const meters = Math.round(squares*1.5);
                alert(this.area 
                    ? `Área: ${squares*squares} quadrados`
                    : `Distância: ${squares}q = ${meters}m`);
            }
            this.start=null;
        };

        this.loop();
    },

    getMouse(e){
        const r = this.canvas.getBoundingClientRect();
        return { x:e.clientX-r.left, y:e.clientY-r.top };
    },

    toggleRuler(){ this.ruler=!this.ruler; this.area=false; },
    toggleArea(){ this.area=!this.area; this.ruler=false; },

    addToken(){
        this.tokens.push({
            x:200, y:200,
            img: Characters.data.avatar
        });
    },

    loadImage(e){
        const img = new Image();
        img.onload = ()=> this.bgImage = img;
        img.src = URL.createObjectURL(e.target.files[0]);
    },

    saveMap(){
        this.savedMaps.push({
            bg:this.bgImage?.src || null,
            tokens:this.tokens
        });
        localStorage.setItem("maps", JSON.stringify(this.savedMaps));
        alert("Mapa salvo!");
    },

    loadMap(){
        if(!this.savedMaps.length) return alert("Nenhum mapa salvo.");
        const m = this.savedMaps.at(-1);
        if(m.bg){
            const img = new Image();
            img.onload = ()=>this.bgImage=img;
            img.src = m.bg;
        }
        this.tokens = m.tokens;
    },

    download(){
        const link = document.createElement("a");
        link.download="mapa.png";
        link.href=this.canvas.toDataURL();
        link.click();
    },

    draw(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

        if(this.bgImage){
            this.ctx.drawImage(this.bgImage,0,0,this.canvas.width,this.canvas.height);
        }

        // grid
        for(let x=0;x<this.canvas.width;x+=60){
            this.ctx.strokeStyle="rgba(255,0,0,0.2)";
            this.ctx.beginPath();
            this.ctx.moveTo(x,0);
            this.ctx.lineTo(x,this.canvas.height);
            this.ctx.stroke();
        }

        for(let y=0;y<this.canvas.height;y+=60){
            this.ctx.beginPath();
            this.ctx.moveTo(0,y);
            this.ctx.lineTo(this.canvas.width,y);
            this.ctx.stroke();
        }

        // tokens
        this.tokens.forEach(t=>{
            if(!t.img) return;
            const img = new Image();
            img.src = t.img;
            this.ctx.drawImage(img,t.x-20,t.y-20,40,40);
        });
    },

    loop(){
        this.draw();
        requestAnimationFrame(()=>this.loop());
    },

    resize(){
        this.canvas.width=this.canvas.clientWidth;
        this.canvas.height=this.canvas.clientHeight;
    }
};
Map.init();
