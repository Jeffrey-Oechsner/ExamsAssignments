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
let GroceryImage = class GroceryImage {
    id = 0;
    image = '';
    groceries = [];
    createdAt = new Date();
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], GroceryImage.prototype, "id", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], GroceryImage.prototype, "image", void 0);
__decorate([
    ManyToMany(() => Grocery, (grocery) => grocery.images),
    __metadata("design:type", Array)
], GroceryImage.prototype, "groceries", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], GroceryImage.prototype, "createdAt", void 0);
GroceryImage = __decorate([
    Entity()
], GroceryImage);
export { GroceryImage };
