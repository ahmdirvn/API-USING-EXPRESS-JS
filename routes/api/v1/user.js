const express = require('express');
const router = express.Router();
const helper = require(__class_dir + '/helper.class.js');
const m$task = require(__module_dir + '/user.module.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//make register route
router.post('/register', async function (req, res, next) {
    const registerUser = await m$task.registerUser(req.body)
    helper.sendResponse(res, registerUser);
});

//login 

router.post('/login', async (req, res) => {

    // Panggil fungsi login dari user.module.js
    const user = await m$task.login(req.body.email, req.body.password);

    if (!user) {
        return res.status(401).json({ message: 'Email atau password salah' });
    }
    // Jika password cocok, buat token JWT
    jwt.sign(user, `secret`, (err, token) => {
        if (err) {
            console.log(err);
            res.sendStatus
            return
        }

        const Token = token
        res.json({
            user: user,
            token: Token,

        })

    })


});



module.exports = router;