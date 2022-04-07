
function perguntaQuantasCartas() {
    let numeroDeCartas = prompt("Com quantas Cartas você deseja jogar?");
    if(numeroDeCartas % 2 === 0 && numeroDeCartas >= 4 && numeroDeCartas <= 14) {
        return numeroDeCartas;
    }
    else {
        alert("Esse é um jogo da memória, o número de cartas precisa ser par!\n\nAlém disso, o número mínimo são 4 cartas, e o máximo 14!");
        perguntaQuantasCartas();
    }
}

function insereCartasNaTela() {
    let numeroDeCartas = perguntaQuantasCartas();
    for(let i=0;i<numeroDeCartas;i++) {
        let containerCartas = document.querySelector(".containerCartas");
        let umaCarta = "<div class='Carta'><img src='Pngs/front.png'></div>";
        containerCartas.innerHTML = containerCartas.innerHTML + umaCarta;
    }
}

insereCartasNaTela();