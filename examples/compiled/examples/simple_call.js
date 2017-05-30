"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fatsecret_1 = require("../src/fatsecret");
// get the fatsecret api keys from the environment
let key = process.env.FATSECRET_CONSUMER_KEY;
let secret = process.env.FATSECRET_CONSUMER_SECRET;
// create a fatsecret api client
let client = new fatsecret_1.FatSecret.Client(key, secret);
// invoke an api call
let apiMethod = "foods.search";
let apiParams = {
    "search_expression": "coffee"
};
client.invokeAPI(apiMethod, apiParams, (error, body) => {
    if (error) {
        console.log(`\nError Occurred: ${error}`);
        return;
    }
    // dump the json response body
    console.log(body);
});
//# sourceMappingURL=simple_call.js.map