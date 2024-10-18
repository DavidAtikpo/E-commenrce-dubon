import request from'supertest';
import app from'../app';  // L'application Express
import User from'../models/User';

describe('Auth Service', () => {
    beforeEach(async () => {
        await User.deleteMany();  // Nettoyer la base de données avant chaque test
    });

    test('should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123',
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('token');
    });

    test('should not register user if email already exists', async () => {
        await User.create({
            name: 'Existing User',
            email: 'test@example.com',
            password: 'password123',
        });

        const res = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'New User',
                email: 'test@example.com',
                password: 'password123',
            });

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toBe('User already exists');
    });

    test('should login with valid credentials', async () => {
        const user = await User.create({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
        });

        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: user.email,
                password: 'password123',
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    test('should not login with invalid credentials', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'invalid@example.com',
                password: 'wrongpassword',
            });

        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toBe('Invalid email or password');
    });
});
