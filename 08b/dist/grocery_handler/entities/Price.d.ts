import { Grocery } from './Grocery.js';
export declare class Price {
    id?: number;
    price: number;
    createdAt: Date;
    groceries: Grocery[];
    constructor(price: number);
}
