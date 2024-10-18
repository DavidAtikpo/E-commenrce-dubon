import request from'supertest';
import app from'../app';
import Order from'../models/Order';
import User from'../models/User';

describe('Order Service', () => {
    let userToken;
    
    beforeAll(async () => {
        const user = await User.create({
            name: 'Test User',
            email: 'user@example.com',
            password: 'password123',
        });

        const res = await request(app)
            .post('/api/auth/login')
            .send({ email: user.email, password: 'password123' });

        userToken = res.body.token;
    });

    afterEach(async () => {
        await Order.deleteMany();
    });

    test('should create an order', async () => {
        const res = await request(app)
            .post('/api/orders')
            .set('Authorization', `Bearer ${userToken}`)
            .send({
                items: [
                    { product: 'product1', quantity: 2 },
                    { product: 'product2', quantity: 1 },
                ],
                totalPrice: 100,
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
    });

    test('should get user orders', async () => {
        await Order.create({
            user: 'userId',
            items: [{ product: 'product1', quantity: 2 }],
            totalPrice: 100,
        });

        const res = await request(app)
            .get('/api/orders')
            .set('Authorization', `Bearer ${userToken}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
});
