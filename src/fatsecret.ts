export default class FatSecret {
   // instance variables
   consumerKey: string;
   consumerSecret: string;
   apiUrl: string;
   escapedApiUrl: string;

   constructor(key: string, secret: string) {
      // save the consumer api creds
      this.consumerKey = key;
      this.consumerSecret = secret;
   }

   invokeAPI(apiMethod: string, params: any) {
      // build the oauth api url
      let apiUrl = this.buildUrl(apiMethod, params);

      // invoke the http api call

      // read the response message body
      let body = {};

      // return the response message body

   }

   private buildUrl(apiMethod: string, params: any) {

   }

   private sigEscape(s: string): string {
      s = s.replace(/%7(e|E)/g, '~');
      s = encodeURIComponent(s);
      s = s.replace(/%2(b|B)/g, '%20'); // convert plus back to space
      s = s.replace(/\!/g, '%21');
      s = s.replace(/\\/g, '%27');
      s = s.replace(/\(/g, '%28');
      s = s.replace(/\)/g, '%29');
      s = s.replace(/\*/g, '%2A');
      return s;
   }
}