// config inicial
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const { process_params } = require('express/lib/router')
const app = express()


// forma de ler json / middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())


//rotas da api
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)


// rota inicial
app.get('/', (req, res) => {

    res.json({message: 'Oi express'})

})


// entregar uma porta

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@nodeapicluster.teb3ini.mongodb.net/?retryWrites=true&w=majority`)
.then(() => {
    console.log("Conectamos ao MongoDB!")
    app.listen(3000)
})
.catch((err) => console.log(err))

