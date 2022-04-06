
function PerguntaQuantasCartas() {
    let NumeroDeCartas = prompt("Com quantas Cartas você deseja jogar?");
    if(NumeroDeCartas % 2 === 0 && NumeroDeCartas >= 4 && NumeroDeCartas <= 14) {
        return NumeroDeCartas;
    }
    else {
        alert("Esse é um jogo da memória, o número de cartas precisa ser par!\n\nAlém disso, o número mínimo são 4 cartas, e o máximo 14!");
        PerguntaQuantasCartas();
    }
}

PerguntaQuantasCartas();