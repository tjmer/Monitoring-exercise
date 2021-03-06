const express = require('express')
const path = require('path')
const Rollbar = require('rollbar')

let rollbar = new Rollbar({
    accessToken: '6bcde838f8ad4fee965803ca744f164d',
    captureUncaught: true,
    captureUnhandledRejections: true
})

const app = express()
const port = process.env.PORT || 4005
const group = []

app.use(express.json())
app.use('/style', express.static('./public/styles.css'))
app.use('/js', express.static('./public/index.js'))

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully')
})

app.get('/api/people', (req,res)=>{
    res.status(200).send(group)
})

app.post('/api/people', (req, res) => {
    rollbar.log("Person added")
    let {name, age, color} = req.body
    let newperson = {
        name,
        age,
        color
    }
    group.push(newperson)
    res.status(200).send(group)
})



app.use(rollbar.errorHandler())
app.listen(port, ()=> console.log(`Up on ${port}`))