import * as React from 'react';
import * as FilterLibray from './FilterLibrary';
import { Pipeline } from './FilterPipeline';

interface AppState { filters: any, input: Array<any>, searchText: any };

interface AppProps { }

export class App extends React.Component<AppProps, AppState> {
    private availableFilters: any;
    private searchText: any;
    constructor(props: any) {
        super(props);

        this.availableFilters = [FilterLibray.Filters.filterEQ, FilterLibray.Filters.filterLT, FilterLibray.Filters.filterGT, FilterLibray.Filters.compareFilter];

        this.state = {
            filters: [],
            input: [
                { num: 0, text: 'hej' },
                { num: 5 },
                { num: 8 },
                { num: -5 },
                { num: -10 },
                { num: 20 },
                { "1": "1" },
                { obj: { c: 'text' } },
                0,
                1,
                2,
                -5,
                -10
            ],
            searchText: { key: '', value: '' }
        };

    }
    private findAvailableFilter(filterName: string): [boolean, Pipeline.Filter] {
        let filter = this.availableFilters.find((f: Function) => { if (f.name === filterName) { return true; } else { return false; } });
        if (filter !== undefined)
            return [true, new Pipeline.Filter(filter)];

        return [false, null];
    }
    private filterInUse(filterName: string): boolean {
        if (this.state.filters.find((f: Pipeline.Filter) => { return f.func.name === filterName }) === undefined)
            return false;

        return true;
    }
    toggleFilter(filterName: string): void {
        let availableFilter = this.findAvailableFilter(filterName);

        if (availableFilter[0] === false)
            return;

        if (this.filterInUse(filterName)) {
            this.setState({ filters: this.state.filters.filter((f: Pipeline.Filter) => { if (f.func.name !== filterName) { return true; } else { return false; } }) })
        } else {
            const newArray = [...this.state.filters, availableFilter[1]];
            this.setState({ filters: newArray })
        }
    }
    handleSearch(value: string, key: string) {
        let existingFilter = this.state.filters.find((f: Pipeline.Filter) => { return f.func.name === 'compareFilter' });

        let searchText = Object.assign(this.state.searchText);

        if (searchText.key !== key && key !== undefined) {
            if (existingFilter === undefined) {
                searchText["key"] = key;
                existingFilter = new Pipeline.Filter(FilterLibray.Filters.compareFilter, searchText);
            } else {
                searchText["key"] = key;
            }
        } 
        else if (searchText.value !== value && value !== undefined) {
            if (existingFilter === undefined) {
                searchText.value = value;

                existingFilter = new Pipeline.Filter(FilterLibray.Filters.compareFilter, searchText);
            } else {
                searchText["value"] = value;
            }
        }

        this.setState({ searchText: searchText, filters: [existingFilter] });
    }
    render() {
        let filtered = this.state.input;

        if (this.state.filters.length > 0) {
            filtered = Pipeline.OR(this.state.input, this.state.filters);
        }

        filtered = filtered.map(i => { return <tr key={i.num}><td>{JSON.stringify(i)}</td></tr> });

        let filterButtons = this.availableFilters.map((f: Function) => {
            if (f.name === 'compareFilter') {
                return (
                    <div>
                        <input type="button" key={f.name} value={f.name} onClick={() => { this.toggleFilter(f.name) }} />
                        key
                        <input type="text" key={f.name + 'key'} onChange={(e) => { this.handleSearch(undefined, e.target.value) }} />
                        value
                        <input type="text" key={f.name + 'val'} onChange={(e) => { this.handleSearch(e.target.value, undefined) }} />
                    </div>
                )
            } else {
                return <input type="button" key={f.name} value={f.name} onClick={() => { this.toggleFilter(f.name) }} />
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
                <div>
                    <h3>Applied filters</h3>
                    <ul>
                        {this.state.filters.map((f: Pipeline.Filter) => { return <li>{f.func.name}</li> })}
                    </ul>
                    {JSON.stringify(this.state.searchText)}
                    {JSON.stringify(this.state.filters)}
                </div>
            </div>
        );
    }
}