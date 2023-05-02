import axios from "axios";
import { useState } from "react";

import { MdSummarize } from "../../Icons";
import {
  apiErrorMessage,
  emptyWarningMessageForSummary,
  wrongInputForSummary,
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

const SummarizeText = () => {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSummarize = () => {
    setSummary("");
    if (text == "") {
      warningToast(emptyWarningMessageForSummary);
    } else {
      setIsLoading(true);

      axios
        .post(import.meta.env.VITE_AWS_API_URL + "summary", {
          inputText: text,
          method: "getSummary",
        })
        .then((response) => {
          const data = response.data;

          if (data.statusCode == 200) {
            const summary = data.body;
            if (summary !== "") setSummary(summary);
            else {
              dangerToast(wrongInputForSummary);
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
        icon={<MdSummarize className="text-4xl font-extrabold" />}
        heading="AI Text Summarizer"
        text="Get to the essence of any text with our AI-powered text summarizer."
        subheading="Paste in the text below and we will summarize it for you"
      />
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
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
      </motion.div>
    </Section>
  );
};

export default SummarizeText;
