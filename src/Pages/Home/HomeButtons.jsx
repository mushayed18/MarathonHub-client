const HomeButtons = () => {
  return (
    <div className="flex gap-3 mt-14">
      <button className="p-4 px-8 rounded-full bg-sky-500 text-gray-800 hover:bg-sky-200">
        Get Started
      </button>
      <button className="p-4 px-8 rounded-full border border-white text-white hover:bg-sky-500 hover:text-gray-800">
        Learn more
      </button>
    </div>
  );
};

export default HomeButtons;
