
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
        let umaCarta = "<div class='Carta' onclick='revelaCartaClicada(this)'><img class='fundoCarta' src='Pngs/front.png'><img class='frenteCarta Escondido' src='Gifs/bobrossparrot.gif'></div>";
        containerCartas.innerHTML = containerCartas.innerHTML + umaCarta;
    }
}



function revelaCartaClicada(cartaClicada) {
    let fundoCarta = cartaClicada.querySelector(".fundoCarta");
    let frenteCarta = cartaClicada.querySelector(".frenteCarta");
    fundoCarta.classList.add("Escondido");
    frenteCarta.classList.remove("Escondido");
}

function escondeTodasCartas() {
    let fundoCarta = document.querySelectorAll(".fundoCarta");
    let frenteCarta = document.querySelectorAll(".frenteCarta");
    for(let i=0; i<fundoCarta.length; i++) {
        fundoCarta[i].classList.remove("Escondido");
        frenteCarta[i].classList.add("Escondido");
    }
}

insereCartasNaTela()