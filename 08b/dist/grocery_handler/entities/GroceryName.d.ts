import { Grocery } from './Grocery.js';
export declare class GroceryName {
    id?: number;
    name: string;
    groceries: Grocery[];
    createdAt: Date;
    constructor(name: string);
}
