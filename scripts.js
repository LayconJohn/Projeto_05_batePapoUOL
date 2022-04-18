let mensagens = [];
let usuario = {nome: ''};
let mensagemTexto = '';
let mensagem = {};
let nome;
//let destinatario = document.querySelector(".contatos .selecionado").parentNode.innerText;
let tipoMensagem = 'message';

//Mensagens da API
pegarNomeUsuario();
setInterval(pegarMensagens, 3000);
setInterval(manterUsuario, 4000);

function renderizarMensagens() {
    const mensagemChat = document.querySelector(".chat");
    mensagemChat.innerHTML = '';
    for (let i=0; i < mensagens.length; i++) {
        if (mensagens[i].type == 'status') {
            mensagemChat.innerHTML += `
            <div class="mensagem ${mensagens[i].type}">
                <span><span class="horario">${mensagens[i].time}</span> <strong>${mensagens[i].from}</strong>  ${mensagens[i].text}</span>
            </div>
            `
        } else if (mensagens[i].type == 'message') {
            mensagemChat.innerHTML += `
            <div class="mensagem ${mensagens[i].type}">
                <span><span class="horario">${mensagens[i].time}</span> <strong>${mensagens[i].from}</strong> para <strong>${mensagens[i].to}</strong> ${mensagens[i].text}</span>
            </div>
            `
        } else if (mensagens[i].type == 'private_message') {
            mensagemChat.innerHTML += `
            <div class="mensagem ${mensagens[i].type}">
                <span><span class="horario">${mensagens[i].time}</span> <strong>${mensagens[i].from}</strong> reservadamente para <strong>${mensagens[i].to}</strong> ${mensagens[i].text}</span>
            </div>
            `   
        }
    }
}

function pegarMensagens() {
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promessa.then(carregarMensagens);
    const chat = document.querySelector(".chat");
    chat.scrollIntoView({block: "end"});
}

function enviarMensagem() {
    mensagemTexto = document.querySelector("input");

    mensagem = {
        from: `${nome}`,
        to: `Todos`, //${destinatario}
        text: `${mensagemTexto.value}`,
        type: `message` //${tipoMensagem}
    }
    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', mensagem)
    promessa.then(function () {
        mensagens.push(mensagem)
        renderizarMensagens();
        mensagemTexto.innerHTML = '';
    })
    promessa.catch(function (response){
        window.location.reload()
    })
    
}

function carregarMensagens(response) {
    mensagens = response.data;
    renderizarMensagens();
}

function tratarError(error) {
    if (error.response.status === 400) {
        alert('Nome já cadastrado');
        pegarNomeUsuario()
    }
}

function pegarNomeUsuario() {
    usuario.name = prompt('Qual é o nome de usuário?');
    cadastrarUsuario(usuario);
    mensagem.from = usuario.name
    nome = mensagem.from
    return nome
}

function cadastrarUsuario(user) {
    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants ', user);
    promessa.then(renderizarMensagens);
    promessa.catch(tratarError);
}

function manterUsuario() {
    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', usuario);
    promessa.then(function (){
        mensagem.from = usuario.name;
    });
    promessa.catch(pegarNomeUsuario);
}

function selecionarBarraLateral() {
    const barraLateral = document.querySelector(".barra-lateral")
    const telaLateral = document.querySelector(".tela-lateral")
    barraLateral.classList.toggle("oculto")
    telaLateral.classList.toggle("oculto")
    barraLateral.innerHTML = `
    <h5 class="titulo">Escolha um contato para enviar a mensagem</h5>
    <div class="contatos">
        <p onclick='selecionarContato(this)' ><ion-icon name="people"></ion-icon> Todos <ion-icon name="checkmark" class="caixa-selecionada selecionado"></ion-icon></p>
    </div>
    <h5 class="titulo">Escolha a visibilidade</h5>
    <div class="visibilidade">
        <p onclick='selecionarVisibilidade(this)'><ion-icon name="lock-open"></ion-icon>Público <ion-icon name="checkmark" class="caixa-selecionada selecionado"></ion-icon></p>
        <p onclick='selecionarVisibilidade(this)'><ion-icon name="lock-closed"></ion-icon>Reservadamente <ion-icon name="checkmark" class="caixa-selecionada oculto"></ion-icon></p>
    </div>
    `
    pegarUsuariosAtivos();
}

function selecionarContato(elemento) {
    const elementoSelecionado = elemento.querySelector(".caixa-selecionada")
    const card = document.querySelector(".contatos .caixa-selecionada.selecionado") 
    if (card !== null) {
        card.classList.remove("selecionado")
        card.classList.add("oculto") 
    }
    elementoSelecionado.classList.remove("oculto")
    elementoSelecionado.classList.add("selecionado")
}

function selecionarVisibilidade(elemento) {
    const elementoSelecionado = elemento.querySelector(".caixa-selecionada")
    const card = document.querySelector(".visibilidade .caixa-selecionada.selecionado") 
    if (card !== null) {
        card.classList.remove("selecionado")
        card.classList.add("oculto") 
    }
    elementoSelecionado.classList.remove("oculto")
    elementoSelecionado.classList.add("selecionado")
    //pegaTipoMensagem()
}

function pegaTipoMensagem() {
    if (document.querySelector(".visibilidade .selecionado").parentNode.innerText === 'Público') {
        tipoMensagem = 'message';
    } else {
        tipoMensagem = 'private_message';
    }
    return tipoMensagem;
}

function pegarUsuariosAtivos() {
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants')
    promessa.then(inserirUsuariosAtivos)
}

function inserirUsuariosAtivos(response) {
    let contatos = document.querySelector(".contatos")
    let listaUsurarios = response.data
    for (let i = 0; i < listaUsurarios.length; i++) {
        contatos.innerHTML += `
        <p onclick='selecionarContato(this)' ><ion-icon name="person-circle"></ion-icon> ${listaUsurarios[i].name} <ion-icon name="checkmark" class="caixa-selecionada oculto"></ion-icon></p>
        `
    }
}