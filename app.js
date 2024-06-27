//let titulo = document.querySelector('h1'); funciona mas se tornaria muito repetitvo melhor criar uma função(linha6)
//titulo.innerHTML = 'Jogo do Numero Secreto';
//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10';

let listadeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumero();
let tentativas = 1;

function exibirTextonaTela(tag, texto){
  let campo = document.querySelector(tag);
      campo.innerHTML = texto;
      responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function mensagemInicial(){
exibirTextonaTela('h1','Jogo do Numero Secreto');
    exibirTextonaTela('p','Escolha um número entre 1 e 10');
}
mensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;

    if(chute == numeroSecreto){
        exibirTextonaTela('h1', 'Acertouuu!!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa =`Você descobriu o numero secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextonaTela('p',mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
        
    } else {
        if(chute > numeroSecreto){
            exibirTextonaTela('p', 'O numero secreto é menor');
        }else{
            exibirTextonaTela('p', 'O numero secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumero(){
  let numeroEscolhido =  parseInt(Math.random() * numeroLimite+1);
  let qtdElementosNaLista = listadeNumerosSorteados.length;

  if(qtdElementosNaLista == numeroLimite){
    listadeNumerosSorteados = [];
  }

  if (listadeNumerosSorteados.includes(numeroEscolhido)){
    return gerarNumero();
  } else {
    listadeNumerosSorteados.push(numeroEscolhido);
    console.log(listadeNumerosSorteados)
    return numeroEscolhido;
  }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumero();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true); 

}