const express = require('express')
const test = express()

//EJS 
test.set('views', './views')
test.set('view engine', 'ejs')

test.get('/',(req, res) => {
    res.render('home')
})

test.listen(3000)