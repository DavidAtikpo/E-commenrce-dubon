// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { API_URL } from '../config';

// const StarRating = ({ rating, onRate }) => {
//   return (
//     <div>
//       {[1, 2, 3, 4, 5].map((star) => (
//         <span
//           key={star}
//           style={{
//             cursor: 'pointer',
//             color: star <= rating ? '#ffc107' : '#e4e5e9',
//             fontSize: '1.5em',
//           }}
//           onClick={() => onRate(star)}
//         >
//           ★
//         </span>
//       ))}
//     </div>
//   );
// };

// const ProductRating = ({ productId }) => {
//   const [rating, setRating] = useState(1); // Pour la note actuelle de l'utilisateur
//   const [comment, setComment] = useState('');
//   const [ratings, setRatings] = useState([]);
//   const [averageRating, setAverageRating] = useState(0);

//   const fetchRatings = useCallback(async () => {
//     try {
//       const response = await axios.get(`${API_URL}/api/ratings/${productId}`);
//       setRatings(response.data.ratings);

//       // Calculer la note moyenne
//       const avg = response.data.ratings.reduce((acc, r) => acc + r.rating, 0) / response.data.ratings.length;
//       setAverageRating(avg || 0);
//     } catch (error) {
//       console.error('Erreur lors de la récupération des évaluations', error);
//     }
//   }, [productId]);

//   useEffect(() => {
//     fetchRatings();
//   }, [fetchRatings]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       const token = localStorage.getItem('token');
//       console.log("token", token);
      
//       await axios.post(`${API_URL}/api/ratings`, {
//         productId,
//         rating,
//         comment,
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`, // Envoyer le token dans les en-têtes
//         }
//       });

//       setComment('');
//       setRating(1);
//       fetchRatings(); // Rafraîchir les évaluations après la soumission
//     } catch (error) {
//       console.error('Erreur lors de la soumission de l\'évaluation', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Évaluation du produit</h2>
//       <p>Note moyenne: {averageRating.toFixed(1)} ⭐</p>
//       <StarRating rating={averageRating} onRate={() => {}} /> {/* Afficher la note moyenne avec des étoiles */}

//       <form onSubmit={handleSubmit}>
//         <label>
//           Note:
//           <StarRating rating={rating} onRate={setRating} /> {/* Sélection d'étoiles */}
//         </label>
//         <br />
//         <label>
//           Commentaire:
//           <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
//         </label>
//         <br />
//         <button type="submit">Soumettre l'évaluation</button>
//       </form>

//       <h3>Évaluations existantes</h3>
//       <ul>
//         {ratings.map((r) => (
//           <li key={r._id}>
//             <strong>{r.rating} ⭐</strong> - {r.comment}
//             <StarRating rating={r.rating} onRate={() => {}} /> {/* Afficher les étoiles pour chaque note */}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProductRating;


import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

// Composant pour afficher les étoiles
const StarRating = ({ rating }) => {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            color: star <= rating ? '#ffc107' : '#e4e5e9',
            fontSize: '1.5em',
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const ProductRating = ({ productId }) => {
  const [ratings, setRatings] = useState([]); // Liste des évaluations
  const [averageRating, setAverageRating] = useState(0); // Note moyenne

  // Fonction pour récupérer les avis sur le produit
  const fetchRatings = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/api/ratings/${productId}`);
      setRatings(response.data.ratings);

      // Calcul de la note moyenne
      const avg = response.data.ratings.reduce((acc, r) => acc + r.rating, 0) / response.data.ratings.length;
      setAverageRating(avg || 0);
    } catch (error) {
      console.error('Erreur lors de la récupération des évaluations', error);
    }
  }, [productId]);

  useEffect(() => {
    fetchRatings();
  }, [fetchRatings]);

  return (
    <div>
      <h2>Évaluation du produit</h2>
      {/* Affichage de la note moyenne et du nombre total d'avis */}
      <p>Note moyenne: {averageRating.toFixed(1)} ⭐ ({ratings.length} avis clients)</p>
      <StarRating rating={averageRating} />

      {/* Affichage des évaluations des utilisateurs */}
      <h3>Évaluations des clients</h3>
      <ul>
        {ratings.map((r) => (
          <li key={r._id} style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={r.user?.profilePicture || '/default-profile.png'} // Affiche l'image de profil ou une image par défaut
                alt={`${r.user?.name || 'Utilisateur'}'s profile`}
                style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }}
              />
              <div>
                <strong>{r.user?.name || 'Utilisateur anonyme'}</strong> {/* Nom de l'utilisateur */}
                <StarRating rating={r.rating} /> {/* Note donnée */}
              </div>
            </div>
            <p>{r.comment}</p> {/* Commentaire de l'utilisateur */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductRating;
