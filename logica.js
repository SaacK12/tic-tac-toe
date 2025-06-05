const X= "X";
const O= "O";
let turno= "p1";

//La segunda linea espera que el DOM este cargado
document.addEventListener("DOMContentLoaded", () => {
const casillas = document.querySelectorAll(".casilla");


casillas.forEach((casilla,i) => {
    casilla.addEventListener("click", ()=>{
        if(turno=== "FIN") return;
        casilla.innerText= turno === "p1" ? X : O;
        turno= turno === "p1" ? "p2" : "p1";
        verificarGanador()
    })
})

function verificarGanador (){
    const tablero= Array.from(casillas).map(casilla => casilla.innerText)
    console.log(tablero);


    //Verificar horizontales
    for (let i = 0; i <= 9; i+=3) {
        if (tablero[i] &&
            tablero[i]=== tablero [i+1] 
         && tablero[i]=== tablero [i+2])
            {
           return ganador([i,i+1,i+2])
             }}

    //Verificar verticales
    for (let i = 0; i <= 3; i++) {
        if (tablero[i] &&
            tablero[i]=== tablero [i+3] 
         && tablero[i]=== tablero [i+6])
            {
           return ganador([i,i+3,i+6])
             }}
    //Verificar cruzados
    if(tablero[0] &&
            tablero[0]=== tablero [4] 
         && tablero[0]=== tablero [8]){
           return ganador([0,4,8])
         }
    if(tablero[2] &&
            tablero[2]=== tablero [4] 
         && tablero[2]=== tablero [6]){
            return ganador([2,4,6])
         }
}
function ganador(simboloGanador){
    console.log("ganaste wow", simboloGanador);
    turno= "FIN";
    simboloGanador.forEach(posicion => {
        casillas[posicion].classList.toggle("ganador", true)
    })
}

//
});