const mensagens = [
    {
        horario: '(09:21:45)',
        remetente: 'João',
        destinatario: '',
        mensagem: 'entra na sala...',
        tipo: 'status'
    },
    {
        horario: '(09:22:28)',
        remetente: 'João',
        destinatario: 'Todos',
        mensagem: 'Bom dia',
        tipo: 'normal'
    },
    {
        horario: '(09:22:38)',
        remetente: 'Maria',
        destinatario: 'João',
        mensagem: 'Bom dia :)',
        tipo: 'normal'
    },
    {
        horario: '(09:22:48)',
        remetente: 'Maria',
        destinatario: 'João',
        mensagem: 'Oi gatinha quer tc?',
        tipo: 'reservada'
    },
    {
        horario: '(09:22:58)',
        remetente: 'Maria',
        destinatario: '',
        mensagem: 'sai na sala...',
        tipo: 'status'
    },
]

function renderizarMensagens() {
    const mensagemChat = document.querySelector(".chat")
    for (let i=0; i < mensagens.length; i++) {
        if (mensagens[i].tipo == 'status') {
            mensagemChat += `
            <div class="mensagem ${mensagens[i].tipo}">
                <span><span class="horario">${mensagens[i].horario}</span> <strong>${mensagens[i].remetente}</strong>  ${mensagens[i].mensagem}</span>
            </div>
            `
        } else if (mensagens[i].tipo == 'normal') {
            mensagemChat += `
            <div class="mensagem ${mensagens[i].tipo}">
                <span><span class="horario">${mensagens[i].horario}</span> <strong>${mensagens[i].remetente}</strong> para <strong>${mensagens[i].destinatario}</strong> ${mensagens[i].mensagem}</span>
            </div>
            `
        } else if (mensagens[i].tipo == 'normal') {
            mensagemChat += `
            <div class="mensagem ${mensagens[i].tipo}">
                <span><span class="horario">${mensagens[i].horario}</span> <strong>${mensagens[i].remetente}</strong> reservadamente para <strong>${mensagens[i].destinatario}</strong> ${mensagens[i].mensagem}</span>
            </div>
            `   
        }

    }
}

renderizarMensagens()