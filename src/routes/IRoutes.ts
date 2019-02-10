import * as Router from "koa-router";

export abstract class IRoutes {

    protected abstract getRoutes(): any[];

    public register(router: Router) {
        this.getRoutes().forEach(routerObj => {
            router[routerObj.method](`/api/v1/${routerObj.path}`, routerObj.action);            
        });
    }
}

export default IRoutes;