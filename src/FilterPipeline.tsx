export module Pipeline {
    export function OR(input: any, filters: Array<IFilter>) {
        let inputCopy = Object.assign(input);

        let concat: Array<any> = [];

        filters.forEach((f: Filter) => {
            let filterResult = inputCopy.filter(f.func, f.args);
            concat = [...concat, ...filterResult];
        });

        return concat;
    }
    export function AND(input: any, filters: Array<IFilter>) {
        let inputCopy = Object.assign(input);

        filters.forEach((f: Filter) => {
            inputCopy = inputCopy.filter(f.func, f.args);
        });

        return inputCopy;
    }
    export interface IFilter { func: Function, args: Array<any> }

    export class Filter implements IFilter {
        func: Function;
        args: any[];
        readonly id: string 

        constructor(id: string, func: Function, args: any = {}){
            this.args = args;
            this.func = func;
            this.id = id;
        }
    }
}
