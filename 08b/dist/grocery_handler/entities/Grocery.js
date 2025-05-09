var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable, Column } from 'typeorm';
import { GroceryName } from './GroceryName.js';
import { GroceryImage } from './GroceryImage.js';
import { Category } from './Category.js';
import { Price } from './Price.js';
import { Description } from './Description.js';
import { Deleted_Grocery } from './Deleted_Grocery.js';
import { Amount } from './Amount.js';
let Grocery = class Grocery {
    id;
    createdAt = new Date();
    version = 1;
    names = [];
    images = [];
    categories = [];
    prices = [];
    descriptions = [];
    deletedGroceries = [];
    amounts = [];
    constructor(id, name, price) {
        this.id = id;
        this.names = [{ name }];
        this.prices = [{ price }];
    }
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Grocery.prototype, "id", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Grocery.prototype, "createdAt", void 0);
__decorate([
    Column({ type: 'int', default: 1 }),
    __metadata("design:type", Number)
], Grocery.prototype, "version", void 0);
__decorate([
    ManyToMany(() => GroceryName, (name) => name.groceries, { cascade: true }),
    JoinTable(),
    __metadata("design:type", Array)
], Grocery.prototype, "names", void 0);
__decorate([
    ManyToMany(() => GroceryImage, (image) => image.groceries, { cascade: true }),
    JoinTable(),
    __metadata("design:type", Array)
], Grocery.prototype, "images", void 0);
__decorate([
    ManyToMany(() => Category, (category) => category.groceries, { cascade: true }),
    JoinTable(),
    __metadata("design:type", Array)
], Grocery.prototype, "categories", void 0);
__decorate([
    ManyToMany(() => Price, (price) => price.groceries, { cascade: true }),
    JoinTable(),
    __metadata("design:type", Array)
], Grocery.prototype, "prices", void 0);
__decorate([
    ManyToMany(() => Description, (description) => description.groceries, { cascade: true }),
    JoinTable(),
    __metadata("design:type", Array)
], Grocery.prototype, "descriptions", void 0);
__decorate([
    ManyToMany(() => Deleted_Grocery, (deleted) => deleted.groceries, { cascade: true }),
    JoinTable(),
    __metadata("design:type", Array)
], Grocery.prototype, "deletedGroceries", void 0);
__decorate([
    ManyToMany(() => Amount, (amount) => amount.groceries, { cascade: true }),
    JoinTable(),
    __metadata("design:type", Array)
], Grocery.prototype, "amounts", void 0);
Grocery = __decorate([
    Entity(),
    __metadata("design:paramtypes", [Number, String, Number])
], Grocery);
export { Grocery };
