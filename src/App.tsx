import * as React from 'react';
import * as FilterLibray from './FilterLibrary';
import { Pipeline } from './FilterPipeline';

interface AppState { filters: any, input: Array<any>, searchTexts: Array<any> };

interface AppProps { }

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

export class App extends React.Component<AppProps, AppState> {
    private availableFilters: any;
    constructor(props: any) {
        super(props);

        this.availableFilters = [FilterLibray.Filters.filterEQ, FilterLibray.Filters.filterLT, FilterLibray.Filters.filterGT, FilterLibray.Filters.compareFilter];

        this.state = {
            filters: this.availableFilters.map((func: Function) => { return new Pipeline.Filter(guid(), func)}),
            input: [
                { num: 0, text: 'hej' },
                { num: 5 },
                { num: 8 },
                { num: -5 },
                { num: -10 },
                { num: 20 },
                { "1": "1" },
                { obj: { c: 'text' } },
                { tire: { thickness: 50, model: 'saab' } },
                { tire: { thickness: 20, model: 'saab' } },
                { tire: { thickness: 50, model: 'volvo' } },
                { tire: { thickness: 20, model: 'volvo' } },
                0,
                1,
                2,
                -5,
                -10
            ],
            searchTexts: []
        };

    }
    private findAvailableFilter(filterName: string): [boolean, Pipeline.Filter] {
        let filter = this.availableFilters.find((f: Function) => { if (f.name === filterName) { return true; } else { return false; } });
        if (filter !== undefined)
            return [true, new Pipeline.Filter(guid(), filter)];

        return [false, null];
    }
    private filterInUse(filterId: string): boolean {
        if (this.state.filters.find((f: Pipeline.Filter) => { return f.id === filterId }) === undefined)
            return false;

        return true;
    }
    toggleFilter(filterId: string): void {
        if (this.filterInUse(filterId)) {
            this.setState({ filters: [...this.state.filters.filter((f: Pipeline.Filter) => { if (f.id !== filterId) { return true; } else { return false; } })] })
        } else {
            let availableFilter = this.findAvailableFilter(filterId);

            if (availableFilter[0] === false)
                return;

            const newArray = [...this.state.filters, availableFilter[1]];
            this.setState({ filters: newArray })
        }
    }
    handleChangeValue(value: [number, string], filterId: string): void {
        const existingFilter = this.state.filters.find((f: Pipeline.Filter) => { return f.id === filterId });

        if(value[0] !== undefined){
            existingFilter.args.value = value[0];
        } else if (value[1] !== undefined){
            existingFilter.args.value = value[1];
        }

        this.setState({ filters: [...this.state.filters.filter((f: Pipeline.Filter) => { if (f.id !== filterId) { return true; } else { return false; } }), existingFilter] });
    }
    handleChangeKey(key: string, filterId: string): void {
        const existingFilter = this.state.filters.find((f: Pipeline.Filter) => { return f.id === filterId });

        existingFilter.args.key = key;

        this.setState({ filters: [...this.state.filters.filter((f: Pipeline.Filter) => { if (f.id !== filterId) { return true; } else { return false; } }), existingFilter] });
    }
    addCompareFilter() {
        const filter = new Pipeline.Filter(guid(), FilterLibray.Filters.compareFilter, {});

        this.setState({ filters: [...this.state.filters, filter] });
    }
    render() {
        let filtered = this.state.input;

        if (this.state.filters.length > 0) {
            filtered = Pipeline.AND(this.state.input, this.state.filters);
        }

        filtered = filtered.map((obj: any, index: number) => { return <tr key={obj + index}><td>{JSON.stringify(obj)}</td></tr> });

        let filterButtons = this.state.filters.map((f: Pipeline.Filter, index: number) => {

            if (f.func.name === 'compareFilter') {
                return (
                    <div key={index}>
                        <input type="button" key={f.func.name} value={f.func.name} onClick={() => { this.toggleFilter(f.id) }} />
                        key
                        <input type="text" key={f.id + 'key'} onChange={(e) => { this.handleChangeKey(e.target.value, f.id) }} />
                        value as number
                        <input type="number" key={f.id + 'valnum'} onChange={(e) => { this.handleChangeValue([Number(e.target.value), undefined], f.id) }} />
                        value as string
                        <input type="text" key={f.id + 'valstr'} onChange={(e) => { this.handleChangeValue([undefined, e.target.value], f.id) }} />
                    </div>
                )
            } else {
                return <input type="button" key={f.id} value={f.func.name} onClick={() => { this.toggleFilter(f.id) }} />
            }
        })

        return (
            <div>
                <table>
                    <tbody>
                        {filtered}
                    </tbody>
                </table>
                {filterButtons}
                <input type="button" value="Add compare filter" onClick={() => { this.addCompareFilter() }} />
                <div>
                    <h3>Applied filters</h3>
                    <ul>
                        {this.state.filters.map((f: Pipeline.Filter, index: number) => { return <li key={index}>{f.func.name}</li> })}
                    </ul>
                    {JSON.stringify(this.state.searchTexts)}
                    {JSON.stringify(this.state.filters)}
                </div>
            </div>
        );
    }
}