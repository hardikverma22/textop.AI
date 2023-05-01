import axios from "axios";
import { useState } from "react";

import { MdSummarize } from "../../Icons";
import {
  apiErrorMessage,
  emptyWarningMessage,
  emptyWarningMessageForSummary,
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

const SummarizeText = () => {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const openAIprompt = {
    model: "text-davinci-003",
    prompt:
      "Summarize the following text into few words.To ensure accuracy, please make sure to include the most important information and ideas from the original text. Also Format the text:\n\n" +
      text +
      "",
    temperature: 0.5,
    max_tokens: 60,
    top_p: 1.0,
    frequency_penalty: 0.8,
    presence_penalty: 0.0,
  };

  const handleSummarize = () => {
    setSummary("");
    if (text == "") {
      warningToast(emptyWarningMessageForSummary);
    } else {
      setIsLoading(true);

      const openaiAxios = axios.create({
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
      });

      openaiAxios
        .post(import.meta.env.VITE_OPEN_API_URL, openAIprompt)
        .then((response) => {
          const result = response.data.choices[0].text;
          console.log(result);

          if (result === "") {
            dangerToast(wrongInputForSummary);
          } else {
            setSummary(result);
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
        icon={<MdSummarize className="text-4xl font-extrabold" />}
        heading="AI Text Summarizer"
        text="Get to the essence of any text with our AI-powered text summarizer."
        subheading="Paste in the text below and we will summarize it for you"
      />
      <div
        className="w-full pt-5
                  lg:w-[50%]
                  flex flex-col gap-5"
      >
        {summary === "" && (
          <>
            <Textarea isLoading={isLoading} text={text} setText={setText} />
            <Button
              onBtnClick={handleSummarize}
              isLoading={isLoading}
              btnText="Summarize"
              loadingBtntext="Summarizing..."
            />
          </>
        )}
        {summary !== "" && (
          <Summary
            summary={summary}
            setSummary={setSummary}
            btnText="Back to Summarizer"
          />
        )}
      </div>
    </Section>
  );
};

export default SummarizeText;
