import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import router from './app/routes'
import cookieParser from 'cookie-parser'
import moment from 'moment'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import notFound from './app/middlewares/notFound'

const app: Application = express()

//parsers
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser())

// application routes
app.use('/api/v1', router)

app.get('/', (req: Request, res: Response) => {
  res.send(`
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap');
      body, html {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #1a1a1a; /* bg-gray-900 */
        color: #e5e7eb; /* text-gray-200 */
        font-family: 'Nunito', sans-serif;
      }
      .container {
        text-align: center;
      }
      .container h1 {
        font-weight: bold;
      }
    </style>
    <div class="container">
      <h1>Server is Running Smoothly</h1>
      <p>${moment(new Date()).format(' Do MMMM YYYY, h:mm:ss a')}</p>
</p>
    </div>
  `)
})

app.use(globalErrorHandler)
app.use(notFound)

export default app
