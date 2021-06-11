import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../repositories/ProductRepository';

class ProductController {
    async create(req: Request, res: Response) {
        const { name, imageSrc = null, multiple = null, price } = req.body;

        const productsRepository = getCustomRepository(ProductRepository);

        const product = productsRepository.create({
            name,
            imageSrc,
            multiple,
            price
        })

        await productsRepository.save(product);
        return res.status(201).json(product);
    }

    async show(req: Request, res: Response) {
        const productsRepository = getCustomRepository(ProductRepository);

        const products = await productsRepository.find();

        return res.status(200).json(products);
    }
}

export { ProductController };