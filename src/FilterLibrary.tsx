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
        if(this === undefined)
            throw 'No compare metadata.';
        if (_.get(e, this.key) === this.value)
            return true;
        
        return false;
    };
    // export function customFilter(e: object) : boolean {
    //     if(this === undefined)
    //         throw 'Custom filter without compare metadata.';
        
    //     if(this.filters === null)
    //         throw 'Missing properties to filter for.';

    //     // vilken property
    //     this.filters.forEach((f: Function) => {

    //     });
    //     // vilken operation
    //     // vilka värden
    // }
}