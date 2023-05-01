const PresentationText = ({ icon, heading, text, subheading }) => {
  return (
    <>
      <div className="flex gap-4 items-center justify-center text-gray-900">
        {icon}
        <h1
          className="text-3xl text-gray-900 text-center
                       font-thin text tracking-wide font-Lilita"
        >
          {heading}
        </h1>
      </div>

      <p className="text-lg text-center font-medium text-gray-900 tracking-wide pt-5">
        {text}
      </p>
      <p className="text-md text-center font-medium text-gray-500 tracking-wide pt-5">
        {subheading}
      </p>
    </>
  );
};

export default PresentationText;
