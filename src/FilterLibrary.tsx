export module Filters {
    export function filterGT (e: any) {
        if (e.num > 0) {
            return true;
        } else {
            return false;
        }
    };
    export function filterLT (e: any) {
        if (e.num < 0) {
            return true;
        } else {
            return false;
        }
    };
    export function filterEQ (e: any) {
        if (e.num === 0) {
            return true;
        } else {
            return false; }
    }; 
    export function dynamicFilter (e: any) {
        if (this.e === 'tejj')
            return true;

        return false;
    };
}