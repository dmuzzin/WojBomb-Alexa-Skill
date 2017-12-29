'use strict';
// set process.env vars from .env in root
var Alexa = require('alexa-sdk');
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: "qGe5SRlOg9I8K99DLsrmqpeYB",
  consumer_secret: "FFBI2lGppqyX1j1Uv4eD1UajFcCWOHskAdDFzjQ0iAj9XNYYz5",
  bearer_token: "AAAAAAAAAAAAAAAAAAAAAPI93wAAAAAAVpXlvMfTJOXxDI%2FU197JOv91Q4A%3DHsiQTqhdAvXfJc1R7t91F5JiOUPePh61aWMLFPYhKOKuuGVFYY"
});

var APP_ID = 'amzn1.ask.skill.88891f99-0993-436d-8b71-30e0282dba73'; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var SKILL_NAME = 'Woj\'s Tweets';


exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        var welcome = "Welcome to Woj Bomb, the Alexa skill to help you stay up to date with the latest NBA news and rumors. To hear the latest tweets from ESPN analyst Adrian Wojnarowski, say give me a woj bomb.";
        var prompt = "Would you like to hear the latest woj bombs?";
        var reprompt = "Sorry. I didn't catch that. If you would like to hear the latest woj bombs, say give me a woj bomb."
        this.emit(':ask', welcome + prompt, reprompt);
    },
    'WojBombIntent': function () {
				let self = this;
        var speechOutput;
        client.get('search/tweets', { q: 'from:wojespn' }, function(err, tweets, res) {
						var total = tweets.statuses.length
						var i;
						var speechOutput = "Here are the latest Woj bombs. ";
						for(i = 0; i < total; ++i) {
								var t = tweets.statuses[i].text.split("http");
                if (i == 0) {
                    speechOutput = speechOutput + "Woj Bomb. " + t[0].replace("\n\n", "").replace("\n", "") + " ";
                } else if (i == total - 1){
                  speechOutput = speechOutput + "And your final woj bomb. " + t[0].replace("\n\n", "").replace("\n", "") + " That's all. Make sure to stop by later to stay up to date";
                } else {
                    speechOutput = speechOutput + "Another Woj Bomb. " + t[0].replace("\n\n", "").replace("\n", "") + " ";
                }
						}
          	self.emit(':tell', speechOutput);
				});
		},
    'AMAZON.HelpIntent': function () {
        var helpPhrase = "You are using Woj Bomb, the Alexa skill to help you stay up to date with the latest NBA news and rumors. To hear the latest tweets from ESPN analyst Adrian Wojnarowski, say give me a woj bomb. ";
        var prompt = "Would you like to hear the latest woj bombs?";
        var reprompt = "Sorry. I didn't catch that. If you would like to hear the latest woj bombs, say give me a woj bomb."
        this.emit(':ask', helpPhrase + prompt, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    }
};
