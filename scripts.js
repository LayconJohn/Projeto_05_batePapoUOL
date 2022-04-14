let mensagens = [];

//Mensagens da API
pegarMensagens();

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
        } else if (mensagens[i].type == 'normal') {
            mensagemChat.innerHTML += `
            <div class="mensagem ${mensagens[i].type}">
                <span><span class="horario">${mensagens[i].time}</span> <strong>${mensagens[i].from}</strong> para <strong>${mensagens[i].to}</strong> ${mensagens[i].text}</span>
            </div>
            `
        } else if (mensagens[i].type == 'reservada') {
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
    promessa.catch(tratarError);
}

function carregarMensagens(response) {
    mensagens = response.data;
    renderizarMensagens();
}

function tratarError(error) {
    console.log('Deu ruim');
}
