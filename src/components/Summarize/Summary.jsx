import useCopyToClipBoard from "../hooks/useCopyToClipBoard";
import { AgainButton, CopyClipboard } from "../../components";

const Summary = ({ summary, setSummary, btnText }) => {
  const { copyToClipboard } = useCopyToClipBoard();

  return (
    <>
      <div className="relative">
        <CopyClipboard onCopy={() => copyToClipboard(summary)} />
        <p
          className="text-gray-900 border-2 border-gray-300
                        p-10 rounded-lg bg-teal-100 font-medium text-lg shadow-lg"
        >
          {summary}
        </p>
        <AgainButton btnText={btnText} onClick={() => setSummary("")} />
      </div>
    </>
  );
};

export default Summary;
