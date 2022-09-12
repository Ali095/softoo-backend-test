# Backend technical test

You are given two json files:
 - stock.json: contains objects which represent the starting stock levels for given SKUS
 - transactions.json: contains an array of transactions since the stock levels were recorded in `stock.json`
The objective is to create a function which is able to return the current stock levels for a given SKU by combining the data in these two files. These are the requirements.
- The function must match the following signature: `(sku: string) => Promise<{ sku: string, qty: number }>`.
- The function must read from the `stock` and `transactions` files on each invocation (totals cannot be precomputed)
- The function must throw an error where the SKU does not exist in the `transactions.json` and `stock.json` file
- All code must be adequately tested
Notes:
- Transactions may exist for SKUs which are not present in `stock.json`. It should be assumed that the starting quantity for these is 0.
- Functionality can be split into many files to help keep the project clear and organised 

## Instructions to Run the code

To run the code do the following:
- Clone the repository and run `npm i` in terminal.
- Run `npm start` to start and run the `entry-point.ts` script
    - The code will be compiled and translated in js in newly created folder called `dist` and then it will console all the SKUs with thier quantity in console.
- To run the unit tests you need to run command `npm test`
    - The unit tests will get execute
- The function is present in `src/services/stock` file.

## Assumptions

To code has following Assumptions:
- The data files should be with same name and in `db_data` folder.
- Some of the Unit tests are dependent on diles data. As we need to test the functionality we should use different files and data for test as per need but due to small task different environments are not configured.
- The in-depth validation is not performed on data files as assumed if the data is array type it should have correct data.
