//const express = require('express');
//const app = express();
//app.get('/', (req, res) => res.send('Hello world!'));
//const port = process.env.PORT || 8082;
//app.listen(port, () => console.log(`Server running on port
//${port}`));
// setting up routes

const express = require('express');
const app =express();
const port = process.env.PORT || 4000;
const mongoose = require('mongoose');
const cors = require('cors');
//const router = express.Router();
//const bodyParser = require('body-parser')

// connect database
app.use(cors({origin: true, credentials:true}));
app.use(express.json({extend: false}));
app.get('/', (req, res) => res.send('Hello world!'));

const conn_str = 'mongodb+srv://ProjData:s43UO2sKtjy1MHez@cluster0.lkpkoxu.mongodb.net/?retryWrites=true&w=majority'
mongoose.set('strictQuery', false);
mongoose.connect(conn_str)
.then(()=> {
    app.listen(port)
    console.log(`MongoDB Connection Suceeded...`)
})
.catch(err => {
    console.log(`Error in DB Connection ${err}`);
});
// exercise goes here
//const items = require('./routes/api/items');
//app.use('/api/items',items);

const users = require('./routes/api/users');
const excercises = require('./routes/api/excercises')

app.use('/api/users',users);
app.use('/api/excercises', excercises)