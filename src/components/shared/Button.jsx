import { AiOutlineLoading3Quarters } from "../../Icons";

const Button = ({ onBtnClick, isLoading, btnText, loadingBtntext }) => {
  return (
    <button
      className="w-full
                bg-teal-500
                text-lg
                h-12
                rounded-lg
                font-medium
                tracking-wider
                hover:border-2
                border border-white
                flex justify-center items-center gap-5
                disabled:bg-gray-600"
      onClick={onBtnClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <AiOutlineLoading3Quarters className="animate-spin" />
          <span>{loadingBtntext}...</span>
        </>
      ) : (
        <span>{btnText}</span>
      )}
    </button>
  );
};

export default Button;
