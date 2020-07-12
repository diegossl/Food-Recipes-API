import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import dotenv from 'dotenv'
import mongodb from './config/MongoDB'
import indexRouter from './routes/index'

dotenv.config()

mongodb.startConnection().then((response) => {
    if (response != undefined) {
      console.log('MongoDB successfully connected')
    } else {
      console.log('Undefined connection data')
    }
  }).catch(() => {
    console.log('Failed to try to connect to MongoDB')
  })

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', indexRouter)

export default app
