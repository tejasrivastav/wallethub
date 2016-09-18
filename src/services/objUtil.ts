module webapp.services {
    export class ObjUtil{
        public isEmptyObj(obj: any): boolean{
            return Object.keys(obj).length === 0 && obj.constructor === Object
        }

    }
}