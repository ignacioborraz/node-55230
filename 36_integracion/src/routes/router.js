import { Router } from "express"

export default class MyRouter {
    constructor() {
        this.router = Router()
        this.init()
    }
    init() {}
    getRouter = ()=> this.router        //retorna el enrutador del recurso (para poder usar los endpoints del recurso)
    applyMids = (mids)=> {              //aplica los parametros res,res,next según corresponda a cada una de las callbacks (middlewares+controller)
        //mids = [midl1,midl2,midl3,controller] son todos los middlewares y el controller que necesita el endpoint
        return mids.map(mid=> async(...params) => {
            try {
                await mid.apply(this,params)
            } catch(error) {
                return params[1].status(500).send(error)
            }
        })
    }
    //this.router.post("/api/products",mid1,mid2,mid3,controller)
    create = (path,...cbs)=> this.router.post(path,this.applyMids(cbs))
    read = (path,...cbs)=> this.router.get(path,this.applyMids(cbs))
    update = (path,...cbs)=> this.router.put(path,this.applyMids(cbs))
    destroy = (path,...cbs)=> this.router.delete(path,this.applyMids(cbs))
    use = (path,...cbs)=> this.router.use(path,this.applyMids(cbs))
}