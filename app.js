const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
 
const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'node_crud'
});
 
connection.connect(function(error){
    if(!!error) console.log(error);
    else console.log('Database Connected!');
}); 

//set views file
app.set('views',path.join(__dirname,'views'));
 
//set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',(req, res) => {
    // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
    app.get('/',(req, res) => {
        // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
        let sql = "SELECT * FROM deparetement";
        let query = connection.query(sql, (err, rows) => {
            if(err) throw err;
            res.render('departement', {
                title : 'CRUD Operation using NodeJS / ExpressJS / MySQL',
                users : rows
            });
        });
    }); 
    // res.render('departement');
}); 


// Server Listening
app.listen(3000, () => {
    console.log('Server is running at port 3000');
});
