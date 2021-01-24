//Biblioteca de APIs para youtube
const YouTube = require('youtube-node');

//Configuração da biblioteca do youtube
const config = require('./configs/yt-config.json');

//Criar instância Youtube
const youtube = new YouTube();

//Puxar a Key da configuração para a instância do youtube
youtube.setKey(config.key);

//Função procurar vídeos
function searchVideoURL(message, queryText) {
  // encapsulando função de search em uma promise para conseguirmos retornar os resultados do callback
    return new Promise((resolve, reject) => {
      cancel  
      //Busca via concatenação String e Query
        youtube.search(`Exercício em casa para ${queryText}`, 2, function(error, result) {
            if (!error) { 
            
              //Gerar array de Ids de videos
              const videoIds = result.items.map((item) => item.id.videoId).filter(item => item);

              //Gerar array links do youtube
              const youtubeLinks = videoIds.map(videoId => `https://www.youtube.com/watch?v=${videoId}`).join(', ');

              //Mensagem recebida concatenada com links para index.js
              resolve(`${message} ${youtubeLinks}`);
            
            } else { 

              resolve('Deu erro!!');

            }
          });
    });
}
Promise.config({cancellation: true});  

//Exportando a função para index.js
module.exports.searchVideoURL = searchVideoURL;
