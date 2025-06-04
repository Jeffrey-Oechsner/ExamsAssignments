// Represents the data source for grocery items.
import { Grocery } from "./entities/Grocery.js";

/**
 * Simulates a database for grocery items.
 */
// her sker integration - TypeDoc læser denne JSDoc-kommentar for at generere dokumentation
export const groceryDatabase: Grocery[] = [];

/**
 * Adds a grocery item to the database.
 * @param grocery The grocery item to add.
 */
// her sker integration - TypeDoc læser denne JSDoc-kommentar for at generere dokumentation
export function addGrocery(grocery: Grocery): void {
    groceryDatabase.push(grocery);
}

/**
 * Retrieves all grocery items from the database.
 * @returns An array of grocery items.
 */
// her sker integration - TypeDoc læser denne JSDoc-kommentar for at generere dokumentation
export function getGroceries(): Grocery[] {
    return groceryDatabase;
}