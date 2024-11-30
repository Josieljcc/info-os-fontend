import Logo from "../../../assets/Logo2.png";

const SecondaryBackground = () => {
  return (
    <div className="bg-sky-700 h-[20%] w-full md:w-1/2 md:h-screen md:absolute md:left-0 flex items-center justify-center">
      <img src={Logo} alt="Logo branco da InfoOS" className="hidden md:block" />
    </div>
  );
};

export default SecondaryBackground;