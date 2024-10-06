const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs');
const path = require('path');

app.use(express.json());

router.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

router.get('/profile', (req, res) => {
    const userData = fs.readFileSync(path.join(__dirname, 'user.json'));
    res.json(JSON.parse(userData));
});


router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const userData = JSON.parse(fs.readFileSync(path.join(__dirname, 'user.json')));

    if (username !== userData.username) {
        res.json({ status: false, message: "User Name is invalid" });
    } else if (password !== userData.password) {
        res.json({ status: false, message: "Password is invalid" });
    } else {
        res.json({ status: true, message: "User Is valid" });
    }
});

router.get('/logout/:username', (req, res) => {
    const { username } = req.params;
    res.send(`<b>${username} successfully logged out.</b>`);
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Server Error');
});

app.use('/', router);

app.listen(process.env.port || 8086);

console.log('Web Server is listening at port ' + (process.env.port || 8086));
