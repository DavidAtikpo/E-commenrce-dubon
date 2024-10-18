import Joi from'joi';

// Schéma de validation pour la création et mise à jour de produit
const productSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).required(),
    price: Joi.number().min(0).required(),
    category: Joi.string().required(),
    brand: Joi.string().required(),
    quantity: Joi.number().min(0).required(),
    color: Joi.string().required(),
    images: Joi.array().items(Joi.string().uri()).required(),
    tags: Joi.array().items(Joi.string()).optional(),
});

// Middleware de validation pour la création ou la mise à jour de produit
exports.validateProduct = (req, res, next) => {
    const { error } = productSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};
