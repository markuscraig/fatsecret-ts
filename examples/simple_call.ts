import { FatSecret } from '../src/fatsecret';

// get the fatsecret api keys from the environment
let key = process.env.FATSECRET_CONSUMER_KEY;
let secret = process.env.FATSECRET_CONSUMER_SECRET;

// create a fatsecret api client
let client = new FatSecret.Client(key, secret);

// invoke an api call
let apiMethod = "foods.search"
let apiParams: FatSecret.APIParams = {
   "search_expression": "coffee"
};

client.invokeAPI(apiMethod, apiParams, (error: Error, body: string) => {
   if (error) {
      console.log(`\nError Occurred: ${error}`);
      return;
   }

   // dump the json response body
   console.log(body);
});
