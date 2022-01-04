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
    let sql = "SELECT * FROM departement";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('departement', {
            title : 'CRUD using NodeJS / ExpressJS / MySQL',
            departement: rows
        });
    });
}); 

app.get('/add',(req, res) => {
    res.render('depar_add', {
        title : 'CRUD using NodeJS / ExpressJS / MySQL'
    });
});
 
app.post('/save',(req, res) => { 
    let data = {name: req.body.name, description: req.body.description,};
    let sql = "INSERT INTO departement SET ?";
    let query = connection.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});

app.get('/edit/:deparId',(req, res) => {
    const deparId = req.params.deparId;
    let sql = `Select * from departement where id = ${deparId}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.render('depar_edit', {
            title : 'CRUD using NodeJS / ExpressJS / MySQL',
            depar : result[0]
        });
    });
});

app.post('/update',(req, res) => {
    const userId = req.body.id;
    let sql = "update departement SET name='"+req.body.name+"',  description='"+req.body.description+"' where id ="+userId;
    let query = connection.query(sql,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});

app.get('/delete/:deparId',(req, res) => {
    const deparId = req.params.deparId;
    let sql = `DELETE from departement where id = ${deparId}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.redirect('/');
    });
});


// Server Listening
app.listen(5000, () => {
    console.log('Server is running at port 5000');
});
