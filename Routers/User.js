import { Router } from "express"
import { UserModel } from "../Models/Users.js"
import argon2 from "argon2"
import jsonwebtoken from "jsonwebtoken"

export const UserRouter = Router()

// Endpoint for creating new Users...
UserRouter.post("/create", async (req, res) => {
    const hash = argon2.hash(req.body.Password)

    hash.then(async (password) => {
        const file = new UserModel({
            Name: req.body.Name,
            Email: req.body.Email,
            Telephone: req.body.Telephone,
            Password: password
        })

        await file.save()
        res.status(200).json({
            message: "User Created!"
        })
    })
        .catch((err) => {
            res.status(400).json({
                message: "Couldn't create User.",
                error: err.message
            })
        })
})

// Endpoint for Users to login...
UserRouter.post('/login', (req, res) => {
    // Authenticate login User...
    UserModel.find({ Email: req.body.Email }).
        then((doc) => {
            if (doc) {
                // Verify the password...
                argon2.verify(doc[0].Password, req.body.Password)
                    .then((match) => {
                        if (match) {
                            // create auth token...
                            const Useremail = req.body.Email
                            const Authtoken = jsonwebtoken.sign(Useremail, process.env.SECRETKEY)

                            res.status(200).json({
                                AuthToken: Authtoken
                            })
                        }
                        else {
                            res.status(401).json({
                                message: "Wrong password used!"
                            })
                        }
                    })
            }
            else {
                res.status(400).json({
                    message: "User does not exsist!"
                })
            }
        })
})

UserRouter.post('/admin/login', (req, res) => {
    if (req.body.Email == process.env.ADMIN_EMAIL) {
        if (req.body.Password == process.env.ADMIN_PASSWORD) {
            Authtoken = jsonwebtoken.sign(req.body.Email, process.env.ADMIN_KEY)

            res.status(200).json({
                AuthToken: Authtoken
            })
        }
        else {
            res.status(401).json({
                message: "Wrong password used!"
            })
        }
    }
    else {
        res.status(401).json({
            message: "Wrong email used!"
        })
    }
})