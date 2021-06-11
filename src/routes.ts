import { Router,Request, Response } from 'express'
import { CostumerController } from './controllers/CostumerController';

const router = Router();

const costumerController = new CostumerController();

router.post('/costumers', costumerController.create);
router.get('/costumers', costumerController.show);

router.get("/", (request: Request, response: Response) => {
    return response.json({
        message: "Route created successfully"
    })
})

export { router }