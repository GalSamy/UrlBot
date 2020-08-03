// @ts-ignore

import userSchema from "../models/userSchema"
module.exports = {
    createUser : (codesAmount: number, userId: string, premium: boolean) => {

        userSchema.create({
            codesAmount: codesAmount,
            userId: userId,
            premium: premium,
        })
        console.log("user created")
    }
}
