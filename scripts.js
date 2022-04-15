let mensagens = [];
let usuario = {nome: ''};
let mensagemText = '';
let mensagem = {
	from: `${pegarNomeUsuario()}`,
	to: "Todos",
	text: `${mensagemText}`,
	type: "message" // ou "private_message" para o bônus
}

//Mensagens da API
pegarMensagens();
pegarNomeUsuario();

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
}

function enviarMensagem() {
    mensagemText = document.querySelector("input").value;

    //A partir daqui a requisição tá dando ruim
    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', mensagem)
    promessa.then(carregarMensagens)
    promessa.catch(function (response){
        alert("Deu ruim pra enviar a mensagem")
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
    return usuario.name
}

function cadastrarUsuario(user) {
    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants ', user);
    promessa.then(renderizarMensagens);
    promessa.catch(tratarError);
}