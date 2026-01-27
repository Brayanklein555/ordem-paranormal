const Characters = {
  list: Storage.load("chars",[]),
  current:0,

  init(){
    const el=document.getElementById("agents");
    el.innerHTML=`
      <h2>Agentes</h2>
      <button id="newChar">Novo</button>
      <select id="charList"></select>
      <input id="name" placeholder="Nome">
      <input id="class" placeholder="Classe">
      <input id="hp" type="number">
      <input id="sanity" type="number">
      <input id="color" type="color">
      <div id="avatar"></div>
    `;
    this.bind();
    this.refresh();
  },

  bind(){
    newChar.onclick=()=>this.create();
    charList.onchange=()=>this.load(charList.value);

    ["name","class","hp","sanity","color"].forEach(id=>{
      document.getElementById(id).oninput=()=>this.update();
    });
  },

  create(){
    this.list.push({name:"Novo",class:"",hp:10,sanity:10,color:"#ff0033"});
    this.current=this.list.length-1;
    this.save();
    this.refresh();
  },

  refresh(){
    charList.innerHTML="";
    this.list.forEach((c,i)=>{
      let o=document.createElement("option");
      o.value=i; o.text=c.name;
      charList.appendChild(o);
    });
    this.load(this.current);
  },

  load(i){
    const c=this.list[i];
    if(!c) return;
    this.current=i;
    name.value=c.name;
    class.value=c.class;
    hp.value=c.hp;
    sanity.value=c.sanity;
    color.value=c.color;
    avatar.style.background=c.color;
  },

  update(){
    const c=this.list[this.current];
    if(!c) return;
    c.name=name.value;
    c.class=class.value;
    c.hp=hp.value;
    c.sanity=sanity.value;
    c.color=color.value;
    avatar.style.background=color.value;
    this.save();
    this.refresh();
  },

  save(){
    Storage.save("chars",this.list);
  }
};
