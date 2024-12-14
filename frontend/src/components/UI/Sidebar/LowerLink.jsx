import React from "react";
import { NavLink } from "react-router-dom";
import { LowerLinks } from "~/data/data";

const LowerLink = () => {
  return (
    <div className="w-full flex flex-col gap-2 items-start justify-start h-full ">
      {LowerLinks.map((link) => (
        <NavLink
          id={link.id}
          key={link.id}
          to={link.to}
          className={({ isActive }) =>
            `flex items-center gap-3 w-full font-semibold py-2.5 rounded-xl px-4 text-base ${
              isActive
                ? "bg-primary text-white"
                : "hover:bg-zinc-100 text-neutral-700"
            }`
          }
        >
          <link.icon size={20} />
          <span>{link.label}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default LowerLink;
