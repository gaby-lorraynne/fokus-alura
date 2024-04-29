const html = document.querySelector('html');
const btnFoco = document.querySelector('.app__card-button--foco');
const btnCurto = document.querySelector('.app__card-button--curto');
const btnLongo = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const title = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBtn = document.querySelector('#start-pause');
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciarPausarBtn = document.querySelector('#start-pause span');
const imgPausePlay = document.querySelector('.app__card-primary-butto-icon');
const musica = new Audio('/Fokus-projeto-base/sons/luna-rise-part-one.mp3');
musica.loop = true;

let temporizador = 1500;
let intervaloId = null;
const musicaPlay = new Audio('/Fokus-projeto-base/sons/play.wav');
const musicaPause = new Audio('/Fokus-projeto-base/sons/pause.mp3');
const musicaTempFinalizado = new Audio('/Fokus-projeto-base/sons/beep.mp3');

const timeTela = document.querySelector('#timer');

// alterar o atributo html quando tiver um clique no btnFoco
// o setAttribute recebe dois parâmetros, sendo o primeiro o atributo que quero alterar e o segundo é o que quero inserir quando eu tiver o btnFoco ou btnCurto ou btnLongo

// Uma forma de fazer, porem fica muito repetitivo: 
//  btnCurto.addEventListener('click', () => {
//     html.setAttribute('data-contexto','descanso-curto');
//     banner.setAttribute('src', '/Fokus-projeto-base/imagens/descanso-curto.png');
// })

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    }else{
        musica.pause()
    }
})

// Forma mais otimizada e menos repetitiva: Refatorada
btnFoco.addEventListener('click', () => {
    temporizador = 1500;
    alterarContexto('foco');
    btnFoco.classList.add('active');
})

btnCurto.addEventListener('click', () => {
    temporizador = 300;
    alterarContexto('descanso-curto');
    btnCurto.classList.add('active');
})

btnLongo.addEventListener('click', () => {
    temporizador = 900;
    alterarContexto('descanso-longo');
    btnLongo.classList.add('active');
})


function alterarContexto (contexto) {
    mostrarTempo()
    botoes.forEach(function(contexto){
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/Fokus-projeto-base/imagens/${contexto}.png`);
      
    switch (contexto) {
        case "foco":
            title.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            
        break;
        case "descanso-curto":
            title.innerHTML = `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`
        break;
        case "descanso-longo":
            title.innerHTML = `Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa!</strong>`
        break;
    }
}


// Temporizador
const contagemRegressiva = () => {
    if(temporizador <= 0){
        musicaTempFinalizado.play();
        alert('Tempo finalizado');
        zerar();
        return
    }
    temporizador -= 1;
    mostrarTempo();
}

startPauseBtn.addEventListener('click', iniciarPausarContagem)

function iniciarPausarContagem() {
    
    if(intervaloId){
        musicaPause.play();
        zerar();
        return;
    }
    musicaPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarPausarBtn.textContent = "Pausar";
    imgPausePlay.setAttribute('src', `/Fokus-projeto-base/imagens/pause.png`);
}

function zerar() {
    clearInterval(intervaloId);
    iniciarPausarBtn.textContent = "Começar";
    imgPausePlay.setAttribute('src', `/Fokus-projeto-base/imagens/play_arrow.png`);
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(temporizador*1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'});
    timeTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();
	