const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const handlebars = require('express-handlebars')
const Database = require('./dao/db')
const {Server} = require('socket.io')
const io = new Server(server)
const productRouter = require('./routers/product.router')
const cartRouter = require('./routers/cart.router')
const chatRouter = require('./routers/chat.router')(io)
const productViewRouter = require('./routers/productView.router')
const cartViewRouter = require('./routers/cartView.router')
const PORT = 8080

//middleware de archivos estaticos publicos, JSON y encoding
app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Configuracion de Handlebars
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

//middleware de router
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/chat', chatRouter)
app.use('/products', productViewRouter)
app.use('/carts', cartViewRouter)

server.listen(PORT, () => {
    console.log(`Server listenning at port ${PORT}`)
    Database.connect()
})