import request from 'supertest';
import { app } from '../app';
import { getConnection } from 'typeorm';
import createConnection from '../database'

describe('Purchases', () => {

    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close();
    });


    it('Should create a purchase correctly', async () => {
        const costumer = await request(app).post('/costumers')
            .send({
                name: "Bart Mal",
                email: "bar_mal@badguys.com",
                imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4AD8Tf1zmwotZ9oaQncA7vf0F3Zfvu2r_NA&usqp=CAU"
            });

        const product = await request(app).post('/products')
            .send({
                name: "Millenium​ ​Falcon",
                imageSrc: "https://a-static.mlcdn.com.br/618x463/star-wars-mission-fleet-nave-millenium-falcon-hasbro-e9343/magazinefuturistic/5010993742561/317d48bc618e8fde89dead257defedd3.jpg",
                price: 100,
                multiple: 2,
            });

        const products_selected = [{
            product_id: product.body.id, quantity: 2, price: 90
        }];

        const response = await request(app).post('/purchase')
            .send({
                costumer_id: costumer.body.id,
                products_selected,
            });

        const { products } = response.body;

        expect(response.status).toBe(201);
        expect(Object.prototype.toString.call(products)).toBe('[object Array]');
        expect(products[0]).toBeTruthy();
        expect(products.length).toBe(1);
        expect(products[0].profitability).toBe('boa');
    });

    it('Should calculate the profitability correctly', async () => {
        const costumer = await request(app).post('/costumers')
            .send({
                name: "Han Solo",
                email: "han_solo@goodguys.com",
                imageSrc: "https://lumiere-a.akamaihd.net/v1/images/han-solo-main_a4c8ff79.jpeg?region=0%2C0%2C1920%2C1080&width=768"
            });

        const product1 = await request(app).post('/products')
            .send({
                name: "Han Solo - Action Figure",
                imageSrc: "https://lumiere-a.akamaihd.net/v1/images/han-solo-main_a4c8ff79.jpeg?region=0%2C0%2C1920%2C1080&width=768",
                price: 100,
                multiple: 2,
            });

        const product2 = await request(app).post('/products')
            .send({
                name: "Obi Wan - Action Figure",
                price: 100,
                multiple: 2,
            });

        const product3 = await request(app).post('/products')
            .send({
                name: "DL-44​ ​Heavy​ ​Blaster​ ​Pistol",
                imageSrc: null,
                price: 100,
                multiple: 10,
            });

        const products_selected = [
            { product_id: product1.body.id, quantity: 122, price: 90 },
            { product_id: product2.body.id, quantity: 34, price: 100.01 },
            { product_id: product3.body.id, quantity: 20, price: 89.99 },
        ];

        const response = await request(app).post('/purchase')
            .send({
                costumer_id: costumer.body.id,
                products_selected,
            });

        const { products } = response.body;

        expect(response.status).toBe(201);
        expect(products[0].profitability).toBe('boa');
        expect(products[1].profitability).toBe('otima');
        expect(products[2].profitability).toBe('ruim');
    }, 10000);

    it("Should be able to get all purchases", async () => {
        const response = await request(app).get('/products');
        const responseType = Object.prototype.toString.call(response.body);

        expect(responseType).toBe('[object Array]')
        expect(response.status).toBe(200);
    });

    it("Shouldn't be able to purchase a product if the quantity is not a multiple", async () => {
        const costumer = await request(app).post('/costumers')
            .send({
                name: "Darth Vader",
                email: "anakim2001@goodguys.com",
                imageSrc: "https://images-na.ssl-images-amazon.com/images/I/41i-0NH0q9L._SX328_BO1,204,203,200_.jpg"
            });

        const product = await request(app).post('/products')
            .send({
                name: "Death Star",
                imageSrc: "https://a-static.mlcdn.com.br/618x463/star-wars-mission-fleet-nave-millenium-falcon-hasbro-e9343/magazinefuturistic/5010993742561/317d48bc618e8fde89dead257defedd3.jpg",
                price: 100,
                multiple: 2,
            });

        const products_selected = [{
            product_id: product.body.id, quantity: 3, price: 90
        }];

        const response = await request(app).post('/purchase')
            .send({
                costumer_id: costumer.body.id,
                products_selected,
            });
                
        expect(response.status).toBe(401);
    });
})