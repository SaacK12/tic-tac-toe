const X= "X";
const O= "O";
let turno= "P1"; 
let puntuacionP1= 0;
let puntuacionP2= 0;

//La linea 6 espera que el DOM este cargado
document.addEventListener("DOMContentLoaded", () => {
const casillas = Array.from(document.querySelectorAll(".casilla"));
const modal= document.querySelector("dialog");
const textoModal= modal.querySelector("h2");

casillas.forEach((casilla,i) => {
    casilla.addEventListener("click", ()=>{
        if(turno=== "FIN") return;
        if(casilla.textContent !== "") return;
        casilla.innerText= turno === "P1" ? X : O;
        //Posicion ganadora
        const posicionGanador= verificarGanador()
        if(typeof posicionGanador=== "objet"){
            ganador(posicionGanador);
            return
        } 
        if(posicionGanador=== "empate"){
            mostrarModal("Empate!")
        }
        turno= turno === "P1" ? "P2" : "P1";
        //Mostrar turno acutal
        document.getElementById("turnoJugador").innerText= `El turno es de: ${turno}`;

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
//Mensaje ganador
function ganador(simboloGanador){
    //Contador de la puntuacion
    if(turno=== "P1"){
        puntuacionP1++
        console.log(puntuacionP1)
        document.getElementById("puntuacionX").innerText= `Puntuacion de X: ${puntuacionP1}`;
     }
     if(turno=== "P2"){
        puntuacionP2++
        console.log(puntuacionP2)
        document.getElementById("puntuacionO").innerText= `Puntuacion de O: ${puntuacionP2}`;
     }
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