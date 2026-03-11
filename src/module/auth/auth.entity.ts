import { BaseEntity } from "src/core";
import { Entity } from "typeorm";

@Entity('auth')
export class AuthEntity extends BaseEntity{
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
}