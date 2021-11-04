import { IsNotEmpty } from "class-validator"
import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm"
import * as bcrypt from "bcryptjs"
import config from "../config/config"
import { createHash, createHmac } from "crypto"

@Entity()
@Unique(["username"])
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    @IsNotEmpty()
    username: string

    @Column()
    @IsNotEmpty()
    password: string


    @Column()
    items: string

    public hashPassword() {
        this.password = bcrypt.hashSync(this.getBase64HmacFromPassword(this.password))
    }

    private getBase64HmacFromPassword(password: string) {
        return createHmac('sha256', password + config.pepper).digest('base64')
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(this.getBase64HmacFromPassword(unencryptedPassword), this.password)
    }

}
