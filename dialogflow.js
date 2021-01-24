//Habilitar a biblioteca dialogflow
const dialogflow = require('dialogflow');

//Habilitar configurações do dialogflow
const configs = require('./agent.json');

//Definir um cliente com as credenciais do arquivo agent.json

const sessionClient = new dialogflow.sessionsClient({
    projectId: configs.project_id,
    credentials: { 
        private_key: configs.private_key, 
        client_email: configs.client_email 
    }
});

// Definir envio de mensagens entre o telegram e o dialogflow
async function sendMessage(chatId, message) {
    //Criar ou recuperar a  user session
    const sessionPath = sessionClient.sessionPath(configs.project_id, chatId);

    //Request para o dialogflow
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                message: message,
                languageCode: 'pt-Br'
            }

        } 
    };

    //Definir o evento
    const eventQueryInput = { event: { name: 'start', languageCode: 'pt-BR' } }

    //Verificar se a mensagem enviada foi um start caso seja 
    //monta um evento chamando a action 'start'
    //Lembrem-se que essa action precisa estar cadastrada no dialogflow para conseguirmos chamá-la
    request.queryInput = message === '/start' ?  eventQueryInput : textQueryInput;

    //Respostas da requisição (dialogflow)
    const responses = await sessionClient.detectIntent(request);

    //Resultado do dialogflow
    const result = responses[0].queryResult;

    //Retornar objeto index.js
    return { 
        text: result.fulfillmentText, 
        intent: result.intent.displayName, 
        fields: result.parameters.fields 
    };
}

//Exportar função sendMessage
module.exports.sendMessage = sendMessage