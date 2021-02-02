const express = require('express');
const router = express.Router();
const controllerTodos = require('../controllers/todo')


router
    .post('/', controllerTodos.createTodo)
    .patch('/:id', controllerTodos.updateTodo)
    .get('/:id', controllerTodos.getTodoById)
    .delete('/:id', controllerTodos.deleteTodoById)
    .get('/', controllerTodos.getAllTodo)

module.exports = router;