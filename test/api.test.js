const request = require('supertest');
const app = require('../src/app'); // Pastikan app.js diekspor dengan module.exports

describe('Product API', () => {
    it('GET /products should return all products', async () => {
        const res = await request(app).get('/products');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('POST /products should create a new product', async () => {
        const res = await request(app)
            .post('/products')
            .send({ name: 'Test Product', price: 123.45 });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe('Test Product');
        expect(res.body.price).toBe(123.45);
    });
});
