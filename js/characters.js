const Characters = {
    list: Storage.load("chars", []),
    active: null,
    step:0,
    temp:{},

    openCreator(){
        this.step = 0;
        this.temp = {
            nome:"",
            classe:"",
            origem:"",
            trilha:"",
            patente:"",
            nex:5,
            atributos:{for:1,agi:1,int:1,pre:1,vig:1},
            pv:20, san:20, pe:10,
            pericias:"",
            inventario:"",
            rituais:""
        };
        this.renderCreator();
    },

    next(){
        this.step++;
        this.renderCreator();
    },

    back(){
        this.step--;
        this.renderCreator();
    },

    finish(){
        this.list.push(this.temp);
        this.active = this.list.length-1;
        Storage.save("chars",this.list);
        this.render();
    },

    renderCreator(){
        const area = document.getElementById("agents");

        const steps = [
            this.stepIdentidade(),
            this.stepAtributos(),
            this.stepStatus(),
            this.stepPericias(),
            this.stepInventario(),
            this.stepRituais()
        ];

        area.innerHTML = `
            <h2>Criação de Personagem</h2>
            ${steps[this.step]}
            <div style="margin-top:15px">
                ${this.step>0 ? `<button onclick="Characters.back()">⬅ Voltar</button>` : ""}
                ${this.step<steps.length-1 
                    ? `<button onclick="Characters.next()">➡ Próximo</button>`
                    : `<button onclick="Characters.finish()">✅ Finalizar</button>`
                }
            </div>
        `;
    },

    stepIdentidade(){
        return `
            <h3>🪪 Identidade</h3>
            Nome <input value="${this.temp.nome}" onchange="Characters.temp.nome=this.value"><br>
            Classe <input value="${this.temp.classe}" onchange="Characters.temp.classe=this.value"><br>
            Origem <input value="${this.temp.origem}" onchange="Characters.temp.origem=this.value"><br>
            Trilha <input value="${this.temp.trilha}" onchange="Characters.temp.trilha=this.value"><br>
            Patente <input value="${this.temp.patente}" onchange="Characters.temp.patente=this.value"><br>
            NEX <input type="number" value="${this.temp.nex}" onchange="Characters.temp.nex=this.value"><br>
        `;
    },

    stepAtributos(){
        const a = this.temp.atributos;
        const total = a.for+a.agi+a.int+a.pre+a.vig;
        return `
            <h3>💪 Atributos (Total ${total}/10)</h3>
            Força <input type="number" value="${a.for}" onchange="a.for=this.value"><br>
            Agilidade <input type="number" value="${a.agi}" onchange="a.agi=this.value"><br>
            Intelecto <input type="number" value="${a.int}" onchange="a.int=this.value"><br>
            Presença <input type="number" value="${a.pre}" onchange="a.pre=this.value"><br>
            Vigor <input type="number" value="${a.vig}" onchange="a.vig=this.value"><br>
        `;
    },

    stepStatus(){
        return `
            <h3>❤️ Status</h3>
            PV <input type="number" value="${this.temp.pv}" onchange="Characters.temp.pv=this.value"><br>
            SAN <input type="number" value="${this.temp.san}" onchange="Characters.temp.san=this.value"><br>
            PE <input type="number" value="${this.temp.pe}" onchange="Characters.temp.pe=this.value"><br>
        `;
    },

    stepPericias(){
        return `
            <h3>🎯 Perícias</h3>
            <textarea onchange="Characters.temp.pericias=this.value">${this.temp.pericias}</textarea>
        `;
    },

    stepInventario(){
        return `
            <h3>🎒 Inventário</h3>
            <textarea onchange="Characters.temp.inventario=this.value">${this.temp.inventario}</textarea>
        `;
    },

    stepRituais(){
        return `
            <h3>🔮 Rituais / Poderes</h3>
            <textarea onchange="Characters.temp.rituais=this.value">${this.temp.rituais}</textarea>
        `;
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
            <p>Classe: ${c.classe}</p>
            <p>Origem: ${c.origem}</p>
            <p>NEX: ${c.nex}</p>

            <h3>Atributos</h3>
            <pre>${JSON.stringify(c.atributos,null,2)}</pre>

            <h3>Status</h3>
            PV ${c.pv} | SAN ${c.san} | PE ${c.pe}

            <h3>Perícias</h3>
            <pre>${c.pericias}</pre>

            <h3>Inventário</h3>
            <pre>${c.inventario}</pre>

            <h3>Rituais</h3>
            <pre>${c.rituais}</pre>

            <button onclick="Characters.openCreator()">➕ Novo Personagem</button>
        `;
    }
};
