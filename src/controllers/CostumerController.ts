import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { CostumerRepository } from '../repositories/CostumerRepository';

class CostumerController {
    async create(req: Request, res: Response) {
        const { name, email, imageSrc = null } = req.body;

        const costumersRepository = getCustomRepository(CostumerRepository);

        const costumerAlreadyExists = await costumersRepository.findOne({ email });

        if (costumerAlreadyExists) {
            return res.status(400).json({
                error: "Costumer already exists"
            })
        }

        const costumer = costumersRepository.create({
            name,
            email,
            imageSrc,
        })

        await costumersRepository.save(costumer);
        return res.status(201).json(costumer);
    }

    async show(req: Request, res: Response) {
        const costumersRepository = getCustomRepository(CostumerRepository);

        const allCostumers = await costumersRepository.find();

        return res.status(200).json(allCostumers);
    }
}

export { CostumerController };