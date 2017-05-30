"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const querystring = require("querystring");
const crypto = require("crypto");
const request = require("request");
var FatSecret;
(function (FatSecret) {
    // constants
    const FatSecretAPIURL = "http://platform.fatsecret.com/rest/server.api";
    const EscapedFatSecretAPIURL = querystring.escape(FatSecretAPIURL);
    class Client {
        constructor(key, secret) {
            // save the consumer api creds
            this.consumerKey = key;
            this.consumerSecret = secret;
            this.apiUrl = FatSecretAPIURL;
            this.escapedApiUrl = EscapedFatSecretAPIURL;
        }
        invokeAPI(apiMethod, params, cb) {
            // build the oauth api url
            let apiUrl = this.buildUrl(apiMethod, params);
            // invoke the http api call
            request.get(apiUrl, (error, resp, body) => {
                // return the response message body
                if (cb) {
                    cb(error, body);
                }
            });
        }
        buildUrl(apiMethod, params) {
            // get the oauth time parameters
            let ts = new Date().getTime().toString();
            let nonce = this.random(100000, 999999).toString();
            // build the base message
            let msg = {
                method: apiMethod,
                oauth_consumer_key: this.consumerKey,
                oauth_nonce: nonce,
                oauth_signature_method: "HMAC-SHA1",
                oauth_timestamp: ts,
                oauth_version: "1.0",
                format: "json"
            };
            // add the given parameters to the message
            for (var key in params) {
                msg[key] = params[key];
            }
            // create a sorted array of oauth name keys
            let oauthNames = [];
            let i = 0;
            for (var key in msg) {
                oauthNames[i++] = key;
            }
            oauthNames.sort();
            // build the oauth base signature string
            let sigQuery = "";
            for (var name of oauthNames) {
                sigQuery = `${sigQuery}&${name}=${msg[name]}`;
            }
            ;
            sigQuery = sigQuery.substring(1, sigQuery.length);
            sigQuery = this.sigEscape(sigQuery);
            let sigBase = `GET&${this.escapedApiUrl}&${sigQuery}`;
            // generate the oauth sha base64 signature (no token key)
            let consumerSecret = process.env.FATSECRET_CONSUMER_SECRET;
            let oauthSig = this.sign(consumerSecret, "", sigBase);
            // add the oauth signature to the map
            msg["oauth_signature"] = oauthSig;
            oauthNames.push("oauth_signature");
            // re-sort the keys after adding the signature
            oauthNames.sort();
            // build the request url
            let apiUrl = `${this.apiUrl}?`;
            let apiQuery = "";
            for (var key of oauthNames) {
                apiQuery += `&${key}=${this.sigEscape(msg[key])}`;
            }
            apiUrl += apiQuery.substring(1, apiQuery.length);
            // return the api url
            return apiUrl;
        }
        sign(consumerSecret, tokenSecret, msg) {
            // generate the oauth sha1 base64 signature
            var key = `${consumerSecret}&${tokenSecret}`;
            var mac = crypto.createHmac('sha1', key);
            mac.setEncoding('base64');
            mac.write(msg);
            mac.end();
            return mac.read().toString();
        }
        random(low, high) {
            return Math.random() * (high - low) + low;
        }
        sigEscape(s) {
            s = s.replace(/%7(e|E)/g, '~');
            s = encodeURIComponent(s);
            s = s.replace(/\!/g, '%21');
            s = s.replace(/\\/g, '%27');
            s = s.replace(/\(/g, '%28');
            s = s.replace(/\)/g, '%29');
            s = s.replace(/\*/g, '%2A');
            return s;
        }
    }
    FatSecret.Client = Client;
})(FatSecret = exports.FatSecret || (exports.FatSecret = {}));
//# sourceMappingURL=fatsecret.js.map