import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { PurchaseRepository } from '../repositories/PurchaseRepository';
import { ProductRepository } from '../repositories/ProductRepository';
import { PurchasedProductRepository } from '../repositories/PurchasedProductsRepository';

class PurchaseController {

    calculateProfitability(productOriginalCost, productBuyoutPrice) {
        // ÓTIMA quando o preço usado no pedido é maior que o preço do produto
        if(productBuyoutPrice > productOriginalCost) {
            return 'otima';
        }
        // BOA quando o preço do item é no máximo 10% menor que o preço do produto
        else if((productOriginalCost * 0.9) >= productBuyoutPrice) {
            return 'boa';
        }
        // RUIM quando o preço do item é inferior ao preço do produto menos 10%.
        return 'ruim';
    }

    async create(req: Request, res: Response) {
        const { costumer_id, products_selected  } = req.body;
        const products = [];
        const productRepository = getCustomRepository(ProductRepository);
        const purchasedProductRepository = getCustomRepository(PurchasedProductRepository);
        const purchaseRepository = getCustomRepository(PurchaseRepository);

        if(Object.prototype.toString.call(products_selected) !== '[object Array]') {
            return res.status(400).json({
                error: 'field products_selected must be an array'                
            });
        }

        for (const product_selected of products_selected) {
            const {product_id, quantity, price} = product_selected;

            const product = await productRepository.findOne({id: product_id});

            const newProductPurchased = purchasedProductRepository.create({
                product_id: product.id,
                quantity,
                price,
                profitability: this.calculateProfitability(product.price, price)
            });

            await purchasedProductRepository.save(newProductPurchased);

            products.push(newProductPurchased);
        }

        const purchase = purchaseRepository.create({
            costumer_id, products
        });

        await purchaseRepository.save(purchase);

        return res.status(201).json(purchase);
    }

    async show(req: Request, res: Response) {
        const purchaseRepository = getCustomRepository(PurchaseRepository);
        
        const allPurchases = await purchaseRepository.find();

        return res.status(200).json(allPurchases);
    }
}

export { PurchaseController };