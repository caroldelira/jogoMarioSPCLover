const nuvens = document.querySelector('.nuvens');
const mario = document.querySelector('.mario');
const cano = document.querySelector('.cano');
const moita = document.querySelector('.moita');
const blocoroxo = document.querySelector('.blocoroxo');

const deuruim = document.querySelector('.deuruim');
const botaoNovoJogo = document.querySelector('#jogar-novamente');

const musicaPulo = new Audio('./som/marioPula.mp3');
const musicaPerde = new Audio('./som/marioPerde.mp3');
const marioMusica = new Audio('./som/marioMusica.mp3');

const IMG_MARIO_BAIXA = './imagens/marioabaixa.svg';
const GIF_MARIO_CORRE = './imagens/mariocorre.webp';
const IMG_DEU_RUIM = './imagens/deuruim.png';
const IMG_MARIO_PERDE = './imagens/marioperde.svg';


botaoNovoJogo.addEventListener('click', function () {
  location.reload();
});

let tempo = 0;
let tempoInicial = new Date().getTime();

const atualizarScore = () => {
  const tempoAtual = new Date().getTime();
  const tempoDecorrido = tempoAtual - tempoInicial;
  const segundosDecorridos = Math.floor(tempoDecorrido / 1000);
  
  tempo = segundosDecorridos; 
  
  document.getElementById('tempo').innerHTML = `Pontuação: ${tempo}`;
};

const temporizador = setInterval(atualizarScore, 1000);

const pulo = () => {
  mario.classList.add('pulo');
  musicaPulo.play();

  setTimeout(() => {
    mario.classList.remove('pulo');
  }, 500)
}

const baixa = () => {
  mario.src = IMG_MARIO_BAIXA;
  mario.style.bottom = '-5px';
  mario.style.left = '30px';
  mario.style.width = '60px';
  setTimeout(() => {
    mario.src = GIF_MARIO_CORRE;
    mario.style.bottom = '5px';
    mario.style.left = '0';
    mario.style.width = '150px';
  }, 500)
}

const marioPerde = () => {

  deuruim.src = IMG_DEU_RUIM;
  marioMusica.pause();
  musicaPerde.play();

  setTimeout(function () {
    musicaPerde.pause();
  }, 3000);
  
  clearInterval(loop);
  clearInterval(temporizador);

  botaoNovoJogo.classList.add('divBotao');
}

const loop = setInterval(() => { 
  
  const posicaoCano = cano.offsetLeft; //posicao da esquerda do tubo
  const posicaoNuvem = nuvens.offsetLeft; //posicao da esquerda da nuvem
  const posicaoMoita = moita.offsetLeft; //posicao da esquerda da nuvem
  const posicaoBloco = blocoroxo.offsetLeft;
  const posicaoMario = +window.getComputedStyle(mario).bottom.replace('px', ''); //altura do pulo do mario e o + transforma em numero o resultado
 
  marioMusica.play();
  
  const nuvemPara = () => {
    nuvens.style.animation = 'none';
    nuvens.style.left = `${posicaoNuvem}px`;
    mario.src = IMG_MARIO_PERDE;
  }

  const marioPara = () => {
    mario.style.animation = 'none';
    mario.style.bottom = `${posicaoMario}px`;
    mario.style.width = '80px'
    mario.style.marginLeft = '50px'
    mario.src = IMG_MARIO_PERDE;
  }

  const moitaPara = () => {
    moita.style.animation = 'none';
    moita.style.left = `${posicaoMoita}px`
    mario.src = IMG_MARIO_PERDE;
  }

  const canoPara = () => {
    cano.style.animation = 'none';
    cano.style.left = `${posicaoCano}px`;
    mario.src = IMG_MARIO_PERDE;
  }

  const blocoPara = () => {
    blocoroxo.style.animation = 'none';
    blocoroxo.style.left = `${posicaoBloco}px`; 
    mario.src = IMG_MARIO_PERDE;
  }

  if (posicaoCano < 120 && posicaoCano > 0 && posicaoMario < 70) {
    
    canoPara();
    marioPara();
    nuvemPara();
    moitaPara();
    blocoPara();
    marioPerde();
    
  } else if (posicaoMoita < 120 && posicaoMoita > 0 && posicaoMario < 50) {

    moitaPara();
    marioPara();
    nuvemPara();
    canoPara();
    blocoPara();
    marioPerde();
    
  } else if (posicaoBloco < 110 && posicaoBloco > 0 && posicaoMario > 0) {

    blocoPara();
    moitaPara();
    marioPara();
    nuvemPara();
    canoPara();
    marioPerde();

  }

}, 10)

document.addEventListener("keydown", function(event) {
  if (event.code === "KeyW") {
    { pulo(); }
  } else if (event.code === "KeyS") {
    { baixa(); }
  }
});
 
