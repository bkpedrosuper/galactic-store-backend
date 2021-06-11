import request from 'supertest';
import { app } from '../app';
import { getConnection } from 'typeorm';
import createConnection from '../database'

describe('Products', () => {

    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close();
    });


    it('Should create a product correctly', async () => {
        const response = await request(app).post('/products')
            .send({
                name: "Han Solo - Action Figure",
                imageSrc: "https://lumiere-a.akamaihd.net/v1/images/han-solo-main_a4c8ff79.jpeg?region=0%2C0%2C1920%2C1080&width=768",
                price: 33.33,
                multiple: 2,
            });

        expect(response.status).toBe(201);
    });

    it("Should be able to get all products", async () => {
        const response = await request(app).get('/products');
        const responseType = Object.prototype.toString.call(response.body);

        expect(responseType).toBe('[object Array]')
        expect(response.status).toBe(200);
    });
})