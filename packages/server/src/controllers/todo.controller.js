const { v4: uuidv4 } = require('uuid');

const todos = [];

const getTodoHandler = (req, res) => {
    const { id } = req.params;

    const response = todos.find( todo => todo.id == id );

    if(response)
        res.status(200).json(response);
    else
        res.status(404).json({message: "Todo not found!"});
}

const getTodosHandler = (req, res) => {
    res.status(200).json(todos);
}

const createTodoHandler = (req , res) => {
    const { name, checked } = req.body;

    const newTodo = {
        id: uuidv4(),
        name: name,
        checked: checked
    }

    todos.push(newTodo);

    res.status(200).json({
        message: "Todo succefully created!",
        body: newTodo
    })
}

const deleteTodoHandler = (req, res) => {
    const { id } = req.params;

    const response = todos.find( (todo, index) => {
        if(todo.id == id)
        return index;
    } );

    if(!response)
        return res.status(404).json({message: "Todo not found!"});

    todos.splice(response, 1);

    // todos = todos.filter( todo => todo != response);

    res.status(200).json({
        message: "Todo deleted succefully",
        body: response
    })
}

const checkHandler = (req, res) => {
    const { id } = req.params;

    const response = todos.find( todo => todo.id == id ? todo.checked = !todo.checked : false);

    if(!response)
        return res.status(404).json({message: "Todo not found!"});

    // todos = todos.map( todo => {
    //     todo.id == id ? todo.checked = !todo.checked : false

    //     return todo;
    // })

    res.status(200).json({
        message: "Todo succefully updated!"
    });
}

module.exports.createTodoHandler     = createTodoHandler;
module.exports.checkHandler          = checkHandler;
module.exports.getTodoHandler        = getTodoHandler;
module.exports.getTodosHandler       = getTodosHandler;
module.exports.deleteTodoHandler     = deleteTodoHandler;