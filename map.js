const MapSystem = {
  init(){
    const el=document.getElementById("scenarios");
    el.innerHTML=`
      <h2>Cenários</h2>
      <button id="addToken">Token</button>
      <canvas id="map" width="900" height="500"></canvas>
    `;
    this.canvas=document.getElementById("map");
    this.ctx=this.canvas.getContext("2d");
    this.tokens=[];
    addToken.onclick=()=>this.addToken();
    this.canvas.onmousedown=e=>this.moveToken(e);
    this.draw();
  },

  addToken(){
    this.tokens.push({x:100,y:100});
    this.draw();
  },

  moveToken(e){
    this.tokens.forEach(t=>{
      t.x=e.offsetX;
      t.y=e.offsetY;
    });
    this.draw();
  },

  draw(){
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    this.tokens.forEach(t=>{
      this.ctx.fillStyle="red";
      this.ctx.beginPath();
      this.ctx.arc(t.x,t.y,10,0,Math.PI*2);
      this.ctx.fill();
    });
  }
};
