import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import requestId from 'koa-requestid';

import { createConnection } from "typeorm";
import { Inject } from "typescript-ioc";
import config from './config/development.json';
import MainCategoryRoutes from './routes/MainCategoryRoutes';
import ExpenseRoutes from './routes/ExpenseRoutes';

export default class App {
    constructor(
        @Inject private mainCategoryRoutes: MainCategoryRoutes,
        @Inject private expenseRoutes: ExpenseRoutes,
    ) { }

    public async createApp() {
        await createConnection({            
            type: "postgres",
            host: "192.168.1.75",
            port: 5432,
            username: "postgres",
            password: "Password1",
            database: "personal_db",
            logging: true,            
            entities: ["src/models/**/*.ts"]
        });

        const app: Koa = new Koa();        
        const router: Router = new Router();

        this.mainCategoryRoutes.register(router);
        this.expenseRoutes.register(router);

        app.use(requestId());
        app.use(bodyParser());
        app.use(router.routes());

        return Promise.resolve(app);
    }

    public async start() {
        this.createApp().then(
            app => 
                app.listen(config.app.port, () => {
                    const mode = process.env.NODE_ENV || "development";
                    console.log(`Server listening on ${config.app.port} in ${mode} mode`);
                }),
            err => {
                console.error('Error while starting up server', err);
                process.exit(1);
            }
        );        
    }
}