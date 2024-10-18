import  paypal from'@paypal/checkout-server-sdk';

// Configurer l'environnement PayPal
const environment = new paypal.core.SandboxEnvironment('YOUR_CLIENT_ID', 'YOUR_CLIENT_SECRET');
const client = new paypal.core.PayPalHttpClient(environment);

// Créer une commande PayPal
const PayPalPost = async (req, res) => {
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD',
                value: '100.00' // Montant de la commande
            }
        }]
    });

    try {
        const order = await client.execute(request);
        res.json({ id: order.result.id });
    } catch (err) {
        res.status(500).send(err);
    }
};

  

export default {
    PayPalPost
}