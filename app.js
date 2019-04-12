const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
//const www = process.env.WWW || './';

// app.use(express.static(www));
// console.log(`serving ${www}`);
// app.get('*', (req, res) => {
//     res.sendFile(`index.html`, { root: www });
// });
// app.listen(port, () => console.log(`listening on http://localhost:${port}`));

const urlLog = (req, res, next) => {
    console.log(`URL: ${req.url}`);
    next();
}

// Set the view directory
app.set('views', './views')

// Set the view engine for our app
app.set('view engine', 'pug')

app.use(urlLog);

app.get('/', (req, res, next) => {
    //res.status(200).send('<h1>Hello World</h1>');
    res.status(200).sendfile('./index.html');
    //next();
});

app.get('/user/:id', (req, res, next) => {
    res.end(`Requested user with id: ${req.params.id}`);
});

app.get('/user/:id/dept/:deptname', (req, res, next) => {
    // res.end(`Requested user with id: ${req.params.id} in the department ${req.params.deptname}`);
    const userDetails = {
        userid: req.params.id,
        department: req.params.deptname
    };
    res.render('userpage', userDetails);
});

app.get('/pugdemo', (req, res, next) => {
    res.render('index');
});

app.get('*', (req, res, next) => {
    //res.sendStatus(404);
    res.status(200).send('<h3>Sorry resource not found');
    next();
});

app.listen(port, () => 
        console.log(`Server started at port ${port}`)
);