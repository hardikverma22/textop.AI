const axios = require("axios");

exports.handler = (event, context, callback) => {

    console.log({ customEvent: event });

    if (!(event.inputText)) {
        let response = {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify({ error: 'Input was not in the correct format' })
        };

        console.log(response)

        return callback(null, response);
    }


    if (!event.inputText || event.inputText == "") {
        let response =
        {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify({ error: 'Input was not in the correct format' })
        };

        console.log(response)

        return callback(null, response);
    }


    const client = axios.create({
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + process.env.OPENAI_API_KEY,
        },
    });

    const params = {
        model: "text-davinci-003",
        prompt: "Extract keywords from this text. Make the first letter of every word uppercase and separate with commas: " +
            event.inputText,
        temperature: 0.5,
        max_tokens: 60,
        top_p: 1.0,
        frequency_penalty: 0.8,
        presence_penalty: 0.0,
    };

    client
        .post(process.env.OPENAI_API_URL, params)
        .then((res) => {
            const generatedKeywords = res?.data?.choices[0]?.text?.trim();

            const keywordArray = generatedKeywords?.split(",");

            let response = {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
                body: keywordArray
            };
            console.log(response)

            return callback(null, response);
        })
        .catch((err) => {
            let response = {
                statusCode: 400,
                headers: {
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
                body: JSON.stringify({ error: 'Error generating keywords.', fullError: JSON.stringify(err) })
            };

            console.log(response)

            return callback(null, response);
        });
};