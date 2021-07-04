import express from 'express'

const app = express()
const PORT = 3001

app.get('',(request, response)=>{
    return response.json({ response: "🐱‍💻 Bem vindo ao projeto Case Mercado Libre" })
})

app.listen(PORT,'',()=>{
    console.log("I'm up 👀")
})
