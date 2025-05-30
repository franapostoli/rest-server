import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDto } from '../../domain/dtos/todos/create-todo.dto';
import { UpdateTodoDto } from '../../domain/dtos';

const todos = [
    { id: 1, title: 'Comprar leche', createdAt: new Date() },
    { id: 2, title: 'Comprar cafe', createdAt: new Date() },
    { id: 3, title: 'Comprar té', createdAt: null }
]

export class TodosController {


    constructor() {

    }
    // to convert the following methods with prisma is necesary add async and await. 
    public getTodos = async (req: Request, res: Response) => {

        const todos = await prisma.todo.findMany();

        return res.json(todos)
    }

    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Id must be a number' });
        }

        const todo = await prisma.todo.findFirst({
            where: { id }
        });
        //const todo = todos.find(t => t.id === id);

        (todo)
            ? res.json(todo)
            : res.status(404).json({ message: 'Id not found' });
    }

    public createTodo = async (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if (error) return res.status(400).json({ message: error });
        //const { text } = req.body;


        const todo = await prisma.todo.create({
            data: createTodoDto!
        });

        res.json(todo);
    }

    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });
        if (error) return res.status(400).json({ message: error });

        const todo = await prisma.todo.findFirst({
            where: { id }
        })


        if (!todo) {
            return res.status(404).json({ message: 'Id not found' });
        }

        
        const updatedTodo = await prisma.todo.update({
            where: { id },
            data: updateTodoDto!.values
        });


        return res.json(updatedTodo);
    }


    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        const todo = todos.find(t => t.id === id);
        if (!todo) return res.status(404).json({ message: 'Id not found' });

        const deletedTodo = await prisma.todo.delete({
            where: { id }
        });

        (deletedTodo)
            ? res.json(deletedTodo)
            : res.status(404).json({ error: 'Id not found' });

    }

}