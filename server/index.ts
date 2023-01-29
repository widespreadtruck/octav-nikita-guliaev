const express = require("express")
const axios = require("axios")
const fs = require("fs")
const app = express()
const path = require("path")
const cors = require('cors')

const WALLET_DATA = path.join(
  __dirname,
  "./mock-data/0xef7f2e81ea14538858d962df34eb1bfda83da395.json"
)

const PORT = process.env.PORT || 3001

app.use(cors())

app.get("/wallet", (req, res) => {
  fs.readFile(WALLET_DATA, (err, data) => {
    if (err) throw err
    console.log({data})
    res.json(JSON.parse(data))
  })
})

app.get('/get-prices/:query', (req, res) => {
  const { query } = req.params
  axios.get(`https://coins.llama.fi/prices/current/${query}`)
    .then(response => {
      res.send(response.data)
    })
    .catch(error => {
      res.send(error)
    })
})

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}...`)
})
