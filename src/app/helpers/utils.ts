

export class Utils {

    /**
     * @name  createUrl
     * @description creating url with inputJSON
     * @param  {string} rawUrl
     * @param  {any} inputJSON
     * @returns string
     */
    public static createUrl(rawUrl: string, inputJSON: any): string {
        let url = rawUrl;
        for (const key in inputJSON) {
            url = url.replace(new RegExp('{' + key + '}', 'gi'), inputJSON[key]);
        }
        return url;
    }

    /**
     * @name createRequestJSON
     * @description returning final input JSON from inputJSON and apiRequestJSON
     * @param  {any} apiRequestJSON
     * @param  {any} inputJSON
     * @returns any
     */
    public static createRequestJSON(apiRequestJSON: any, inputJSON: any): any {
        // if method type is get then no need to pass input JSON
        if (apiRequestJSON.method === 'GET') {
            apiRequestJSON.params = [];
        }

        const outputJSON: any = {};
        // matching user inputJSON and apiRequestJSON
        for (const key in inputJSON) {
            if (apiRequestJSON.params.includes(key)) {
                outputJSON[key] = inputJSON[key];
            }
        }
        return outputJSON;
    }
}