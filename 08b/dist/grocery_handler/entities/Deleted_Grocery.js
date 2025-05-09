var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Grocery } from './Grocery.js';
let Deleted_Grocery = class Deleted_Grocery {
    id = 0;
    deletedAt = null;
    groceries = [];
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Deleted_Grocery.prototype, "id", void 0);
__decorate([
    Column({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], Deleted_Grocery.prototype, "deletedAt", void 0);
__decorate([
    ManyToMany(() => Grocery, (grocery) => grocery.deletedGroceries),
    __metadata("design:type", Array)
], Deleted_Grocery.prototype, "groceries", void 0);
Deleted_Grocery = __decorate([
    Entity()
], Deleted_Grocery);
export { Deleted_Grocery };
