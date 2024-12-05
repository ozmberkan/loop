import React from "react";
import { NavLink } from "react-router-dom";
import { UpperLinks } from "~/data/data";

const UpperLink = () => {
  return (
    <div className="w-full flex flex-col gap-2 items-start justify-start  ">
      {UpperLinks.map((link) => (
        <NavLink
          key={link.id}
          to={link.to}
          id={link.id}
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

export default UpperLink;
