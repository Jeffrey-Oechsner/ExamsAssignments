/**
 * Simulates a database for grocery items.
 */
export const groceryDatabase = [];
/**
 * Adds a grocery item to the database.
 * @param grocery The grocery item to add.
 */
export function addGrocery(grocery) {
    groceryDatabase.push(grocery);
}
/**
 * Retrieves all grocery items from the database.
 * @returns An array of grocery items.
 */
export function getGroceries() {
    return groceryDatabase;
}
