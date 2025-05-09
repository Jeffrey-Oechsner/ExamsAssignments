import { GroceryName } from './GroceryName.js';
import { GroceryImage } from './GroceryImage.js';
import { Category } from './Category.js';
import { Price } from './Price.js';
import { Description } from './Description.js';
import { Deleted_Grocery } from './Deleted_Grocery.js';
import { Amount } from './Amount.js';
export declare class Grocery {
    id: number;
    createdAt: Date;
    version: number;
    names: GroceryName[];
    images: GroceryImage[];
    categories: Category[];
    prices: Price[];
    descriptions: Description[];
    deletedGroceries: Deleted_Grocery[];
    amounts: Amount[];
    constructor(id: number, name: string, price: number);
}
