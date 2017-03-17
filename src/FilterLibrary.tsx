import { Utils } from './Utils';

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
        if(this === undefined || this.key === undefined || this.value === undefined)
            return false;
        if (Utils.get(e, this.key) === this.value)
            return true;
        
        return false;
    };
}