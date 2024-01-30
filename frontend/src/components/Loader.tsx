import { FC } from "react";
import LoaderIcon from "../assets/loader.svg";

const Loader: FC = () => {
  return (
    <div className="bg-foreground rounded-md p-5 shadow-sm grid place-content-center">
      <img src={LoaderIcon} alt="Loader icon" />
    </div>
  );
};

export default Loader;
