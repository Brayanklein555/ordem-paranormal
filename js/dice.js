const diceQty = document.getElementById("diceQty");
for(let i=1;i<=100;i++) diceQty.innerHTML += `<option>${i}</option>`;
diceQty.value = 1;

const history = document.getElementById("history");
const sound = document.getElementById("diceSound");

function rollDice(customFaces=null, customQty=null){
    sound.currentTime=0;
    sound.play();

    const faces = customFaces || Number(diceType.value);
    const qty = customQty || Number(diceQty.value);

    let rolls=[];
    let max=0;

    for(let i=0;i<qty;i++){
        const r=Math.floor(Math.random()*faces)+1;
        rolls.push(r);
        max=Math.max(max,r);
    }

    diceVisual.innerHTML = `<img src="assets/dice/d${faces}.png">`;
    diceText.innerHTML = `Resultados: ${rolls.join(", ")} | ⭐ ${max}`;
    history.innerHTML = `<div>${qty}xD${faces} → ${max}</div>` + history.innerHTML;

    return {rolls,max};
}
