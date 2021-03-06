import { Router,Request, Response } from 'express'
import { CostumerController } from './controllers/CostumerController';
import { ProductController } from './controllers/ProductController';
import { PurchaseController } from './controllers/PurchaseController';

const router = Router();

const costumerController = new CostumerController();
const productController = new ProductController();
const purchaseController = new PurchaseController();

router.post('/costumers', costumerController.create);
router.get('/costumers', costumerController.show);
router.get('/costumers/:costumer_id', costumerController.getOne);

router.post('/products', productController.create);
router.get('/products', productController.show);

router.post('/purchase', purchaseController.create);
router.get('/purchases', purchaseController.show);
router.get('/purchases/:id', purchaseController.getOne);

router.get("/", (request: Request, response: Response) => {
    return response.json({
        message: "Route created successfully"
    })
})

export { router }