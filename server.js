//const express = require("express")

import express from "express"
import { PrismaClient } from '@prisma/client'
import cors from "cors"

const prisma = new PrismaClient()

const port = process.env.PORT || 3000

const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("hello world")
})

app.post("/usuarios", async (req, res) => {
    try {
        await prisma.user.create({
            data: {
                email: req.body.email,
                name: req.body.name,
                age: req.body.age
            }
        })
        // users.push(req.body)
        res.status(201).json(req.body)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

app.get("/usuarios", async (req, res) => {
    let users = []
    
        if (req.query) {
            users = await prisma.user.findMany({
                where: {
                    name: req.query.name,
                    age: req.query.age,
                    email: req.query.email
                }
            })
        } else {
            users = await prisma.user.findMany()

        }
        
        console.log(req)
        // res.status(200).json(users)
        res.status(200).json(users)
})


app.put("/usuarios/:id", async (req, res) => {
    try {
        await prisma.user.update({
            where: {
                id: req.params.id
            },
            data: {
                email: req.body.email,
                name: req.body.name,
                age: req.body.age
            }
        })
        // users.push(req.body)
        res.status(201).json(req.body)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

app.delete("/usuarios/:id", async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({ message: "Usuario deletado com sucesso" })
})

app.listen(port)


//dgFCXKAbNtB0JKA2