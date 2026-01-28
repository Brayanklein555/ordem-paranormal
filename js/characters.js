const Characters = {
    list: Storage.load("chars", []),
    active: 0,

    create(){
        this.list.push({
            name:"Novo Agente",
            hp:20,
            san:20,
            avatar:"",
            inventario:Array(8).fill(null)
        });
        this.save();
    },

    save(){
        Storage.save("chars", this.list);
        this.render();
    },

    render(){
        const area = document.getElementById("agents");
        if(!area) return;

        const c = this.list[this.active];
        if(!c){
            area.innerHTML = `<button onclick="Characters.create()">Criar Personagem</button>`;
            return;
        }

        area.innerHTML = `
            <h2>${c.name}</h2>
            <p>❤️ Vida: ${c.hp}</p>
            <p>🧠 Sanidade: ${c.san}</p>
            <button onclick="Characters.create()">Novo Personagem</button>
        `;
    }
};
