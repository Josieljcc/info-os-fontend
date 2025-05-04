import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

type BackPageButtonProp = {
  route: string;
};

const BackPageButton = ({ route }: BackPageButtonProp) => {
  return (
    <Link to={route} className="flex">
      <IoArrowBackCircleOutline
        className={` text-white w-8 h-8 md:w-12 md:h-12 absolute top-6 left-4`}
      ></IoArrowBackCircleOutline>
    </Link>
  );
};

export default BackPageButton;
