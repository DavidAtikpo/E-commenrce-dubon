import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;

  // Vérifiez si le token est présent dans les en-têtes
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    console.log("Token reçu :", token);

    try {
      if (token) {
        // Vérifiez et décodez le token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Récupérez l'utilisateur en fonction de l'ID décodé
        const user = await User.findById(decoded.id);
        
        // Vérifiez si l'utilisateur existe
        if (!user) {
          return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        // Attachez l'utilisateur à la requête
        req.user = user;
        next(); // Passez à la suite du traitement
      }
    } catch (error) {
      // Gestion des erreurs de token
      if (error.name === 'TokenExpiredError') {
        console.error("Erreur lors de la vérification du token :", error);
        return res.status(401).json({ message: "Token expiré, veuillez vous reconnecter" });
      } else {
        console.error("Erreur lors de la vérification du token :", error);
        return res.status(401).json({ message: "Token invalide, veuillez vous reconnecter" });
      }
    }
  } else {
    return res.status(401).json({ message: "Aucun token fourni" });
  }
});





// authorization by admin
const isAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email }); // Use findOne instead of find

  if (!adminUser || adminUser.role !== 'admin') {
    // Check if adminUser is not found or role is not admin
    throw new Error("You are not an admin");
  } else {
    next();
  }
});


export default{authMiddleware,isAdmin}