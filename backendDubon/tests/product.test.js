import request from'supertest';
import app from'../app';
import Product from'../models/Product';

describe('Product Service', () => {
    afterEach(async () => {
        await Product.deleteMany();
    });

    test('should create a product', async () => {
        const res = await request(app)
            .post('/api/products')
            .send({
                title: 'New Product',
                slug: 'new-product',
                description: 'Description of the product',
                price: 50,
                category: 'Category',
                brand: 'Brand',
                quantity: 100,
                color: 'Red',
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('title', 'New Product');
    });

    test('should update a product', async () => {
        const product = await Product.create({
            title: 'Existing Product',
            slug: 'existing-product',
            description: 'Description of the product',
            price: 50,
            category: 'Category',
            brand: 'Brand',
            quantity: 100,
            color: 'Red',
        });

        const res = await request(app)
            .put(`/api/products/${product._id}`)
            .send({
                title: 'Updated Product',
                price: 60,
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('title', 'Updated Product');
        expect(res.body).toHaveProperty('price', 60);
    });

    test('should delete a product', async () => {
        const product = await Product.create({
            title: 'Product to Delete',
            slug: 'product-to-delete',
            description: 'Description of the product',
            price: 50,
            category: 'Category',
            brand: 'Brand',
            quantity: 100,
            color: 'Red',
        });

        const res = await request(app)
            .delete(`/api/products/${product._id}`);

        expect(res.statusCode).toEqual(200);
    });
});
