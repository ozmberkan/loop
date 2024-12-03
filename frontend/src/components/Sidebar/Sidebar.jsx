import { Link } from "react-router-dom";
import Logo from "~/assets/logo.svg";
import ProfileLink from "../UI/Sidebar/ProfileLink";
import UpperLink from "../UI/Sidebar/UpperLink";
import LowerLink from "../UI/Sidebar/LowerLink";

const Sidebar = () => {
  return (
    <div className="min-w-64 max-w-64 p-5 flex flex-col items-start justify-start border-r gap-8">
      <Link to="/" className="w-full">
        <img src={Logo} className="w-20" alt="Logo" />
      </Link>
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
