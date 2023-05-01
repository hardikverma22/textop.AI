import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className="flex flex-col items-center justify-center
                    px-10 py-10 max-w-lg md:h-[calc(100vh-3rem)] md:max-w-5xl mx-auto"
    >
      <h1
        className="md:text-6xl text-4xl leading-[4rem] font-extrabold
                    text-primary text-center"
      >
        Unleash the Power of Words with{" "}
        <span
          className="md:text-7xl text-5xl font-extrabold
                    bg-gradient-to-r from-teal-600 via-cyan-400 to-teal-400
                    text-transparent bg-clip-text"
        >
          Textop.AI{" "}
          <span className="text-primary md:text-6xl text-4xl">and</span> OpenAI
        </span>
      </h1>

      <h2 className="mt-5 text-xl font-bold text-gray-500 text-center">
        Extract, Analyze, Summarize, and Classify for Better Content Creation!
      </h2>
      <p className="mt-10 max-w-lg md:max-w-3xl text-lg font-extralight tracking-wider leading-7 text-gray-600 text-center">
        Textop.AI is the ultimate language tool for content creators. With
        advanced features like keyword extraction, sentiment analysis, text
        summarization, and text classification, our platform helps you craft
        more effective and impactful messaging. Say goodbye to time-consuming
        manual analysis and hello to smarter, more efficient content creation
        with Chat GPT.
      </p>

      <div className="flex gap-5 justify-center items-center mt-10 flex-col md:flex-row">
        <div className="flex flex-col justify-center items-center gap-5">
          <span
            className="uppercase 
                      text-xl text-teal-800
                      font-Lilita tracking-wider"
          >
            Categorization
          </span>
          <div className="flex gap-3 flex-col md:flex-row">
            <Link
              to={`sentiment`}
              className="cursor-pointer
             bg-teal-400 text-lg font-Josefin tracking-wider text-white text-center
             rounded-md p-2
            hover:bg-teal-700/80 duration-500 hover:shadow-sm"
            >
              Sentiment Analysis
            </Link>
            <Link
              to={`classify`}
              className="cursor-pointer
                     bg-teal-400 text-lg font-Josefin tracking-wider text-white text-center
                      rounded-md p-2
                      hover:bg-teal-700/80 duration-500 hover:shadow-sm"
            >
              Classify Text
            </Link>
          </div>
        </div>
        <div className="md:h-32 md:w-1 h-1 w-36 rounded-lg bg-gray-400" />
        <div className="flex flex-col justify-center items-center gap-5">
          <span
            className="uppercase 
                      text-xl text-teal-800
                      font-Lilita tracking-wider"
          >
            Distillation
          </span>
          <div className="flex gap-3 flex-col md:flex-row">
            <Link
              to={`keyext`}
              className="cursor-pointer
                     bg-teal-400 text-lg font-Josefin tracking-wider text-white text-center
                      rounded-md p-2
                      hover:bg-teal-700/80 duration-500 hover:shadow-sm"
            >
              Extract Keywords
            </Link>
            <Link
              to={`summarize`}
              className="cursor-pointer
                     bg-teal-400 text-lg font-Josefin tracking-wider text-white text-center
                      rounded-md p-2
                      hover:bg-teal-700/80 duration-500 hover:shadow-sm"
            >
              Summarize Text
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
