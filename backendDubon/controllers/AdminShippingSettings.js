import ShippingRule from '../models/ShippingRule.js';


// Obtenir les règles de livraison actuelles
const getShippingRules = async (req, res) => {
  const rules = await ShippingRule.findOne();
  res.json(rules);
};

// Mettre à jour les règles de livraison (route d'admin)
const postShippingRules = async (req, res) => {
  const { type, fixedFee, distanceRates, weightRates, freeShippingThreshold } = req.body;

  // Met à jour ou crée une nouvelle règle
  let rules = await ShippingRule.findOne();
  if (!rules) {
    rules = new ShippingRule();
  }

  rules.type = type;
  rules.fixedFee = fixedFee;
  rules.distanceRates = distanceRates;
  rules.weightRates = weightRates;
  rules.freeShippingThreshold = freeShippingThreshold;

  await rules.save();
  res.json({ message: 'Règles de livraison mises à jour' });
};

export default {
    postShippingRules,getShippingRules
}
