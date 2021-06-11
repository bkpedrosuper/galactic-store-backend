import { EntityRepository, Repository } from "typeorm";
import { PurchasedProduct } from "../models/PurchasedProduct";

@EntityRepository(PurchasedProduct)
class PurchasedProductRepository extends Repository<PurchasedProduct> {}

export { PurchasedProductRepository };
