import axios from "axios";
import { useState } from "react";

import { BiCategoryAlt } from "../../Icons";
import {
  apiErrorMessage,
  emptyWarningMessageForClassification,
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

import { motion } from "framer-motion";
import { container } from "../../motion";

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

      axios
        .post(import.meta.env.VITE_AWS_API_URL + "classification", {
          inputText: text,
          method: "getSummary",
        })
        .then((response) => {
          const data = response.data;

          if (data.statusCode == 200) {
            const classificationData = data.body;
            if (classificationData !== "")
              setClassification(classificationData.trim());
            else {
              dangerToast(wrongInputForClassification);
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
        heading="AI Text Classifier"
        icon={<BiCategoryAlt className="text-2xl" />}
        text="Revolutionize Your Text Classification with OpenAI"
        subheading="Paste in the text below and we will classify it for you"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
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
      </motion.div>
    </Section>
  );
};

export default ClassifyText;
