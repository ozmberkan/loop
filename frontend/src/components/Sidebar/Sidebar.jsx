import { Link } from "react-router-dom";
import Logo from "~/assets/logo.svg";
import ProfileLink from "../UI/Sidebar/ProfileLink";
import UpperLink from "../UI/Sidebar/UpperLink";
import LowerLink from "../UI/Sidebar/LowerLink";
import { TbMenu } from "react-icons/tb";

const Sidebar = ({ setIsOpen }) => {
  return (
    <div className="min-w-72 max-w-72 p-5 flex flex-col items-start justify-start border-r gap-8 fixed top-0 bg-white h-full">
      <div className="w-full flex justify-between items-center">
        <Link to="/" className="w-full">
          <img src={Logo} className="w-20" alt="Logo" />
        </Link>
        <button className="flex items-center gap-x-2 text-xs text-primary font-bold">
          PRO
          <TbMenu size={24} onClick={() => setIsOpen((prev) => !prev)} />
        </button>
      </div>
      <div className="w-full flex flex-col gap-2 items-start justify-start h-full">
        <UpperLink />
        <hr className="h-px w-full my-5" />
        <LowerLink />
        <ProfileLink />
      </div>
    </div>
  );
};

export default Sidebar;
