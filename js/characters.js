const Characters = {
    data: JSON.parse(localStorage.getItem("char")) || { name:"Agente", avatar:null },

    save(){
        localStorage.setItem("char", JSON.stringify(this.data));
        this.render();
    },

    uploadAvatar(e){
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = ev=>{
            this.data.avatar = ev.target.result;
            this.save();
        };
        reader.readAsDataURL(file);
    },

    render(){
        document.getElementById("character").innerHTML = `
            <img src="${this.data.avatar || 'assets/logo.png'}" class="avatar">
            <input type="file" onchange="Characters.uploadAvatar(event)">
            <h3>${this.data.name}</h3>
        `;
    }
};
Characters.render();
