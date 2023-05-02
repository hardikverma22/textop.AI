const axios = require("axios");

const params = {
    model: "text-davinci-003",
    temperature: 0.5,
    max_tokens: 60,
    top_p: 1.0,
    frequency_penalty: 0.8,
    presence_penalty: 0.0,
};

exports.handler = (event, context, callback) => {
    console.log({ customEvent: event.path });

    if (!event.method || !event.inputText) {
        let response = {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify({ error: "Invalid request parameters" }),
        };

        console.log(response);

        return callback(null, response);
    }

    var promptMessage = "";

    switch (event.method) {
        case "getKeywords":
            getKeywords(event, callback);
            break;
        case "getSummary":
            promptMessage = "Summarize the following text into few words.To ensure accuracy, please make sure to include the most important information and ideas from the original text. Also Format the text:\n\n";
            getEverythingElse(event, callback, promptMessage);
            break;
        case "getSentiments":
            promptMessage = "Analyze the sentiment of the following text:\n\n";
            getEverythingElse(event, callback, promptMessage);
            break;
        case "getClassificaton":
            promptMessage = "Classify this text and Please provide the predicted classification label for this text:\n\n";
            getEverythingElse(event, callback, promptMessage);
            break;
        default:
            let response = {
                statusCode: 400,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify({ error: "Invalid method parameter" }),
            };

            console.log(response);

            return callback(null, response);
    }
};

function getKeywords(event, callback) {
    const client = axios.create({
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + process.env.OPENAI_API_KEY,
        },
    });

    const openAIparams = {
        ...params,
        prompt:
            `Extract keywords from this text.
             Make the first letter of every word uppercase and separate with commas: ` +
            event.inputText
    };

    client
        .post(process.env.OPENAI_API_URL, openAIparams)
        .then((res) => {
            const generatedKeywords = res?.data?.choices[0]?.text?.trim();

            const keywordArray = generatedKeywords?.split(",");

            let response = {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                },
                body: keywordArray,
            };
            console.log(response);

            return callback(null, response);
        })
        .catch((err) => {
            let response = {
                statusCode: 400,
                headers: {
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                },
                body: JSON.stringify({
                    error: "Error generating keywords.",
                    fullError: JSON.stringify(err),
                }),
            };

            console.log(response);

            return callback(null, response);
        });
}

function getEverythingElse(event, callback, promptMessage) {
    const client = axios.create({
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + process.env.OPENAI_API_KEY,
        },
    });


    const openaiPrompt = { ...params, prompt: promptMessage + event.inputText };


    client
        .post(process.env.OPENAI_API_URL, openaiPrompt)
        .then((res) => {
            const summaryText = res?.data?.choices[0]?.text?.trim();

            let response = {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                },
                body: summaryText,
            };
            console.log(response);

            return callback(null, response);
        })
        .catch((err) => {
            let response = {
                statusCode: 400,
                headers: {
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                },
                body: JSON.stringify({
                    error: "Error generating keywords.",
                    fullError: JSON.stringify(err),
                }),
            };

            console.log(response);

            return callback(null, response);
        });
}
