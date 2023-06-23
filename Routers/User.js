import { Router } from "express"
import { UserModel } from "../Models/Users.js"
import argon2 from "argon2"
import jsonwebtoken from "jsonwebtoken"

export const UserRouter = Router()

// Endpoint for creating new Users...
UserRouter.post("/createUser", async (request, response) => {
    const hash = argon2.hash(request.body.Password)
    
    hash.then( async (password) => {
        const file = new UserModel({
            Name: request.body.Name,
            Email: request.body.Email,
            Telephone: request.body.Telephone,
            Password: password
        })

        await file.save()
        response.status(200).json({
            message: "User Created!"
        })
    })
    .catch((err) => {
        response.status(400).json({
            message: "Couldn't create User.",
            error: err.message
        })
    })
} )

// Endpoint for Users to login...
UserRouter.post('/login', (request, response) => {
    // Authenticate login User...
    UserModel.find({Email: request.body.Email}).
    then((doc) => {
        if (doc) {
            // Verify the password...
            argon2.verify(doc[0].Password, request.body.Password)
            .then((match) => {
                if (match) {
                    // create auth token...
                    const Useremail = request.body.Email
                    const Authtoken = jsonwebtoken.sign(Useremail, process.env.SECRETKEY)

                    response.status(200).json({
                        AuthToken: Authtoken
                    })
                }
                else {
                    response.status(401).json({
                        message: "Wrong password used!"
                    })
                }
            })
        }
        else{
            response.status(400).json({
                message: "User does not exsist!"
            })
        }
    })
})