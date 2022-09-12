import { stockService } from "./src/services/stock";
import { getStocks } from "./src/util/fs-utils";


(async () => {
    for (const stock of getStocks()) {
        console.log(await stockService.calculateStockQuantity(stock.sku));
    }
})();