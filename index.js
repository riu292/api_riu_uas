const express = require('express')
const app = express()
const port = 3000
    // import body parser
const bodyparser = require('body-parser')

app.get('/', (req, res) => {
    res.send('halo dunia')
})

//insert, edit, delete
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

//import router post
const postsRouter = require('./router/posts')
app.use('/api/posts', postsRouter)


app.listen(port, () => {
    console.log(`aplikasi ini berjalan di http://localhost:${port}`)
})