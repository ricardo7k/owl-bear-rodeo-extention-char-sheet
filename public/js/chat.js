import { collection, addDoc, orderBy, query, onSnapshot, limit } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

let chatCollection;


function rolarDados(comando) {
    // Expressão regular para validar e extrair os componentes do comando.
    const regex = /^\/r\s+((\d+)?d(\d+))(?:\s*([+-]\s*\d+))?(?:\s*([+-]\s*\d+))*$/i;
    const match = comando.match(regex);


    if (!match) {
        return { error: "Comando inválido. Use o formato /r NdD+X+Y..." };
    }

    // Extrai os componentes da regex.
    const numDados = parseInt(match[2] || 1, 10);  // Usa 1 como padrão se não houver número de dados.
    const facesDado = parseInt(match[3], 10);
    const modificadores = [];

    // Loop para pegar todos os modificadores (+X, -Y).  Começa em 4.
    for (let i = 4; i < match.length; i += 2) {
        if (match[i]) { // Verifica se o grupo de captura existe
          const sinal = match[i].trim()[0]; //Pega o + ou -
          const valor = parseInt(match[i+1],10); //Pega o número
          modificadores.push(sinal === '-' ? -valor : valor); //Adiciona com o sinal correto.
        }
    }

    // Simula as rolagens.
    const rolagens = [];
    for (let i = 0; i < numDados; i++) {
        rolagens.push(Math.floor(Math.random() * facesDado) + 1);
    }

    // Calcula a soma dos modificadores.
    const somaModificadores = modificadores.reduce((sum, val) => sum + val, 0);

    //Calcula a soma das rolagens
    const somaRolagens = rolagens.reduce((sum, val) => sum + val, 0);

    // Calcula o total.
    const total = somaRolagens + somaModificadores;

    return {
        numDados: numDados,
        facesDado: facesDado,
        rolagens: rolagens,
        modificadores: modificadores,
        somaRolagens: somaRolagens,
        somaModificadores: somaModificadores,
        total: total
    };
}

function addMessage(nome, userId, conteudo) {
    if(conteudo.indexOf("/r")==0) {
        let cmd = rolarDados(conteudo);
        var lab = "Chat Roll";
        var _bonus = cmd.somaModificadores;
        var dice = `${cmd.numDados}d${cmd.facesDado}`;
        var rolagem = getid("char_name").value + " - " + lab;
        var a = dice.split("d");
        randomNum(a[0],a[1]).then((data)=>{
            acaoDado(`${dice}@${data}`, rolagem, _bonus, lab);
        });    
        return;
    }
    var timestamp = new Date().getTime();
    addDoc(chatCollection, {
        name: nome,
        userId: userId,
        content: conteudo,
        timestamp: timestamp
    })
    .then(() => {

    })
    .catch(error => {
        console.error("Error adding document: ", error);
    });
}

function getMessages() {
    const q = query(chatCollection, orderBy('timestamp', 'desc'), limit(5));
    onSnapshot(q, (snapshot) => {
        let messages = [];
        snapshot.docChanges().forEach((change) => {
            if (change.type === 'added') {
                messages.push(change.doc.data());
            }
        });
        updateChatDisplay(messages.reverse());
    }, (error) => {  // Add error handling here
        console.error("Error getting messages:", error);
    });
}

function updateChatDisplay(messages) {
    const chatBox = document.getElementById('chat-box');
    if (!chatBox) {
        console.error("Chat box element not found!");
        return;
    }
    //chatBox.innerHTML = '';
    messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.innerHTML = `
            <fieldset>
                <legend>${message.name}:</legend>
                <div>${message.content}</div>
            </fieldset>`;
        chatBox.appendChild(messageElement);
    });
    // setTimeout(()=>{
        getid("chat-box").scrollTop = getid("chat-box").scrollHeight;
    // }, 500);
}

function showBoxChat(e) {
  getid("chat-container").classList.add('visible');
}

function hideBoxChat(e) {
    getid("chat-container").classList.remove('visible');
}

function initChat() {
    chatCollection = collection(window.authFirestore, 'chat');

    const chatForm = document.getElementById('chat-form');
    const messageInput = document.getElementById('message-input');
    const charName = document.getElementById('char_name');

    if (!chatForm || !messageInput || !charName) {
        console.error("One or more chat elements not found!");
        return;
    }

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nome = charName.value;
        const userId = window.userId; // Ensure window.userId is set by your auth code
        const conteudo = messageInput.value;
        if (nome && userId && conteudo) {
            addMessage(nome, userId, conteudo);
            messageInput.value = '';
        }
    });

    getMessages();
    getid("chatbt").style.display = "inline-block";
    getid("chatbt").style.marginLeft = "10px";
    getid("chatbt").addEventListener("click", showBoxChat);
    getid("close-chat").addEventListener("click", hideBoxChat);

}

window.initChat = initChat;
window.addMessage = addMessage;