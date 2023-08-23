const express = require('express');
const router = express.Router();
const helper = require(__class_dir + '/helper.class.js');
const m$task = require(__module_dir + '/task.module.js');
const jwt = require('jsonwebtoken');



function verifyUser(req, res, next) {
    const bearer = req.headers.bearer
    jwt.verify(bearer, `secret`, (err, data) => {
        if (err) {
            err.message = "anda harus login terlebih dahulu"
            res.json(err)
            return
        }
        next()
    })
}

//add data or create data
router.post('/', verifyUser, async function (req, res, next) {
    const addTask = await m$task.add(req.body)
    helper.sendResponse(res, addTask);
});

// get all data or read all data
router.get('/', verifyUser, async function (req, res, next) {
    const allTasks = await m$task.getAll(req.body);
    helper.sendResponse(res, allTasks);
});


//untuk delete
router.delete('/:id', verifyUser, async function (req, res, next) {
    const taskId = req.params.id;
    const deleteTask = await m$task.delete(taskId);
    helper.sendResponse(res, deleteTask);
});

//untuk update
router.put('/:id', verifyUser, async function (req, res, next) {
    const taskId = req.params.id; // Menggunakan req.params.id
    const updateTask = await m$task.update({ id: taskId, ...req.body });
    helper.sendResponse(res, updateTask);
});



//route get by id (query params)
router.get('/:id', verifyUser, async function (req, res, next) {
    const getbyId = await m$task.GetById(req.params.id)
    helper.sendResponse(res, getbyId);
});


// //route get by id (query path)
// router.get('/id', async function (req, res, next) {
//     id = req.query.id
//     const result = await m$task.GetById(id); // Panggil GetById() dengan ID
//     helper.sendResponse(res, result);
// });



module.exports = router;

