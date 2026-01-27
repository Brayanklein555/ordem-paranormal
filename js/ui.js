const UI = {
  init(){
    document.querySelectorAll("nav button").forEach(btn=>{
      btn.onclick=()=>{
        AudioSystem.click.play();
        this.openTab(btn.dataset.tab);
      };
    });
  },

  openTab(id){
    document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
    document.getElementById(id).classList.add("active");
  }
};
