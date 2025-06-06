const X= "X";
const O= "O";
let turno= "P1";

//La segunda linea espera que el DOM este cargado
document.addEventListener("DOMContentLoaded", () => {
const casillas = Array.from(document.querySelectorAll(".casilla"));
const modal= document.querySelector("dialog");
const textoModal= modal.querySelector("h2");

casillas.forEach((casilla,i) => {
    casilla.addEventListener("click", ()=>{
        if(turno=== "FIN") return;
        if(casilla.textContent !== "") return;
        casilla.innerText= turno === "P1" ? X : O;
        const posicionGanador= verificarGanador()
        if(typeof posicionGanador=== "objet"){
            ganador(posicionGanador);
            return
        } 
        if(posicionGanador=== "empate"){
            mostrarModal("Empate!")
        }
        turno= turno === "P1" ? "P2" : "P1";

    })
})

function verificarGanador (){
    const tablero=  casillas.map(casilla => casilla.innerText)
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
         //Empate
         if(tablero.includes("")) return false;
         return "empate";
}
function ganador(simboloGanador){
    console.log("ganaste wow", simboloGanador);
    simboloGanador.forEach(posicion => {
        casillas[posicion].classList.toggle("ganador", true)
    })
    mostrarModal("¡"+ turno +" ha ganado esta ronda!")
     turno= "FIN";
}

function mostrarModal(texto){
    textoModal.innerText= texto;
    modal.showModal();

}

modal.querySelector("button").addEventListener("click",() =>{
casillas.forEach(casillas => {
    casillas.textContent = ""   
    casillas.classList.toggle("ganador",false);
    modal.close();
    });
});
//
});