import Koa from 'koa';
import Router from "koa-router";

import config from './config/development.json';

export default class App {
    constructor() { }

    public async createApp() {
        const app: Koa = new Koa();
        const router: Router = new Router();
           
        router.get('/', async (ctx) => {
            ctx.body = 'Hello World Yasin';
        });
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