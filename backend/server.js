import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import productRoutes from './routs/productRoutes.js'
import userRoutes from './routs/userRoutes.js'
import orderRoutes from './routs/orderRoutes.js'

dotenv.config()

connectDB()

const app = express() 
app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is running...')
} )

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000


app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.rainbow.bold))
