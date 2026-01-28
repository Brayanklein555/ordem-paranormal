const Characters = {
    list: Storage.load("chars", []),
    active: 0,

    openCreator(){
        this.list.push({
            nome:"Novo Agente",
            classe:"",
            origem:"",
            nex:5,
            avatar:""
        });
        this.active = this.list.length-1;
        this.save();
    },

    uploadAvatar(e){
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = ev=>{
            this.list[this.active].avatar = ev.target.result;
            this.save();
        };
        reader.readAsDataURL(file);
    },

    save(){
        Storage.save("chars", this.list);
        this.render();
    },

    render(){
        const area = document.getElementById("agents");
        const c = this.list[this.active];

        if(!c){
            area.innerHTML = `<button onclick="Characters.openCreator()">➕ Criar Personagem</button>`;
            return;
        }

        area.innerHTML = `
            <h2>${c.nome}</h2>
            <img src="${c.avatar || 'assets/logo.png'}" class="avatar">
            <input type="file" accept="image/*" onchange="Characters.uploadAvatar(event)">
            <p>Classe: <input value="${c.classe}" onchange="c.classe=this.value;Characters.save()"></p>
            <p>Origem: <input value="${c.origem}" onchange="c.origem=this.value;Characters.save()"></p>
            <p>NEX: <input type="number" value="${c.nex}" onchange="c.nex=this.value;Characters.save()"></p>
            <button onclick="Characters.openCreator()">➕ Novo</button>
        `;
    }
};
