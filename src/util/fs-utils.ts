import path from "path";
import { originalStock, transaction } from "./types";
import transactions from "../../db_data/transactions.json";
import stock from "../../db_data/stock.json";
import GeneralError from "../errors/general-error";
import fs from "fs";

export const getStocks = (): originalStock[] => {
    if (fs.existsSync(path.join("db_data", "stock.json"))) {
        if (!isValidJSON(stock))
            throw new GeneralError("Stocks file is not a valid JSON");
        return stock;
    } else throw new GeneralError("Stocks file not found");
};

export const getTransactions = (): transaction[] => {
    if (fs.existsSync(path.join("db_data", "stock.json"))) {
        if (!isValidJSON(transactions))
            throw new GeneralError("Transactions file is not a valid JSON");
        return transactions;
    } else throw new GeneralError("Transactions file not found");
};

/**
 * Basic validation if the data is JSON or not.
 * 
 * If it is not an Array it should be in stringify Array.
 * 
 * @param body any data to validate
 * @returns Boolean
 */
export const isValidJSON = (body: any): boolean => {
    try {
        if (!(body instanceof Array))
            body = JSON.parse(body);
        return (body instanceof Array);
    } catch (error) {
        return false;
    }
};