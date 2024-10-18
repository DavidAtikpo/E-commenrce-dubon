import Joi from'joi';

// Schéma de validation pour la mise à jour des informations utilisateur
const updateUserSchema = Joi.object({
    name: Joi.string().min(3).max(30).optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).optional(),
});

// Middleware de validation pour la mise à jour des informations utilisateur
exports.validateUpdateUser = (req, res, next) => {
    const { error } = updateUserSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};
