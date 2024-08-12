const prato = document.querySelector('.menu-pratos');
const bebida = document.querySelector('.menu-bebidas');
const sobremesa = document.querySelector('.menu-sobremesas');

const pratos = prato.querySelectorAll(".cardapio-item");
const bebidas = bebida.querySelectorAll(".cardapio-item");
const sobremesas= sobremesa.querySelectorAll(".cardapio-item");

let ativarBotao = [0,0,0];

let pedido = [
    {nome:'',preco:''},
    {nome:'',preco:''},
    {nome:'',preco:''}
];

checarSelecao(pratos,0);
checarSelecao(bebidas,1);
checarSelecao(sobremesas,2);

//ANIMAÇÃO DOS CARDS

function checarSelecao(arrItems,j){
    for (const item of arrItems){
        item.addEventListener('click', function(){ //DESATIVA TODOS OS CARDS ATIVOS
            for(let i = 0; i < arrItems.length; i++){
                arrItems[i].classList.remove('active');
                arrItems[i].querySelector(".check").classList.remove("checkActive");
            }
            //ATIVA O CARD SELECIONADO
            item.classList.add('active');
            item.querySelector(".check").classList.add("checkActive");

            pedido[j].nome = item.querySelector('.item-title').innerText;
            pedido[j].preco = item.querySelector('.preco').innerText;
            ativarBotao[j] = 1;
            verificarBotao();
        })
    }
}


//CHECAR SE OS 3 ITENS FORAM SELECIONADOS

function verificarBotao(){
    for (let i = 0; i < ativarBotao.length; i++){
        if(ativarBotao[i] === 0){
            return 0;
        }
    }
    montarPedido();
}

function montarPedido(){

    // SELECIONAR ELEMENTOS DO HTML

    const botaoCompra = document.querySelector(".botaoCompra");
    const modal = document.querySelector(".modal");
    const botaoCancelar = document.querySelector("#botaoCancelar");

    const pedido1 = document.querySelector("#pedido1");
    const pedido2 = document.querySelector("#pedido2");
    const pedido3 = document.querySelector("#pedido3");
    const total = document.querySelector("#total");

    //MONTAR OS ITEMS DO MODAL

    pedido1.querySelector('.pedido-nome').innerHTML = pedido[0].nome;
    pedido1.querySelector('.pedido-preco').innerHTML = pedido[0].preco;

    pedido2.querySelector('.pedido-nome').innerHTML = pedido[1].nome;
    pedido2.querySelector('.pedido-preco').innerHTML = pedido[1].preco;

    pedido3.querySelector('.pedido-nome').innerHTML = pedido[2].nome;
    pedido3.querySelector('.pedido-preco').innerHTML = pedido[2].preco;

    // TRANSFORMAR AS STRINGS DO PRECO EM NÚMEROS

    const preco1 = transformarNum(pedido[0].preco);
    const preco2 = transformarNum(pedido[1].preco);
    const preco3 = transformarNum(pedido[2].preco);

    //CALCULAR O TOTAL DO PEDIDO E COLOCAR NO MODAL

    const precoTotal = (preco1) + (preco2) + (preco3);

    total.querySelector('.pedido-total').innerHTML = 'R$ ' + (precoTotal.toFixed(2));

    //MONTAR MENSAGEM PARA WHATSAPP

    let mensagem =
        `Olá, gostaria de fazer o pedido:
         - Prato: ${pedido[0].nome}
         - Bebida: ${pedido[1].nome}
         - Sobremesa: ${pedido[2].nome}
         Total: R$ ${precoTotal.toFixed(2)}`

    mensagem = 'https://wa.me//5511984677041?text=' + (encodeURIComponent(mensagem));

    document.querySelector('#linkWhatsapp').setAttribute('href',mensagem);


    //FUNCIONALIDADES DO MODAL

    botaoCompra.innerHTML = "Fechar pedido";
    botaoCompra.classList.add('botaoAtivo');

    botaoCompra.addEventListener("click", function(){
        modal.style.display = 'flex';
    })

    botaoCancelar.addEventListener("click", function(){
        modal.style.display = 'none';
    })
}


function transformarNum(string){
    let num = string.replace("R$","").trim().replace(",",".");
    return parseFloat(num);
}