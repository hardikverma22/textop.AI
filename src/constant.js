const apiErrorMessage = "I am having trouble connecting to my AI sister, please try again in sometime!";
const wrongInputMessage = "Something went wrong, please try with new input!";
const emptyWarningMessage = "I would need text to extract Keywords!";
const copyMessage = "Copied to clipboard!";


// summary
const wrongInputForSummary = "OpenAi was not able to summarize your text this time, Pelase try again in sometime";
const emptyWarningMessageForSummary = "I would need text to Summarize for you.";
const emptyWarningMessageForClassification = "I would need text to Classify for you.";
const emptyWarningMessageForSentimentAnalysis = "I would need text to analyze sentiment for you.";
const wrongInputForClassification = "OpenAi was not able to classify your text this time, Pelase try again in sometime";
const wrongInputForSentimentAnalysis = "OpenAi was not able to analyze the sentiment for your text, Pelase try again in sometime";

const tabs = [
    {
        title: "Sentiment Analysis",
        link: "sentiment",
    },
    {
        title: "Classify Text",
        link: "classify",
    },
    {
        title: "Extract Keywords",
        link: "keyext",
    },
    {
        title: "Summarize Text",
        link: "summarize",
    },
];

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
    wrongInputForSentimentAnalysis,
    tabs
}