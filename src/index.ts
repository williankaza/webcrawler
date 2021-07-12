import express from 'express'
import cors from 'cors';
import 'reflect-metadata';
import routes from './routes/routes';
import './database/database.connection'

const app = express()
const PORT = 3001
app.use(cors());
app.use(express.json());
app.use(routes);

app.get('',(request, response)=>{
    return response.json({ response: "🐱‍💻 Bem vindo ao projeto Case Mercado Libre!!" })
})

app.listen(PORT,'',()=>{
    console.log(`[${new Date().toUTCString()}] I'm up at port ${PORT} 👀`)
})
