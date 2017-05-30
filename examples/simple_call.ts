import { FatSecret } from '../src/fatsecret';

// get the fatsecret api keys from the environment
let key = process.env.FATSECRET_CONSUMER_KEY;
let secret = process.env.FATSECRET_CONSUMER_SECRET;

// create a fatsecret api client
let client = new FatSecret.Client(key, secret);

// invoke an api call
/*
let apiMethod = "food.search"
let apiParams: FatSecret.APIParams = {
   "search_expression": "coffee"
};
*/
let apiMethod = "food_categories.get"
let apiParams: FatSecret.APIParams = {};
client.invokeAPI(apiMethod, apiParams, (body: string) => {
   console.log("INVOKE API CALLBACK: body = " + body);
});
