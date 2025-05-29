import { Request, Response } from 'express';

const todos = [
    { id: 1, title: 'Comprar leche', createdAt: new Date() },
    { id: 2, title: 'Comprar cafe', createdAt: new Date() },
    { id: 3, title: 'Comprar té', createdAt: null }
]

export class TodosController {


    constructor() {

    }

    public getTodos = (req: Request, res: Response) => {

        return res.json(todos)
    }

    public getTodoById = (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Id must be a number' });
        }

        const todo = todos.find(t => t.id === id);

        (todo)
            ? res.json(todo)
            : res.status(404).json({ message: 'Id not found' });
    }

    public createTodo = (req: Request, res: Response) => {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ message: 'Text is required' });
        }
        todos.push(
            { id: todos.length + 1, title: text, createdAt: new Date() }
        )
        res.json('POST create todo')
    }

    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Id must be a number' });
        }

        const todo = todos.find(t => t.id === id);

        if (!todo) {
            return res.status(404).json({ message: 'Id not found' });
        }

        const { text, createdAt } = req.body;
        if (!text) {
            return res.status(400).json({ message: 'Text is required' });
        }

        todo.title = text || todo.title;
        (createdAt === 'null')
            ? todo.createdAt = null
            : todo.createdAt = new Date(createdAt || todo.createdAt);

        return res.json(todo);
    }


    public deleteTodo = (req: Request, res: Response) => {
        const  id  = +req.params.id;
        const todo = todos.find(t => t.id === id);
        if (!todo) return res.status(404).json({ message: 'Id not found' });
        
        todos.splice(todos.indexOf(todo), 1);

        res.json(todo)
    }

}