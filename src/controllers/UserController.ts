import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';

class UserController {
    async create(req: Request, res: Response) {
        const { name, email, imageSrc = null } = req.body;

        const usersRepository = getCustomRepository(UserRepository);

        const userAlreadyExists = await usersRepository.findOne({ email });

        if (userAlreadyExists) {
            return res.status(400).json({
                error: "User already exists"
            })
        }

        const user = usersRepository.create({
            name,
            email,
            imageSrc,
        })

        await usersRepository.save(user);
        return res.status(201).json(user);
    }

    async show(req: Request, res: Response) {
        const usersRepository = getCustomRepository(UserRepository);

        const allUsers = await usersRepository.find();

        return res.status(200).json(allUsers);
    }
}

export { UserController };