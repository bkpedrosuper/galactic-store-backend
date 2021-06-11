import { EntityRepository, Repository } from "typeorm";
import { PurchasedProduct } from "../models/PurchasedProduct";

@EntityRepository(PurchasedProduct)
class PurchasedProductRepository extends Repository<PurchasedProduct> {
    calculateProfitability(productOriginalCost, productBuyoutPrice) {
        // ÓTIMA quando o preço usado no pedido é maior que o preço do produto
        if(productBuyoutPrice > productOriginalCost) {
            return 'otima';
        }
        // BOA quando o preço do item é no máximo 10% menor que o preço do produto
        else if(productBuyoutPrice >= (productOriginalCost * 0.9)) {
            return 'boa';
        }
        // RUIM quando o preço do item é inferior ao preço do produto menos 10%.
        return 'ruim';
    }
}

export { PurchasedProductRepository };
