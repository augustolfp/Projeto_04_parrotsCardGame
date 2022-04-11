let ArrayJogadasFeitas = [];
let tempo = 0;
let meuInterval;
let travarComandosDoUsuario;


function perguntaQuantasCartas() {
    let numeroDeCartas = prompt("Com quantas Cartas você deseja jogar?");
    if(numeroDeCartas % 2 === 0 && numeroDeCartas >= 4 && numeroDeCartas <= 14) {
        return numeroDeCartas;
    }
    else {
        alert("Esse é um jogo da memória, o número de cartas precisa ser par!\n\nAlém disso, o número mínimo são 4 cartas, e o máximo 14!");
        return perguntaQuantasCartas();
    }
}

function inicializaJogo() {
    let numeroDeCartas = perguntaQuantasCartas();
    let ArrayGifsEmbaralhados = retornaArrayParesCartasEmbaralhadas(numeroDeCartas);
    for(let i=0; i<numeroDeCartas; i++) {
        let containerCartas = document.querySelector(".containerCartas");
        let umaCarta = `<div id=${i} class='carta' onclick='contabilizaJogada(this)'>
                            <div class='fundoCarta'><img src='Pngs/front.png'></div>
                            <div class='frenteCarta'><img src=${ArrayGifsEmbaralhados[i]}></div>
                        </div>`;
        containerCartas.innerHTML = containerCartas.innerHTML + umaCarta;
    }
    meuInterval = setInterval(contadorTempo, 1000);
    travarComandosDoUsuario = false;
}

function contabilizaJogada(cartaClicada) {
    if(travarComandosDoUsuario === false && cartaClicadaJaEstaVirada(cartaClicada) === false) {
        revelaCartaClicada(cartaClicada);
        let gifDaCarta = cartaClicada.querySelector(".frenteCarta").querySelector("img").src;
        let idCarta = cartaClicada.id;
        ArrayJogadasFeitas.push({idDaCarta: idCarta, gifCarta: gifDaCarta});
        let numeroDeCartasClicadas = ArrayJogadasFeitas.length;
        if(numeroDeCartasClicadas%2===0) {
            travarComandosDoUsuario = true;
            let indiceUltimoItem = numeroDeCartasClicadas - 1;
            let indicePenultimoItem = numeroDeCartasClicadas - 2;
            let ultimaCartaClicada = ArrayJogadasFeitas[indiceUltimoItem];
            let penultimaCartaClicada = ArrayJogadasFeitas[indicePenultimoItem];
            if(ultimaCartaClicada.gifCarta != penultimaCartaClicada.gifCarta) {
                setTimeout(function() {escondeDuasCartas(ultimaCartaClicada.idDaCarta, penultimaCartaClicada.idDaCarta)}, 1000);
            }
            else {
                travarComandosDoUsuario = false;
            }
        }
        checaSeUsuarioGanhou();
    }
}

function cartaClicadaJaEstaVirada(cartaClicada) {
    let estado = cartaClicada.querySelector(".frenteCarta").classList.contains("rotateFrente");
    return estado;
}

function revelaCartaClicada(cartaClicada) {
    let fundoCarta = cartaClicada.querySelector(".fundoCarta");
    let frenteCarta = cartaClicada.querySelector(".frenteCarta");
    fundoCarta.classList.add("rotateFundo");
    frenteCarta.classList.add("rotateFrente");
}

function escondeDuasCartas(id1, id2) {
    let fundoCarta1 = document.getElementById(`${id1}`).querySelector(".fundoCarta");
    let frenteCarta1 = document.getElementById(`${id1}`).querySelector(".frenteCarta");
    let fundoCarta2 = document.getElementById(`${id2}`).querySelector(".fundoCarta");
    let frenteCarta2 = document.getElementById(`${id2}`).querySelector(".frenteCarta");
    fundoCarta1.classList.remove("rotateFundo");
    frenteCarta1.classList.remove("rotateFrente");
    fundoCarta2.classList.remove("rotateFundo");
    frenteCarta2.classList.remove("rotateFrente");
    travarComandosDoUsuario = false;
}

function escolheGifs(numeroDeCartas) {
    let numerodeGifs = numeroDeCartas/2;
    let arrayGifs = ["Gifs/bobrossparrot.gif", "Gifs/explodyparrot.gif", "Gifs/fiestaparrot.gif", "Gifs/metalparrot.gif", "Gifs/revertitparrot.gif", "Gifs/tripletsparrot.gif", "Gifs/unicornparrot.gif"];
    arrayGifs = arrayGifs.sort(funcaoShuffleCards);
    let gifsSelecionados = [];
    for(let i=0; i<numerodeGifs; i++) {
        gifsSelecionados.push(arrayGifs[i])
    }
    return gifsSelecionados;
}

function retornaArrayParesCartasEmbaralhadas(numeroDeCartas) {
    let gifsSelecionados = escolheGifs(numeroDeCartas);
    let paresDeCartasEmbaralhadas = gifsSelecionados.concat(gifsSelecionados);
    paresDeCartasEmbaralhadas = paresDeCartasEmbaralhadas.sort(funcaoShuffleCards);
    return paresDeCartasEmbaralhadas;
}

function funcaoShuffleCards() { 
	return Math.random() - 0.5; 
}

function checaSeUsuarioGanhou() {
    let numeroDeCartasReveladas = document.querySelectorAll(".rotateFrente").length;
    let numeroDeCartas = document.querySelectorAll(".carta").length;
    let numeroDeJogadas = ArrayJogadasFeitas.length;
    if(numeroDeCartasReveladas === numeroDeCartas) {
        clearInterval(meuInterval);
        alert(`Você ganhou em ${numeroDeJogadas} jogadas, e levou apenas ${tempo} segundos!`);
        desejaJogarNovamente();
    }
}

function contadorTempo() {
    tempo++;
    document.querySelector(".cronometro").innerHTML = `${tempo}s`;
}

function desejaJogarNovamente() {
    let respostaUsuario = prompt("Deseja jogar novamente?");
    if(respostaUsuario === "sim") {
        limpaTela();
        inicializaJogo();
    }
    else if(respostaUsuario != "não") {
        alert('responda "sim" ou "não"!')
        return desejaJogarNovamente();
    }
}

function limpaTela() {
    let containerCartas = document.querySelector(".containerCartas");
    containerCartas.innerHTML = "";
    tempo = 0;
    ArrayJogadasFeitas = [];
}

inicializaJogo()