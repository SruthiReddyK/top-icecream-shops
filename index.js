const https = require('https');
const express = require('express');
const app = express();
const path = require('path');

const { API_KEY, PORT } = require('./config');

const options = {
    host: 'api.yelp.com',
    port: 443,
    method: 'GET',
    headers: {
        Authorization: `Bearer ${API_KEY}`
    },
}

const apiRequest = (options, body) => {
    return new Promise((resolve, reject) => {
        const apiReq = https.request(options, apiRes => {
            let result = '';
            apiRes.on('data', (chunk) => {
                result += chunk;
            });

            apiRes.on('end', () => {
                resolve(result);
            });

            apiRes.on('error', err => {
                reject(err);
            });
        });

        apiReq.on('error', err => {
            reject(err);
        });

        //send request
        if (body) {
            apiReq.write(body);
        }
        apiReq.end();
    });
}

app.get('/api/v1/top-ice-cream-shops', async (req, res) => {
    try {
        const searchOptions = { ...options, path: `/v3/businesses/search?term=icecream&limit=5&sort_by=rating&location=Alpharetta` };
        const response = await apiRequest(searchOptions);
        const parsedResponse = JSON.parse(response);
        const finalResponse = await Promise.all(parsedResponse.businesses.map(async record => {
            const reviewOptions = { ...options, path: `/v3/businesses/${record.id}/reviews` };

            /** Get review for the restaurant */
            const reviewResponse = await apiRequest(reviewOptions);
            const parsedReviewResponse = JSON.parse(reviewResponse);

            return {
                ...record,
                ...parsedReviewResponse
            };
        }).reverse());

        res
            .status(200)
            .json(finalResponse);
    } catch (e) {
        res
            .status(500)
            .json(e);
    }
});

app.use(express.static('client/build'));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});