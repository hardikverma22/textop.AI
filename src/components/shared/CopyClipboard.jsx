import { FiCopy } from "../../Icons";

const CopyClipboard = ({ onCopy }) => {
  return (
    <div>
      <FiCopy
        onClick={onCopy}
        className="absolute top-5 right-5
                          text-3xl text-teal-950
                          hover:scale-105 hover:text-teal-800 duration-200
                          peer"
      />
      <span
        className="hidden peer-hover:flex justify-center items-center
                            absolute top-4 -right-[2.75rem]
                            text-white bg-black
                            rounded-md p-2"
      >
        Copy
      </span>
    </div>
  );
};

export default CopyClipboard;
