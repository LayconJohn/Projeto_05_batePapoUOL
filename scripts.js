let mensagens = [];
let usuario = {nome: ''};
let mensagemTexto = '';
let mensagem = {};
let nome;

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
        to: "Todos",
        text: `${mensagemTexto.value}`,
        type: "message" 
    }

    //A partir daqui a requisição tá dando ruim
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
        <p><ion-icon name="people"></ion-icon> Todos</p>
        <p><ion-icon name="person-circle"></ion-icon>João</p>
        <p><ion-icon name="person-circle"></ion-icon>Maria</p>
    </div>
    <h5 class="titulo">Escolha a visibilidade</h5>
    <div class="visibilidade">
        <p><ion-icon name="lock-open"></ion-icon>Público</p>
        <p><ion-icon name="lock-closed"></ion-icon>Reservadamente</p>
    </div>
    `
}