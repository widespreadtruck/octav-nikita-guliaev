const express = require("express")
const axios = require("axios")
const fs = require("fs")
const app = express()
const path = require("path")

const WALLET_DATA = path.join(
  __dirname,
  "./mock-data/0xef7f2e81ea14538858d962df34eb1bfda83da395.json"
)

const PORT = process.env.PORT || 3001

app.get("/wallet", (req, res) => {
  fs.readFile(WALLET_DATA, (err, data) => {
    if (err) throw err
    res.json(JSON.parse(data))
  })
})

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server" })
})

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}...`)
})
