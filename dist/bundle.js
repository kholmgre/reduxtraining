/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(1);
const FilterLibray = __webpack_require__(4);
const FilterPipeline_1 = __webpack_require__(5);
;
class App extends React.Component {
    constructor(props) {
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
                0,
                1,
                2,
                -5,
                -10
            ],
            searchText: { "a": '', "b": "1" }
        };
    }
    findAvailableFilter(filterName) {
        let filter = this.availableFilters.find((f) => { if (f.name === filterName) {
            return true;
        }
        else {
            return false;
        } });
        if (filter !== undefined)
            return [true, new FilterPipeline_1.Pipeline.Filter(filter)];
        return [false, null];
    }
    filterInUse(filterName) {
        if (this.state.filters.find((f) => { return f.func.name === filterName; }) === undefined)
            return false;
        return true;
    }
    toggleFilter(filterName) {
        let availableFilter = this.findAvailableFilter(filterName);
        if (availableFilter[0] === false)
            return;
        if (this.filterInUse(filterName)) {
            this.setState({ filters: this.state.filters.filter((f) => { if (f.func.name !== filterName) {
                    return true;
                }
                else {
                    return false;
                } }) });
        }
        else {
            const newArray = [...this.state.filters, availableFilter[1]];
            this.setState({ filters: newArray });
        }
    }
    handleSearch(prop) {
        let existingFilter = this.state.filters.find((f) => { return f.func.name === 'compareFilter'; });
        let searchText = Object.assign(this.state.searchText);
        if (existingFilter === undefined) {
            searchText["a"] = prop;
            existingFilter = new FilterPipeline_1.Pipeline.Filter(FilterLibray.Filters.compareFilter, searchText);
        }
        else {
            existingFilter.args.a = prop;
        }
        this.setState({ searchText: searchText, filters: [existingFilter] });
    }
    render() {
        let filtered = this.state.input;
        if (this.state.filters.length > 0) {
            filtered = FilterPipeline_1.Pipeline.OR(this.state.input, this.state.filters);
        }
        filtered = filtered.map(i => { return React.createElement("tr", { key: i.num },
            React.createElement("td", null, JSON.stringify(i))); });
        let filterButtons = this.availableFilters.map((f) => {
            if (f.name === 'compareFilter') {
                return (React.createElement("div", null,
                    React.createElement("input", { type: "button", key: f.name, value: f.name, onClick: () => { this.toggleFilter(f.name); } }),
                    "key",
                    "value",
                    React.createElement("input", { type: "text", key: f.name + 'val', onChange: (e) => { this.handleSearch(e.target.value); } })));
            }
            else {
                return React.createElement("input", { type: "button", key: f.name, value: f.name, onClick: () => { this.toggleFilter(f.name); } });
            }
        });
        return (React.createElement("div", null,
            React.createElement("table", null,
                React.createElement("tbody", null, filtered)),
            filterButtons,
            React.createElement("div", null,
                React.createElement("h3", null, "Applied filters"),
                React.createElement("ul", null, this.state.filters.map((f) => { return React.createElement("li", null, f.func.name); })),
                JSON.stringify(this.state.searchText))));
    }
}
exports.App = App;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(1);
const react_dom_1 = __webpack_require__(2);
const App_1 = __webpack_require__(0);
react_dom_1.render(React.createElement(App_1.App, null), document.getElementById('root'));


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Filters;
(function (Filters) {
    function filterGT(e) {
        let val = 0;
        if (this !== undefined) {
            if (this["number"] !== undefined)
                val = this["number"];
        }
        if (e > 0) {
            return true;
        }
        else {
            return false;
        }
    }
    Filters.filterGT = filterGT;
    ;
    function filterLT(e) {
        let val = 0;
        if (this !== undefined) {
            if (this["number"] !== undefined)
                val = this["number"];
        }
        if (e < val) {
            return true;
        }
        else {
            return false;
        }
    }
    Filters.filterLT = filterLT;
    ;
    function filterEQ(e) {
        let val = 0;
        if (this !== undefined) {
            if (this["number"] !== undefined)
                val = this["number"];
        }
        if (e === val) {
            return true;
        }
        else {
            return false;
        }
    }
    Filters.filterEQ = filterEQ;
    ;
    function compareFilter(e) {
        if (e[this["a"]] === undefined || e[this["b"]] === undefined)
            return false;
        if (e[this["a"]] === e[this["b"]])
            return true;
        return false;
    }
    Filters.compareFilter = compareFilter;
    ;
    function customFilter(e) {
        if (this === undefined)
            throw 'Custom filter without compare metadata.';
    }
    Filters.customFilter = customFilter;
})(Filters = exports.Filters || (exports.Filters = {}));


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Pipeline;
(function (Pipeline) {
    function OR(input, filters) {
        let inputCopy = Object.assign(input);
        let concat = [];
        filters.forEach((f) => {
            let filterResult = inputCopy.filter(f.func, f.args);
            concat = [...concat, ...filterResult];
        });
        return concat;
    }
    Pipeline.OR = OR;
    function AND(input, filters) {
        let inputCopy = Object.assign(input);
        filters.forEach((f) => {
            inputCopy = inputCopy.filter(f);
        });
        return inputCopy;
    }
    Pipeline.AND = AND;
    class Filter {
        constructor(func, args) {
            this.args = args;
            this.func = func;
        }
    }
    Pipeline.Filter = Filter;
})(Pipeline = exports.Pipeline || (exports.Pipeline = {}));


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map