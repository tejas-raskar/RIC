const express = require('express');
const zod = require('zod');
const { todo } = require('./db.js')
const { createTodo, updateTodo } = require('./types.js');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.post('/todo', async function(req, res) {
    const validation = createTodo.safeParse(req.body);
    if (!validation.success) {
        res.status(411).json({
            message: "You sent the wrong inputs."
        })
        return;
    }

    await todo.create({
        title: req.body.title,
        description: req.body.description,
        completed: false
    })

    res.json({
        message: "Todo created successfully!"
    })
})

app.get('/todos', async function(req, res) {
    const todos = await todo.find({});
    res.json(todos);
})

app.put('/completed', async function(req, res) {
    const validation = updateTodo.safeParse(req.body);
    if (!validation.success) {
        res.status(411).json({
            message: "You sent the wrong inputs."
        })
        return;
    }

    await todo.update({
        _id: req.body.id
    }, {
        completed: true
    })

    res.json({
        message: "Todo updated!"
    })
})

app.delete('/todo/:id', async function(req, res) {
    const id = req.params.id;

    try {
        await todo.deleteOne({ _id: id });
        res.json({
            message: "Todo deleted successfully!"
        });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while deleting the todo."
        });
    }
});

app.listen(3000);