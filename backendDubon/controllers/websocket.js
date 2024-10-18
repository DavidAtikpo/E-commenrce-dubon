import { WebSocketServer } from 'ws';

function websocketServer(server) {
  if (typeof server.on !== 'function') {
    throw new Error('Le serveur fourni n\'est pas un serveur HTTP valide.');
  }

  const wsServer = new WebSocketServer({ server });

  wsServer.on('connection', (ws) => {
    console.log("Un utilisateur non connecté est connecté au WebSocket");

    ws.on('message', (message) => {
      let data;
      try {
        // Vérifier si le message est un Buffer et le convertir en chaîne
        if (Buffer.isBuffer(message)) {
          message = message.toString(); // Conversion en chaîne
        }
        
        console.log('Message reçu du client (format texte):', message);
        data = JSON.parse(message);
        console.log('Message parsé:', data);
      } catch (error) {
        console.error('Erreur lors du parsing du message:', error);
        ws.send(JSON.stringify({
          message: 'Erreur de format dans le message. Veuillez envoyer un message valide.',
          sender: 'bot',
        }));
        return;
      }
    
      if (data.type === 'message') {
        console.log(`Message utilisateur: ${data.message}`);
    
        // Réponse automatique du bot basée sur les mots-clés
        const botResponse = getBotResponse(data.message);
        console.log(`Réponse automatique générée: ${botResponse}`);
    
        if (botResponse) {
          ws.send(JSON.stringify({
            message: botResponse,
            sender: 'bot',
          }));
          console.log('Réponse envoyée à l\'utilisateur.');
        }
      }
    });
    

    ws.on('close', () => {
      console.log('Utilisateur déconnecté.');
    });
  });

  // Fonction pour générer une réponse automatisée
  function getBotResponse(clientMessage) {
    const keywords = {
      'bonjour': 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?',
      'problème': 'Je suis désolé d\'entendre cela. Pouvez-vous me donner plus de détails ?',
      'prix': 'Les prix varient selon les produits. Avez-vous un produit spécifique en tête ?',
      'livraison': 'La livraison prend généralement entre 3 et 5 jours ouvrables.',
    };

    for (let keyword in keywords) {
      if (clientMessage.toLowerCase().includes(keyword)) {
        return keywords[keyword];
      }
    }
    return 'Je n\'ai pas compris votre demande. Pouvez-vous être plus précis ?'; // Réponse par défaut
  }

  return wsServer;
}

export default websocketServer;
