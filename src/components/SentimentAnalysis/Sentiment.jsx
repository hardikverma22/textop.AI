import axios from "axios";
import { useState } from "react";

import { BiCategoryAlt } from "../../Icons";
import {
  apiErrorMessage,
  emptyWarningMessageForSentimentAnalysis,
  wrongInputForSentimentAnalysis,
} from "../../constant";
import { dangerToast, warningToast } from "../../customToast";
import { container } from "../../motion";

import {
  Button,
  PresentationText,
  Section,
  Summary,
  Textarea,
} from "../../components";

import { motion } from "framer-motion";

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

      axios
        .post(import.meta.env.VITE_AWS_API_URL + "sentiment", {
          inputText: text,
          method: "getSentiments",
        })
        .then((response) => {
          const data = response.data;

          if (data.statusCode == 200) {
            const result = data.body;
            if (result !== "") setSentiment(result.trim());
            else {
              dangerToast(wrongInputForSentimentAnalysis);
            }
            setText("");
            setIsLoading(false);
          } else {
            setIsLoading(false);
            dangerToast(apiErrorMessage);
          }
        })
        .catch((e) => {
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

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
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
      </motion.div>
    </Section>
  );
};

export default Sentiment;
