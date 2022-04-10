const ArrayJogadasFeitas = [];

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
    let ArrayGifsEmbaralhados = scrambledGifs(numeroDeCartas);
    for(let i=0;i<numeroDeCartas;i++) {
        let containerCartas = document.querySelector(".containerCartas");
        let umaCarta = `<div id=${i} onclick='contabilizaJogada(this)'><img class='fundoCarta' src='Pngs/front.png'><img class='frenteCarta Escondido' src=${ArrayGifsEmbaralhados[i]}></div>`;
        containerCartas.innerHTML = containerCartas.innerHTML + umaCarta;
    }
}

function contabilizaJogada(cartaClicada) {
    revelaCartaClicada(cartaClicada);
    let gifDaCarta = cartaClicada.querySelector(".frenteCarta").src;
    let idCarta = cartaClicada.id;
    ArrayJogadasFeitas.push({idDaCarta: idCarta, gifCarta: gifDaCarta});
    let numeroDeCartasClicadas = ArrayJogadasFeitas.length;
    if(numeroDeCartasClicadas%2===0) {
        let UltimoItem = numeroDeCartasClicadas - 1;
        let PenultimoItem = numeroDeCartasClicadas - 2;
        if(ArrayJogadasFeitas[UltimoItem].gifCarta!=ArrayJogadasFeitas[PenultimoItem].gifCarta) {
            setTimeout(function() {escondeDuasCartas(ArrayJogadasFeitas[UltimoItem].idDaCarta,ArrayJogadasFeitas[PenultimoItem].idDaCarta)}, 1000);
        }
    }
    checaSeUsuarioGanhou();
}

function revelaCartaClicada(cartaClicada) {
    let fundoCarta = cartaClicada.querySelector(".fundoCarta");
    let frenteCarta = cartaClicada.querySelector(".frenteCarta");
    fundoCarta.classList.add("Escondido");
    frenteCarta.classList.remove("Escondido");
}

function escondeDuasCartas(id1, id2) {
    let fundoCarta1 = document.getElementById(`${id1}`).querySelector(".fundoCarta");
    let frenteCarta1 = document.getElementById(`${id1}`).querySelector(".frenteCarta");
    let fundoCarta2 = document.getElementById(`${id2}`).querySelector(".fundoCarta");
    let frenteCarta2 = document.getElementById(`${id2}`).querySelector(".frenteCarta");
    fundoCarta1.classList.remove("Escondido");
    frenteCarta1.classList.add("Escondido");
    fundoCarta2.classList.remove("Escondido");
    frenteCarta2.classList.add("Escondido");
}

function escolheGifs (numeroDeCartas) {
    let numerodeGifs = numeroDeCartas/2;
    let arrayGifs = ["Gifs/bobrossparrot.gif", "Gifs/explodyparrot.gif", "Gifs/fiestaparrot.gif", "Gifs/metalparrot.gif", "Gifs/revertitparrot.gif", "Gifs/tripletsparrot.gif", "Gifs/unicornparrot.gif"];
    arrayGifs = arrayGifs.sort(ScrambleArrayFunction);
    let selectedGifs = [];
    for(let i=0;i<numerodeGifs;i++) {
        selectedGifs.push(arrayGifs[i])
    }
    return selectedGifs;
}

function scrambledGifs (numeroDeCartas) {
    let selectedGifs = escolheGifs(numeroDeCartas);
    let scrambledPairsOfGifs = selectedGifs.concat(selectedGifs);
    scrambledPairsOfGifs = scrambledPairsOfGifs.sort(ScrambleArrayFunction);
    return scrambledPairsOfGifs;
}

function ScrambleArrayFunction() { 
	return Math.random() - 0.5; 
}

function checaSeUsuarioGanhou() {
    let numeroDeCartasEscondidas = document.querySelectorAll(".frenteCarta.Escondido").length;
    let numeroDeJogadas = ArrayJogadasFeitas.length;
    if(numeroDeCartasEscondidas===0) {
        alert(`Você ganhou em ${numeroDeJogadas} jogadas!`);
    }
}






insereCartasNaTela()