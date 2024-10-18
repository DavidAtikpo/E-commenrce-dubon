import request from'supertest';
import app from'../app';
import User from'../models/User';

describe('User Service', () => {
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

    test('should get user profile', async () => {
        const res = await request(app)
            .get('/api/users/profile')
            .set('Authorization', `Bearer ${userToken}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('email', 'user@example.com');
    });

    test('should update user profile', async () => {
        const res = await request(app)
            .put('/api/users/profile')
            .set('Authorization', `Bearer ${userToken}`)
            .send({
                name: 'Updated User',
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('name', 'Updated User');
    });
});
