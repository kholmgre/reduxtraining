export module Pipeline {
    export function SomeMatch(input: any, filters: Array<IFilter>) : any {
        let inputCopy = Object.assign(input);

        let concat: Array<any> = [];

        filters.forEach((f: Filter) => {
            let filterResult = inputCopy.filter(f.func, f.args);
            concat = [...concat, ...filterResult];
        });

        return concat;
    }
    export function AllMatch(input: any, filters: Array<IFilter>) : any {
        let inputCopy = Object.assign(input);

        filters.forEach((f: Filter) => {
            inputCopy = inputCopy.filter(f.func, f.args);
        });

        return inputCopy;
    }
    export function NoneMatch(input: any, filters: Array<IFilter>) : any {
        throw 'Not implemented';
    }
    export function Combine(input: [[any, Array<IFilter>], [any, Array<IFilter>]]) : Array<any> {
        return SomeMatch(input[0][0], input[0][1]).concat(SomeMatch(input[1][0], input[1][1]));
    }

    export interface IFilter { func: Function, args: Array<any> }
    
    export class Filter implements IFilter {
        func: Function;
        args: any[];
        readonly id: string

        constructor(id: string, func: Function, args: any = {}) {
            this.args = args;
            this.func = func;
            this.id = id;
        }
    }
}
