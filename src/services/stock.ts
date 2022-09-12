import GeneralError from "../errors/general-error";
import { originalStock, stockLevel, transaction } from "../util/types";
import { getStocks, getTransactions } from "../util/fs-utils";

class StockService {
    public async calculateStockQuantity(sku: string): Promise<stockLevel> {
        let stockLevel: stockLevel = { sku, qty: 0 };

        const originalStock: originalStock = getStocks().find(o => o.sku === sku);
        const stockTransactions: transaction[] = getTransactions().filter(o => o.sku === sku);

        if (!originalStock) {
            if (stockTransactions.length === 0)
                throw new GeneralError("SKU not found in data files");
        } else stockLevel = { sku, qty: originalStock.stock };

        stockTransactions.forEach(trscn => {
            switch (trscn.type) {
                case "order":
                    stockLevel.qty += trscn.qty;
                    break;
                case "refund":
                    stockLevel.qty -= trscn.qty;
                    break;
                default:
                    throw new GeneralError("Invalid type of transaction in data file");
            }
        });

        return stockLevel;
    }

}

export const stockService: StockService = new StockService();
export default stockService;
