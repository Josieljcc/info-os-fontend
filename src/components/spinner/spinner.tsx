const Spinner = () => {
  return (
    <div className="h-screen  bg-main-bg bg-cover overflow-hidden bg-center flex flex-col justify-center pt-24 px-8 pb-5 items-center">
      <div className="loader animate-spin" />
    </div>
  );
};

export default Spinner;
