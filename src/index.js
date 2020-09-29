require('./db/mongoose')
const express = require('express')
const taskRouter = require('./routers/task')
const userRouter = require('./routers/user')
const jwt = require('jsonwebtoken')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

const myFunc = async () => {
    const token = jwt.sign({ _id: 'abc123' }, 'thisismycourse', {expiresIn: '5 second'})
    console.log(token)
    console.log(jwt.verify(token, 'thisismycourse'))
}

myFunc()