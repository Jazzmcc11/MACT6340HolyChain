import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express()
const port = 3000

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.static('public'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log(process.env.SENSITIVE_INFO);
})
