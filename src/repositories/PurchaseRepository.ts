import { EntityRepository, Repository } from "typeorm";
import { Purchase } from "../models/Purchase";

@EntityRepository(Purchase)
class PurchaseRepository extends Repository<Purchase> {}

export { PurchaseRepository };
