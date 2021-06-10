import request from 'supertest';
import { app } from '../app';
import { getConnection } from 'typeorm';
import createConnection from '../database'

describe('Users', () => {

    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close();
    });


    it('Should create a user correctly', async () => {
        const response = await request(app).post('/users')
            .send({
                name: "Han Solo",
                email: "han_solo@goodguys.com",
                imageSrc: "https://lumiere-a.akamaihd.net/v1/images/han-solo-main_a4c8ff79.jpeg?region=0%2C0%2C1920%2C1080&width=768"
            });

        expect(response.status).toBe(201);
    });

    it('Should not allow two users with the same email', async () => {
        const response = await request(app).post('/users')
            .send({
                name: "Guest User",
                email: "han_solo@goodguys.com",
                imageSrc: "https://lumiere-a.akamaihd.net/v1/images/han-solo-main_a4c8ff79.jpeg?region=0%2C0%2C1920%2C1080&width=768"
            });

        expect(response.status).toBe(400);
    });

    it("Should be able to get all users", async () => {
        const response = await request(app).get('/users');
        const responseType = Object.prototype.toString.call(response.body);

        expect(responseType).toBe('[object Array]')
        expect(response.status).toBe(200);
    });
})