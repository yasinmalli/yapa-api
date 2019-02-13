import { AppSettings } from './appSettings';
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import requestId from 'koa-requestid';

import { createConnection } from "typeorm";
import { Inject } from "typescript-ioc";
import MainCategoryRoutes from './routes/MainCategoryRoutes';
import ExpenseRoutes from './routes/ExpenseRoutes';

export default class App {
    constructor(
        @Inject private mainCategoryRoutes: MainCategoryRoutes,
        @Inject private expenseRoutes: ExpenseRoutes,
        @Inject private appSettings: AppSettings
    ) { }

    public async createApp() {
        await createConnection({            
            type: "postgres",
            host: await this.appSettings.get('DB.host'),
            port: await this.appSettings.get('DB.port'),
            username: await this.appSettings.get('DB.username'),
            password: await this.appSettings.get('DB.password'),
            database: await this.appSettings.get('DB.database'),
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
        const port = await this.appSettings.get('App.port');        

        this.createApp().then(
            app =>        
                app.listen(port, () => {
                    const mode = process.env.NODE_ENV || "development";
                    console.log(`Server listening on ${port} in ${mode} mode`);
                }),            
            err => {
                console.error('Error while starting up server', err);
                process.exit(1);
            }
        );        
    }
}