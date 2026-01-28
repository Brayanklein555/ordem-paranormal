const AudioSystem = {
    ambient: new Audio("assets/sounds/ambient.mp3"),
    click: new Audio("assets/sounds/click.mp3"),
    dice: new Audio("assets/sounds/dice.mp3"),

    init(){
        this.ambient.loop = true;
        this.ambient.volume = 0.4;
        this.click.volume = 0.6;
        this.dice.volume = 0.7;

        // desbloqueia áudio após primeira interação
        document.body.addEventListener("click", ()=>{
            this.ambient.play().catch(()=>{});
        }, { once:true });
    },

    playClick(){
        this.click.currentTime = 0;
        this.click.play();
    },

    playDice(){
        this.dice.currentTime = 0;
        this.dice.play();
    }
};

AudioSystem.init();
