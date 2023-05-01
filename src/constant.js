const apiErrorMessage = "I am having trouble connecting to my AI sister, please try again in sometime!";
const wrongInputMessage = "Something went wrong, please try with new input!";
const emptyWarningMessage = "I would need text to extract Keywords!";
const copyMessage = "Copied to clipboard!";


// summary
const wrongInputForSummary = "OpenAi was not able to summarize your text this time, Pelase try again in sometime";
const emptyWarningMessageForSummary = "I would need text to Summarize for you.";
const emptyWarningMessageForClassification = "I would need text to Classify for you.";
const emptyWarningMessageForSentimentAnalysis = "I would need text to analyze sentiment for you.";
const wrongInputForClassification = "OpenAi was not able to classify your text this time, Pelase try again in sometime"
const wrongInputForSentimentAnalysis = "OpenAi was not able to analyze the sentiment for your text, Pelase try again in sometime"

export const openAIprompt = {
    model: "text-davinci-003",
    temperature: 0.5,
    max_tokens: 60,
    top_p: 1.0,
    frequency_penalty: 0.8,
    presence_penalty: 0.0,
};

export {
    apiErrorMessage,
    wrongInputMessage,
    emptyWarningMessage,
    copyMessage,
    wrongInputForSummary,
    emptyWarningMessageForSummary,
    emptyWarningMessageForClassification,
    wrongInputForClassification,
    emptyWarningMessageForSentimentAnalysis,
    wrongInputForSentimentAnalysis
}