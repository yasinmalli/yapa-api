import Koa from 'koa';
import Router from "koa-router";

import { Inject } from "typescript-ioc";
import config from './config/development.json';
import MainCategoryRoutes from './routes/MainCategoryRoutes';

export default class App {
    constructor(
        @Inject private mainCategoryRoutes: MainCategoryRoutes
    ) { }

    public async createApp() {
        const app: Koa = new Koa();        
        const router: Router = new Router();

        this.mainCategoryRoutes.register(router);

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