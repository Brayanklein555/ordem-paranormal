const Inventory = {
    list: JSON.parse(localStorage.getItem("inv")||"[]"),

    render(){
        inventoryList.innerHTML="";
        this.list.forEach((i,idx)=>{
            const li=document.createElement("li");
            li.textContent=i;
            li.onclick=()=>{ this.list.splice(idx,1); this.save(); };
            inventoryList.appendChild(li);
        });
    },

    add(){
        if(itemInput.value){
            this.list.push(itemInput.value);
            itemInput.value="";
            this.save();
        }
    },

    save(){
        localStorage.setItem("inv",JSON.stringify(this.list));
        this.render();
    }
};

const Avatar = {
    upload(e){
        const r=new FileReader();
        r.onload=()=>{ avatarPreview.src=r.result; Character.save(); };
        r.readAsDataURL(e.target.files[0]);
    }
};

const Character = {
    load(){
        const d=JSON.parse(localStorage.getItem("char")||"{}");
        charName.value=d.name||"";
        forca.value=d.forca||3;
        agi.value=d.agi||3;
        avatarPreview.src=d.avatar||"";
        Inventory.render();
    },
    save(){
        localStorage.setItem("char",JSON.stringify({
            name:charName.value,
            forca:forca.value,
            agi:agi.value,
            avatar:avatarPreview.src
        }));
    }
};

setInterval(()=>Character.save(),2000);
window.onload=()=>Character.load();

function rollAttribute(attr){
    const val=Number(document.getElementById(attr).value);
    const r=rollDice(20,val);
    alert(`Maior resultado: ${r.max}`);
}
