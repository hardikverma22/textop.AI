import { successCopiedToast } from "../../customToast";

const useCopyToClipBoard = () => {
  const copyToClipboard = (content) => {
    navigator.clipboard.writeText(content).then(() => {
      successCopiedToast();
    });
  };

  return { copyToClipboard };
};

export default useCopyToClipBoard;
