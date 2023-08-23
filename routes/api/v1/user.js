const express = require('express');
const router = express.Router();
const helper = require(__class_dir + '/helper.class.js');
const m$task = require(__module_dir + '/user.module.js');


//make register route
router.post('/register', async function (req, res, next) {
    const registerUser = await m$task.registerUser(req.body)
    helper.sendResponse(res, registerUser);
});


module.exports = router;