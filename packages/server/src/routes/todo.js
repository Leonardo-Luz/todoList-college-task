const { Router } = require('express');
const { getTodoHandler, getTodosHandler, createTodoHandler, checkHandler, deleteTodoHandler } = require('../controllers/todo.controller');

const router = Router();

router.get('/:id', getTodoHandler);
router.get('/', getTodosHandler);

router.post('/', createTodoHandler);

router.put('/check/:id', checkHandler);

router.delete('/:id', deleteTodoHandler);

module.exports.todoRoute = router;