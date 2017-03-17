export module Utils {
    export function get(object: any, path: string) {
        let p = path.
            replace(/\[/g, '.').
            replace(/\]/g, '').
            split('.');

        let returnV = p.reduce((o, k) => {
            if (o[k] === null || o[k] === undefined)
                return {};
            return o[k];
        }, object);

        return returnV;
    }
    export function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
}