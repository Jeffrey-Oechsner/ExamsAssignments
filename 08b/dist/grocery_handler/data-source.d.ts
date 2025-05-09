import { Grocery } from "./entities/Grocery.js";
/**
 * Simulates a database for grocery items.
 */
export declare const groceryDatabase: Grocery[];
/**
 * Adds a grocery item to the database.
 * @param grocery The grocery item to add.
 */
export declare function addGrocery(grocery: Grocery): void;
/**
 * Retrieves all grocery items from the database.
 * @returns An array of grocery items.
 */
export declare function getGroceries(): Grocery[];
