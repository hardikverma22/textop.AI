import { motion } from "framer-motion";
import { fadeIn } from "../../motion";

const Textarea = ({ isLoading, setText, text }) => {
  return (
    <motion.textarea
      variants={fadeIn()}
      rows={10}
      cols={10}
      value={text}
      onChange={(e) => setText(e.target.value)}
      disabled={isLoading}
      className="w-full 
                bg-gray-200 
                outline-1
                outline
                outline-gray-400 
                border-none 
                rounded-md
                resize-none
                text-black
                p-5
                focus:outline-double
                focus:outline-teal-900
                disabled:bg-gray-400"
    />
  );
};

export default Textarea;
