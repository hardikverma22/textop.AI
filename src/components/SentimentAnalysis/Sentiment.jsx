import axios from "axios";
import { useState } from "react";

import { BiCategoryAlt, MdSummarize } from "../../Icons";
import {
  apiErrorMessage,
  emptyWarningMessage,
  emptyWarningMessageForClassification,
  emptyWarningMessageForSentimentAnalysis,
  openAIprompt,
  wrongInputForClassification,
  wrongInputForSummary,
} from "../../constant";
import { dangerToast, warningToast } from "../../customToast";

import {
  Section,
  Button,
  PresentationText,
  Textarea,
  Summary,
} from "../../components";

const Sentiment = () => {
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalysis = () => {
    setSentiment("");
    if (text == "") {
      warningToast(emptyWarningMessageForSentimentAnalysis);
    } else {
      setIsLoading(true);

      const openaiAxios = axios.create({
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
      });

      const prompt = {
        ...openAIprompt,
        prompt: `Analyze the sentiment of the following text:\n\n` + text,
      };

      openaiAxios
        .post(import.meta.env.VITE_OPEN_API_URL, prompt)
        .then((response) => {
          const result = response.data.choices[0].text;
          console.log(result);

          if (result === "") {
            dangerToast(wrongInputForSentimentAnalysis);
          } else {
            setSentiment(result.trim());
            setText("");
            setIsLoading(false);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          dangerToast(apiErrorMessage);
        });
    }
  };

  return (
    <Section>
      <PresentationText
        heading="AI Sentiment Analyzer"
        icon={<BiCategoryAlt className="text-2xl" />}
        text="Understand the Sentiment of Your text with OpenAI-Powered Sentiment Analysis"
        subheading="Paste in the text below and we will analyze the sentiment for you"
      />

      <div
        className="w-full pt-5
                  lg:w-[50%]
                  flex flex-col gap-5"
      >
        {sentiment === "" && (
          <>
            <Textarea isLoading={isLoading} text={text} setText={setText} />
            <Button
              onBtnClick={handleAnalysis}
              isLoading={isLoading}
              btnText="Analyze"
              loadingBtntext="Analyzing..."
            />
          </>
        )}
        {sentiment !== "" && (
          <Summary
            summary={sentiment}
            setSummary={setSentiment}
            btnText="Back to Sentiment Analyzer"
          />
        )}
      </div>
    </Section>
  );
};

export default Sentiment;
