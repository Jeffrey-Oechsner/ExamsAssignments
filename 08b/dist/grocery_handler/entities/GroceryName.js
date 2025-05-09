var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, CreateDateColumn } from 'typeorm';
import { Grocery } from './Grocery.js';
let GroceryName = class GroceryName {
    constructor(name) {
        this.groceries = [];
        this.createdAt = new Date();
        this.name = name;
    }
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], GroceryName.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], GroceryName.prototype, "name", void 0);
__decorate([
    ManyToMany(() => Grocery, (grocery) => grocery.names),
    __metadata("design:type", Array)
], GroceryName.prototype, "groceries", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], GroceryName.prototype, "createdAt", void 0);
GroceryName = __decorate([
    Entity(),
    __metadata("design:paramtypes", [String])
], GroceryName);
export { GroceryName };
