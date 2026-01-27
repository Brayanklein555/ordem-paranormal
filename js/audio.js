const AudioSystem = {
  ambient: new Audio("assets/sounds/ambient.mp3"),
  click: new Audio("assets/sounds/click.mp3"),
  dice: new Audio("assets/sounds/dice.mp3"),

  init(){
    this.ambient.loop=true;
    this.ambient.volume=0.4;
    this.ambient.play();
  }
};
