import React, { useState, useEffect, useRef } from 'react';
import './ChatBox.css'; // Assurez-vous de créer ce fichier pour le style

const ChatBox = () => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(true); // Le chat s'ouvre automatiquement
  const [hasAutoClosed, setHasAutoClosed] = useState(false); // Suivi de la fermeture automatique
  const ws = useRef(null);

  useEffect(() => {
    // Connexion WebSocket
    ws.current = new WebSocket('ws://localhost:5000'); // Change selon l'URL de ton serveur WebSocket

    ws.current.onopen = () => {
      console.log('Connecté au serveur WebSocket');
      // Ajouter un message de bienvenue dès que la connexion WebSocket est établie
      setChatMessages((prevMessages) => [
        ...prevMessages,
        'bot: Bienvenu sur la page DUBON Service, que puis-je faire pour vous ? Je suis là pour vous aider.'
      ]);
    };

    ws.current.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      console.log('Message reçu du serveur:', newMessage);
      // Ajouter le message reçu du serveur
      setChatMessages((prevMessages) => [
        ...prevMessages,
        `${newMessage.sender}: ${newMessage.message}`
      ]);
    };

    ws.current.onclose = () => {
      console.log('Déconnecté du serveur WebSocket');
    };

    // Cleanup lors du démontage du composant
    return () => {
      ws.current.close();
    };
  }, []);

  // Gérer la fermeture automatique après 5 secondes (seulement lors de la première ouverture)
  useEffect(() => {
    let timer;
    if (isOpen && !hasAutoClosed) {
      timer = setTimeout(() => {
        setIsOpen(false); // Fermer le chat box après 5 secondes
        setHasAutoClosed(true); // Marquer que la fermeture automatique s'est déjà produite
      }, 5000); // 5000 ms = 5 secondes
    }

    // Nettoyage du timer lorsqu'on ferme ou démonte le composant
    return () => {
      clearTimeout(timer);
    };
  }, [isOpen, hasAutoClosed]); // Ajout de `hasAutoClosed` dans les dépendances pour surveiller cet état

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message) {
      const msgData = {
        type: 'message',
        message: message, // Envoi du message utilisateur
      };
      console.log('Envoi du message:', msgData);
      
      // Ajouter le message de l'utilisateur dans la chatbox avant de l'envoyer au serveur
      setChatMessages((prevMessages) => [
        ...prevMessages,
        `client: ${message}`
      ]);
      
      ws.current.send(JSON.stringify(msgData)); // Envoyer le message sous forme de chaîne JSON
      setMessage(''); // Réinitialiser le champ de message
    }
  };

  return (
    <div className="chat-container">
      <button className="chat-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        Chat
      </button>

      {isOpen && (
        <div className="chat-box">
          <div className="chat-header">
            <h4>Chat Support</h4>
            <button className="close-btn" onClick={() => setIsOpen(false)}>X</button>
          </div>
          <div className="chat-messages">
            {chatMessages.map((msg, index) => (
              <div key={index} className="message">{msg}</div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="chat-form">
            <input className='inpout'
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tapez votre message ici..."
            />
            <button type="submit">Envoyer</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBox;


// import React, { useState, useEffect, useRef } from 'react';
// import './ChatBox.css';

// const ChatBox = () => {
//   const [message, setMessage] = useState('');
//   const [chatMessages, setChatMessages] = useState([]);
//   const [isOpen, setIsOpen] = useState(false); // Chat est fermé par défaut
//   const ws = useRef(null);

//   useEffect(() => {
//     // Connexion WebSocket
//     ws.current = new WebSocket('ws://localhost:5000');

//     ws.current.onopen = () => {
//       console.log('Connecté au serveur WebSocket');
//       setChatMessages((prevMessages) => [
//         ...prevMessages,
//         'bot: Bienvenu sur la page DUBON Service, que puis-je faire pour vous ? Je suis là pour vous aider.'
//       ]);
//     };

//     ws.current.onmessage = (event) => {
//       const newMessage = JSON.parse(event.data);
//       console.log('Message reçu du serveur:', newMessage);
//       setChatMessages((prevMessages) => [
//         ...prevMessages,
//         `${newMessage.sender}: ${newMessage.message}`
//       ]);
//     };

//     ws.current.onclose = () => {
//       console.log('Déconnecté du serveur WebSocket');
//     };

//     return () => {
//       ws.current.close();
//     };
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (message) {
//       const msgData = {
//         type: 'message',
//         message: message,
//       };
//       console.log('Envoi du message:', msgData);

//       setChatMessages((prevMessages) => [
//         ...prevMessages,
//         `client: ${message}`
//       ]);

//       ws.current.send(JSON.stringify(msgData));
//       setMessage('');
//     }
//   };

//   return (
//     <div className={`chat-container ${isOpen ? 'chat-open' : ''}`}>
//       {/* Bouton pour ouvrir le chat, visible seulement si le chat est fermé */}
//       {!isOpen && (
//         <button className="chat-toggle-btn" onClick={() => setIsOpen(true)}>
//           Chat
//         </button>
//       )}

//       {/* Boîte de chat */}
//       {isOpen && (
//         <div className="chat-box">
//           <div className="chat-header">
//             <h4>Chat Support</h4>
//             <button className="close-btn" onClick={() => setIsOpen(false)}>X</button>
//           </div>
//           <div className="chat-messages">
//             {chatMessages.map((msg, index) => (
//               <div key={index} className="message">{msg}</div>
//             ))}
//           </div>
//           <form onSubmit={handleSubmit} className="chat-form">
//             <input
//               type="text"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Tapez votre message ici..."
//             />
//             <button type="submit">Envoyer</button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatBox;
