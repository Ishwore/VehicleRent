const express = require('express')
const connectDB = require('./config/db.js')
const cors = require('cors');
const path = require('path')
//const dotenv = require('dotenv')
const morgan = require('morgan')
const productRoutes = require('./routes/productRoutes.js')
// const orderRoutes = require('./routes/orderRoutes.js')
const uploadRoutes = require('./routes/uploadRoutes.js')
const userRoutes = require('./routes/userRoutes.js')
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js')
connectDB();

//dotenv.config()
const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use(cors());
app.use('/api/product', productRoutes)
app.use('/api/users', userRoutes)
// app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)


// const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}
app.use(notFound)
app.use(errorHandler)


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`));
