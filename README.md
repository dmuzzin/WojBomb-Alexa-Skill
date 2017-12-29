# WojBomb-Alexa-Skill
This is a basic Alexa skill to read off the latest 15 tweets for a given user. In this example I read tweets from ESPN NBA analyst Adrian Wojnarowski, but you can modify the query to get another user's tweets.

WHAT YOU WILL NEED:
- Node.js: https://nodejs.org/en/download/
- A valid Twitter app. After getting the keys/callback URL, go into index.js and paste them there.
- Use this site to retrieve the bearer token (https://gearside.com/nebula/utilities/twitter-bearer-token-generator/)
- A valid AWS account that is registered for Alexa development.

STEPS TO TAKE:
- Get your applications consumer key/secret from the twitter API, as well as generate the bearer token with the link above, and replace the relevant fields in the code with those.
- Replace the query parameter with whichever user's tweets you want read.
- Follow the Amazon guide on creating a fact-based Alexa skill to set-up all necessary AWS/Alexa accounts.
- Note #1: Make sure you use "npm" to install the alexa and twitter node modules in your project directory
- Note #2: When generating your lambda function... select the upload .zip option. Don't generate this zip from the command line.... Highlight all your project files in the finder window --> right click --> compress, to make sure you are compressing in the correct format.
