import { describe, expect, test } from "@jest/globals";
import { stockLevel } from "../../src/util/types";
import GeneralError from "../../src/errors/general-error";
import * as fsUtils from "../../src/util/fs-utils";
import { stockService } from "../../src/services/stock";

/**
 * we should use different files for test env
 * But as this was just a test no en configuration have made
 * I am assuming that the data is there in files and testing the functionality accordingly
 */
describe("Test Cases for calculateStockQuantity function of Stock service", () => {
    test("Should return stocks level if correct sku is passed", async () => {
        const data: stockLevel = await stockService
            .calculateStockQuantity("LTV719449/39/39");
        expect(typeof data.sku).toBe("string");
        expect(typeof data.qty).toBe("number");
    });

    test("Should throw error if sku not found in data files", async () => {
        await expect(stockService.calculateStockQuantity("Test SKU"))
            .rejects
            .toThrowError(GeneralError);
        await expect(stockService.calculateStockQuantity("Test SKU"))
            .rejects
            .toThrowError("SKU not found in data files");
    });

    test("Should consider default qty 0 if stock not found in stock file", async () => {
        const mock = jest.spyOn(fsUtils, "getStocks");  // spy on getStocks
        mock.mockImplementation(() => []);
        const data = await stockService.calculateStockQuantity("LTV719449/39/39");
        expect(typeof data.sku).toBe("string");
        expect(typeof data.qty).toBe("number");
        mock.mockReset();
        mock.mockRestore();
    });
});