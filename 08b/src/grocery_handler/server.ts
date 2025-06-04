// TypeDoc integration: The integration happens at every JSDoc-style comment (/** ... */) above exported endpoints, classes, and functions.
// For example, the following endpoint is documented and picked up by TypeDoc:

import express, { Router, Request, Response } from "express";
import { addGrocery, getGroceries } from "./data-source.js";
import { Grocery } from "./entities/Grocery.js";
import { GroceryName } from "./entities/GroceryName.js";
import { Price } from "./entities/Price.js";

const app = express();
const router = Router();
app.use(express.json());

/**
 * Endpoint to add a new grocery item.
 */
// her sker integration - TypeDoc læser denne JSDoc-kommentar for at generere dokumentation
router.post("/groceries", (req: any, res: any) => {
    const { id, name, price } = req.body;
    const grocery = new Grocery(id, name, price);
    addGrocery(grocery);
    res.status(201).send(grocery);
});

/**
 * Endpoint to retrieve all grocery items.
 */
// her sker integration - TypeDoc læser denne JSDoc-kommentar for at generere dokumentation
router.get("/groceries", (req: any, res: any) => {
    res.send(getGroceries());
});

/**
 * Endpoint to update a grocery item by ID.
 */
// her sker integration - TypeDoc læser denne JSDoc-kommentar for at generere dokumentation
router.put("/groceries/:id", (req: any, res: any) => {
    const { id } = req.params;
    const { name, price } = req.body;
    const groceries = getGroceries();
    const grocery = groceries.find((g) => g.id === parseInt(id));
    if (!grocery) {
        return res.status(404).send({ message: "Grocery not found" });
    }
    if (name) {
        grocery.names = [new GroceryName(name)];
    }
    if (price) {
        grocery.prices = [new Price(price)];
    }
    res.send(grocery);
});

/**
 * Endpoint to delete a grocery item by ID.
 */
// her sker integration - TypeDoc læser denne JSDoc-kommentar for at generere dokumentation
router.delete("/groceries/:id", (req: any, res: any, next: any) => {
    try {
        const { id } = req.params;
        const groceries = getGroceries();
        const index = groceries.findIndex((g) => g.id === parseInt(id));
        if (index === -1) {
            return res.status(404).send({ message: "Grocery not found" });
        }
        groceries.splice(index, 1);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

app.use(router);

const PORT = 3005;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});