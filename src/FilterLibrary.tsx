import * as _ from 'lodash';

export module Filters {
    export function filterGT(e: number) {
        let val = 0;

        if (this !== undefined) {
            if (this["number"] !== undefined)
                val = this["number"];
        }

        if (e > 0) {
            return true;
        } else {
            return false;
        }
    };
    export function filterLT(e: number) {
        let val = 0;

        if (this !== undefined) {
            if (this["number"] !== undefined)
                val = this["number"];
        }

        if (e < val) {
            return true;
        } else {
            return false;
        }
    };
    export function filterEQ(e: number) {
        let val = 0;

        if (this !== undefined) {
            if (this["number"] !== undefined)
                val = this["number"];
        }

        if (e === val) {
            return true;
        } else {
            return false;
        }
    };
    export function compareFilter(e: any) {
        if (e[this["a"]] === undefined || e[this["b"]] === undefined)
            return false;
        if (e[this["a"]] === e[this["b"]])
            return true;

        return false;
    };
    export function customFilter(e: object) : boolean {
        if(this === undefined)
            throw 'Custom filter without compare metadata.';
        
        
    }
}