const Dice = {
    sound: new Audio("assets/sounds/dice.mp3"),

    roll(){
        const v = Math.floor(Math.random()*20)+1;
        this.sound.play();
        alert("🎲 Resultado: "+v);
    }
};
