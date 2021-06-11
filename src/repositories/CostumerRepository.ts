import { EntityRepository, Repository } from "typeorm";
import { Costumer } from "../models/Costumer";

@EntityRepository(Costumer)
class CostumerRepository extends Repository<Costumer> {}

export { CostumerRepository };
