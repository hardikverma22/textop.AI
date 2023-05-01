import axios from "axios";
import { useState } from "react";

import { BiCategoryAlt } from "../../Icons";
import {
  apiErrorMessage,
  emptyWarningMessageForClassification,
  openAIprompt,
  wrongInputForClassification,
} from "../../constant";
import { dangerToast, warningToast } from "../../customToast";

import {
  Button,
  PresentationText,
  Section,
  Summary,
  Textarea,
} from "../../components";

const ClassifyText = () => {
  const [text, setText] = useState("");
  const [classification, setClassification] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClassify = () => {
    setClassification("");
    if (text == "") {
      warningToast(emptyWarningMessageForClassification);
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
        prompt:
          `Classify this text and Please provide
          the predicted classification label for this text:\n\n` + text,
      };

      openaiAxios
        .post(import.meta.env.VITE_OPEN_API_URL, prompt)
        .then((response) => {
          const result = response.data.choices[0].text;
          console.log(result);

          if (result === "") {
            dangerToast(wrongInputForClassification);
          } else {
            setClassification(result.trim());
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
        heading="AI Text Classifier"
        icon={<BiCategoryAlt className="text-2xl" />}
        text="Revolutionize Your Text Classification with OpenAI"
        subheading="Paste in the text below and we will classify it for you"
      />

      <div
        className="w-full pt-5
                  lg:w-[50%]
                  flex flex-col gap-5"
      >
        {classification === "" && (
          <>
            <Textarea isLoading={isLoading} text={text} setText={setText} />
            <Button
              onBtnClick={handleClassify}
              isLoading={isLoading}
              btnText="Classify"
              loadingBtntext="Classifying..."
            />
          </>
        )}
        {classification !== "" && (
          <Summary
            summary={classification}
            setSummary={setClassification}
            btnText="Back to Classifier"
          />
        )}
      </div>
    </Section>
  );
};

export default ClassifyText;
