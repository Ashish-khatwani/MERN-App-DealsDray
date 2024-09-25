const express= require('express');
const app = express();
const port = 5000;
const cors = require('cors');

app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());
app.get('/', function(req, res) {
    res.send('Welcome to the API!');
});

app.post('/api/', function(req, res) {
    const { username, password } = req.body;// called as object destructuring 

    console.log(username, password);
    console.log(req.body)
});

app.listen(port);

