const Dice = {
  roll(sides){
    AudioSystem.dice.play();
    return Math.floor(Math.random()*sides)+1;
  }
};
