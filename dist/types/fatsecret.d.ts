export declare namespace FatSecret {
    interface APIParams {
        [index: string]: string;
    }
    interface APICallback {
        (body: string): void;
    }
    class Client {
        consumerKey: string;
        consumerSecret: string;
        apiUrl: string;
        escapedApiUrl: string;
        constructor(key: string, secret: string);
        invokeAPI(apiMethod: string, params: APIParams, cb: APICallback): void;
        private buildUrl(apiMethod, params);
        private sign(consumerSecret, tokenSecret, msg);
        private random(low, high);
        private sigEscape(s);
    }
}
