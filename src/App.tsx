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

        this.availableFilters = [FilterLibray.Filters.filterEQ, FilterLibray.Filters.filterLT, FilterLibray.Filters.filterGT, FilterLibray.Filters.dynamicFilter];

        this.state = {
            filters: [],
            input: [
                { num: 0, text: 'hej' },
                { num: 5 },
                { num: 8 },
                { num: -5 },
                { num: -10 },
                { num: 20 }
            ],
            searchText: ''
        };

    }
    toggleFilter(filterName: string): void {
        if (this.state.filters.indexOf(this.availableFilters.find((f: Function) => { if (f.name === filterName) { return true; } else { return false; } })) !== -1) {
            this.setState({ filters: this.state.filters.filter((f: Function) => { if (f.name !== filterName) { return true; } else { return false; } }) })
        } else {
            const newArray = [...this.state.filters, this.availableFilters.find((f: Function) => { if (f.name === filterName) { return true; } else { return false; } })];
            this.setState({ filters: newArray })
        }
    }
    handleSearch(e: any, prop: string) {
        let searchTxt = { prop: e };

        let filter = new Pipeline.Filter(function (element: any) {
            if (element.hej === this["compare"])
                return true;
            else { return false; }
        }, searchTxt);

        this.setState({ searchText: searchTxt });
    }
    render() {

        let filtered = Pipeline.OR(this.state.input, this.state.filters).map(i => { return <tr key={i.num}><td>{JSON.stringify(i)}</td></tr> });

        let filterButtons = this.availableFilters.map((f: Function) => {
            if (f.name === 'dynamicFilter') {
                return (
                    <div>
                        <input type="button" key={f.name} value={f.name} onClick={() => { this.toggleFilter(f.name) }} />
                        key
                        <input type="text" key={f.name + 'key'} onChange={(e) => { this.handleSearch(e.target.value, "key") }} />
                        value
                        <input type="text" key={f.name + 'val'} onChange={(e) => { this.handleSearch(e.target.value, "value") }} />
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
                        {this.state.filters.map((f: Function) => { return <li>{f.name}</li> })}
                    </ul>
                    {JSON.stringify(this.state.searchText)}
                </div>
            </div>
        );
    }
}