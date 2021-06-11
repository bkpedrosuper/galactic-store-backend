import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { PurchaseRepository } from '../repositories/PurchaseRepository';
import { PurchasedProductRepository } from '../repositories/PurchasedProductsRepository';

class PurchaseController {

    async create(req: Request, res: Response) {
        const { costumer_id, products } = req.body;

        
    }

    async show(req: Request, res: Response) {
        

        return res.status(200);
    }
}

export { PurchaseController };