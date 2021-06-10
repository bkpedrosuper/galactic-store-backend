import { Router,Request, Response } from 'express'
import { UserController } from './controllers/UserController';

const router = Router();

const userController = new UserController();

router.post('/users', userController.create);
router.get('/users', userController.show);

router.get("/", (request: Request, response: Response) => {
    return response.json({
        message: "Route created successfully"
    })
})

export { router }