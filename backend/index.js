const express = require('express')
const cors = require('cors')
const auth = require('./routes/auth')
const menu = require('./routes/menu')
const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.status(200).send({'pesan': 'Server terkoneksi.'})
})

app.use('/auth', auth)
app.use('/menu', menu)

app.listen(port, () => {
    console.log(`API listening on port ${port}`)
})