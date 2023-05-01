const Section = ({ children }) => {
  return (
    <section
      className="w-full 
                h-[calc(100vh-3rem)]
                bg-transparent
                flex flex-col justify-center items-center
                text-white
                sm:px-20 px-10 py-10"
    >
      {children}
    </section>
  );
};

export default Section;
