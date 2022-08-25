import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import sendMail from './mail.js'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import 'dotenv/config'


const PORT = process.env.PORT || 5000

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/src', express.static(path.join(__dirname + '/src')));

const messageSchema = {
    firstName: {
        type: String,
    
    },
    lastName: {
        type: String,
    
    },

    email: {
        type: String,
    
    },

    phoneNumber: {
        type: Number,
    },

    message: {
        type: String,
    
    },

}


const emailSchema = {
    Email: {
        type: String,
    
    },

}

const Message = mongoose.model('message', messageSchema)
const Email = mongoose.model('email', emailSchema)



app.get("/", (req, res) => {
    // res.sendFile(path.join(__dirname,  "src", "/indexxx.html"));
    res.sendFile(path.join(__dirname + "/indexxx.html"));
})

app.post('/', (req, res) => {
    let newMessage = new Message({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        message: req.body.message

    })
    newMessage.save()
    res.redirect('/')

})
    

app.post('/newsletter', (req, res) => {

    console.log('Data: ', req.body)

    let newsLetterSignUp = new Email({
        Email: req.body.Email,
    })
    newsLetterSignUp.save()
    res.redirect('/')
 
})


mongoose.connect(process.env.MONGO_URI, ({ useNewUrlParser: true, useUnifiedTopology: true }))
    .then(() => {
        console.log(`success connected to DB`)
    })
    .catch((error) => {
        console.log({ message: error.message })
    })

app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`)
})