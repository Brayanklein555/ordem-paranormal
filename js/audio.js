const AudioSystem = {
    ambient: new Audio("assets/sounds/ambient.mp3"),
    click: new Audio("assets/sounds/click.mp3"),
    dice: new Audio("assets/sounds/dice.mp3"),

    init(){
        this.ambient.loop = true;
        this.ambient.volume = 0.4;
        this.click.volume = 0.6;
        this.dice.volume = 0.6;

        document.body.addEventListener("click", ()=>{
            this.ambient.play().catch(()=>{});
        }, { once:true });
    },

    setAmbient(v){ this.ambient.volume = v; },
    setFX(v){ this.click.volume = v; this.dice.volume = v; },

    playClick(){
        this.click.currentTime = 0;
        this.click.play();
    }
};

AudioSystem.init();
