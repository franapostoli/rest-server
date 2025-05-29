import { Router } from "express";
import { TodosController } from './todos/controller';
import { TodoRoutes } from "./todos/routes";



export class AppRoutes {

    static get routes(): Router {
        const router = Router();
        //const todoController = new TodosController();

        /*router.get('/', todoController.getTodos);
        router.get('/:id', todoController.getTodoById);
        router.post('/', todoController.createTodo);
        return router; */ 

        router.use('/api/todos', TodoRoutes.routes );
        return router;
    }

}