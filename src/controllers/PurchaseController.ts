import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { PurchaseRepository } from '../repositories/PurchaseRepository';
import { ProductRepository } from '../repositories/ProductRepository';
import { PurchasedProductRepository } from '../repositories/PurchasedProductsRepository';

class PurchaseController {

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

        if(!products_selected.length) {
            return res.status(400).json({
                error: 'It must have at least a product to create a purchase'                
            });
        }

        for (const product_selected of products_selected) {
            const {product_id, quantity, price} = product_selected;

            const product = await productRepository.findOne({id: product_id});

            // FAZER TESTE PARA OS MÚLTIPLOS AQUI
            if(product.multiple && quantity%product.multiple!=0) {
                return res.status(401).json({
                    error: `Cannot purchase ${quantity} samples of this product. Must be multiple of ${product.multiple}`,
                    product_id: product.id,
                    product_name: product.name,
                });
            }

            if(!quantity) {
                return res.status(401).json({
                    error: `Cannot purchase a product with empty quantity`
                });
            }

            const newProductPurchased = purchasedProductRepository.create({
                product_id: product.id,
                name: product.name,
                imageSrc: product.imageSrc,
                originalPrice: product.price,
                price,
                quantity,
                profitability: purchasedProductRepository.calculateProfitability(product.price, price)
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
        
        const allPurchases = await purchaseRepository.find({
            relations: ['costumer']
        });

        return res.status(200).json(allPurchases);
    }

    async getOne(req: Request, res: Response) {
        const {id} = req.params;
        const purchaseRepository = getCustomRepository(PurchaseRepository);
        
        const purchase = await purchaseRepository.findOne({
            where: {
                id,
            },
            relations: ['costumer', 'products']
        });

        return res.status(200).json(purchase);
    }
}

export { PurchaseController };