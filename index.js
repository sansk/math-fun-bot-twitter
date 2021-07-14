require('dotenv').config();
const Twitter = require('twitter');
const axios = require('axios');

const client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

function start() {
    let d = new Date();
    let tDate = d.getDate();
    let tMnth = d.getMonth();
    let tHrs = d.getHours();

    if (tHrs > 4 && tHrs <= 6) {
        client.post('statuses/update', { status: `Good Morning Twitter! 🌄🌄\n\n Have a Wonderfull Day!` },
            function (error, tweet, response) {
                if (error) throw error;
                console.log('Morning 4 & 6');
            });
    } else if (tHrs > 6 && tHrs <= 10) {
        axios(`http://numbersapi.com/${tMnth}/${tDate}/date`).then(Response => {
            return Response.data;
        }).then((data) => {
            client.post('statuses/update', { status: `${data}` },
                function (error, tweet, response) {
                    if (error) throw error;
                    console.log('Morning 6 & 10');
                })
        });
    } else {
        axios(`http://numbersapi.com/random/math`).then(Response => {
            return Response.data;
        }).then((data) => {
            client.post('statuses/update', { status: `${data}` },
                function (error, tweet, response) {
                    if (error) throw error;
                    console.log('Rest of the day!');
                })
        });
    };
}

// start everything
start();
setInterval(() => {
    start();
}, 1000 * 60 * 60 * 2);