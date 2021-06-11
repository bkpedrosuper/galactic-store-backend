import { Router,Request, Response } from 'express'
import { CostumerController } from './controllers/CostumerController';
import { ProductController } from './controllers/ProductController';

const router = Router();

const costumerController = new CostumerController();
const productController = new ProductController();

router.post('/costumers', costumerController.create);
router.get('/costumers', costumerController.show);

router.post('/products', productController.create);
router.get('/products', productController.show);

router.get("/", (request: Request, response: Response) => {
    return response.json({
        message: "Route created successfully"
    })
})

export { router }