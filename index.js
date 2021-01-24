//API do Telegram e habilitar o Dialogflow
const TelegramBot = require('node-telegram-bot-api');
const dialogflow = require('./dialogflow');

//Habilitar acesso youtube
const youtube = require('./youtube');

//Token do Telegram (cada bot tem o seu)
const token = '1585328538:AAGgkBmeQxGIFgtFtkUTrn_FAS2yFiOdeM8';

//Criar instancia do bot e escutar msgs fazendo polling
const bot = new TelegramBot(token, { polling: true });
bot.on('message', async (msg) => {
    
    //Ler ID do chat do usuário
    const chatId = msg.chat.id;

    const dfResponse = await dialogflow.sendMessage(chatId.toString(), msg.text);

    //Encontrar texto resposta pelo dialogflow
    let textResponse = dfResponse.text;
    
    //Verifica o intent se é o diálogo certo do dialogflow
    if (dfResponse.intent === 'Treino específico') {
        // modifica o texto para os dados retornados a partir da busca realizada no youtube
        // lembre-se que para acessar o campo corpo dentro de fields ele teve que ser definido como uma entidade no dialogflow
        textResponse = await youtube.searchVideoURL(textResponse, dfResponse.fields.corpo.stringValue);
    }
    
    //Envia a mensagem para o usuário
    bot.sendMessage(chatId, textResponse);
});