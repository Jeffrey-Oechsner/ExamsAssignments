var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany } from 'typeorm';
import { Grocery } from './Grocery.js';
let Price = class Price {
    id;
    price;
    createdAt = new Date();
    groceries = [];
    constructor(price) {
        this.price = price;
    }
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Price.prototype, "id", void 0);
__decorate([
    Column('float'),
    __metadata("design:type", Number)
], Price.prototype, "price", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Price.prototype, "createdAt", void 0);
__decorate([
    ManyToMany(() => Grocery, (grocery) => grocery.prices),
    __metadata("design:type", Array)
], Price.prototype, "groceries", void 0);
Price = __decorate([
    Entity(),
    __metadata("design:paramtypes", [Number])
], Price);
export { Price };
