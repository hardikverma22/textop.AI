import { useState } from "react";
import { VscSymbolKeyword } from "../../Icons";

import {
  apiErrorMessage,
  emptyWarningMessage,
  wrongInputMessage,
} from "../../constant";
import { dangerToast, warningToast } from "../../customToast";

import axios from "axios";

import {
  Section,
  Button,
  PresentationText,
  Textarea,
  Keywords,
} from "../../components";

const ExtractKeyword = () => {
  const [text, setText] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleExtractKeywords = async () => {
    setKeywords([]);
    if (text == "") {
      warningToast(emptyWarningMessage);
    } else {
      setIsLoading(true);

      axios
        .post(import.meta.env.VITE_AWS_API_URL, {
          inputText: text,
        })
        .then((response) => {
          const data = response.data;

          if (data.statusCode == 200) {
            const keywordArray = data.body;

            if (keywordArray && keywordArray.length == 0) {
              dangerToast(wrongInputMessage);
            } else {
              setKeywords(keywordArray);
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
    <>
      <Section>
        <PresentationText
          icon={<VscSymbolKeyword className="text-3xl font-extrabold" />}
          heading="AI Keyword Extractor"
          subheading="Paste in the text below and we will extract the keywords for you"
          text="Catalyze Your Text Analysis: Streamline Keyword Extraction with OpenAI"
        />

        <div
          className="w-full 
                  lg:w-[50%]
                  flex flex-col gap-5 mt-5"
        >
          {keywords && keywords.length == 0 && (
            <>
              <Textarea isLoading={isLoading} text={text} setText={setText} />
              <Button
                onBtnClick={handleExtractKeywords}
                btnText="Extract Keywords"
                loadingBtntext="Extracting"
                isLoading={isLoading}
              />
            </>
          )}

          {keywords && keywords.length != 0 && (
            <>
              <Keywords keywords={keywords} setKeywords={setKeywords} />
            </>
          )}
        </div>
      </Section>
    </>
  );
};

export default ExtractKeyword;
