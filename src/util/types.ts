export declare type stockLevel = {
    sku: string; qty: number;
}

export declare type originalStock = {
    sku: string; stock: number;
}

export declare type transaction = {
    sku: string; type: string; qty: number;
}