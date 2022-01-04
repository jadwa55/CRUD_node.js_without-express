const express = require('express')
const test = express()

test.get('/',(req, res) => {
    res.send('F*ck')
})

test.listen(3000)