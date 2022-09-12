import { describe, expect, test } from "@jest/globals";
import fs from "fs";
import { getStocks, getTransactions, isValidJSON } from "../../src/util/fs-utils";
import { originalStock, transaction } from "../../src/util/types";
import GeneralError from "../../src/errors/general-error";
import * as fsUtils from "../../src/util/fs-utils";

describe("Test Cases for getStocks function", () => {
    // Should not mock so that if file is missing the test should fail
    test("Should return stocks if data exists and valid", () => {
        const data: originalStock[] = getStocks();
        expect(data).toBeInstanceOf(Array);
        data.forEach(o => {
            expect(typeof o.sku).toBe("string");
            expect(typeof o.stock).toBe("number");
        });
    });

    test("Should throw error if data file not found", () => {
        const mock = jest.spyOn(fs, "existsSync");  // spy on existsSync
        mock.mockImplementation((path: fs.PathLike) => false);
        expect(getStocks).toThrowError(GeneralError);
        expect(getStocks).toThrowError("Stocks file not found");
        mock.mockReset();
        mock.mockRestore();
    });

    test("Should throw error if data file is not valid JSON", () => {
        const mock = jest.spyOn(fsUtils, "isValidJSON");  // spy on isValidJSON
        mock.mockImplementation((body: any) => false);
        expect(getStocks).toThrowError(GeneralError);
        expect(getStocks).toThrowError("Stocks file is not a valid JSON");
        mock.mockReset();
        mock.mockRestore();
    });
});

describe("Test Cases for getTransactions function", () => {
    // Should not mock so that if file is missing the test should fail
    test("Should return transactions if data exists and valid", () => {
        const data: transaction[] = getTransactions();
        expect(data).toBeInstanceOf(Array);
        data.forEach(o => {
            expect(typeof o.sku).toBe("string");
            expect(typeof o.type).toBe("string");
            expect(typeof o.qty).toBe("number");
        });
    });

    test("Should throw error if transactions data file not found", () => {
        const mock = jest.spyOn(fs, "existsSync");  // spy on existsSync
        mock.mockImplementation((path: fs.PathLike) => false);
        expect(getTransactions).toThrowError(GeneralError);
        expect(getTransactions).toThrowError("Transactions file not found");
        mock.mockReset();
        mock.mockRestore();
    });

    test("Should throw error if transactions data file is not valid JSON", () => {
        const mock = jest.spyOn(fsUtils, "isValidJSON");  // spy on isValidJSON
        mock.mockImplementation((body: any) => false);
        expect(getTransactions).toThrowError(GeneralError);
        expect(getTransactions).toThrowError("Transactions file is not a valid JSON");
        mock.mockReset();
        mock.mockRestore();
    });
});

describe("Test Cases for isValidJSON function", () => {
    test("Should return true if valid JSON string which contains Array is passed", () => {
        const data = JSON.stringify([{ sku: "abc", stock: 190 }]);
        expect(isValidJSON(data)).toBeTruthy();
    });

    test("Should return false if invalid JSON string which does not contains Array is passed", () => {
        const data = JSON.stringify({ sku: "abc", stock: 190 });
        expect(isValidJSON(data)).toBeFalsy();
    });

    test("Should return true if Array is passed", () => {
        const data = [{ sku: "abc", stock: 190 }];
        expect(isValidJSON(data)).toBeTruthy();
    });
});