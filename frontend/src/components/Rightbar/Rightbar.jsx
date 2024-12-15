import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import Pro from "../UI/Rightbar/Pro";
import { Link, useNavigate } from "react-router-dom";
import { IoIosMore } from "react-icons/io";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import axios from "axios";
import {
  getUserById,
  getUserByUsername,
  resetUser,
} from "~/redux/slices/usersSlice";
import { useDispatch } from "react-redux";

const Rightbar = ({ isOpen }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState(""); // Search query
  const [people, setPeople] = useState([]); // User list

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const users = await axios.get(
        `${import.meta.env.VITE_MAIN_URL}/api/auth/getAllUsers`
      );
      setPeople(users.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredPeople =
    query === ""
      ? people?.users
      : people?.users?.filter((person) =>
          person?.username?.toLowerCase().includes(query?.toLowerCase())
        );

  const goToProfile = (username) => {
    dispatch(resetUser());
    navigate(`/profile/${username}`);
    dispatch(getUserByUsername(username));
  };

  return (
    <div
      className={`h-full bg-white border-l shadow-lg transform transition-all duration-500 ease-in-out ${
        isOpen ? "w-80" : "w-0"
      }`}
      style={{ overflow: isOpen ? "visible" : "hidden" }}
    >
      <div
        className={`flex flex-col items-start justify-start gap-4 p-5 ${
          isOpen ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
      >
        {isOpen && (
          <>
            <Combobox
              as="div"
              className="w-full"
              value={query}
              onChange={(value) => {
                setQuery(value);
                goToProfile(value);
              }}
            >
              <div className="flex items-center gap-x-2 border rounded-xl px-4 h-10">
                <FiSearch />
                <ComboboxInput
                  className="h-full w-full outline-none"
                  placeholder="Kullanıcı ara..."
                  onChange={(e) => setQuery(e.target.value)}
                  value={query}
                />
              </div>
              <ComboboxOptions className="absolute bg-white border rounded-md shadow-lg mt-1 max-h-60 w-44 overflow-y-auto w-full">
                {filteredPeople.length > 0 ? (
                  filteredPeople.map((person) => (
                    <ComboboxOption
                      key={person.id}
                      value={person.username}
                      className={({ active }) =>
                        `cursor-pointer px-4 py-2 ${
                          active ? "bg-primary text-white" : ""
                        }`
                      }
                    >
                      {person.username}
                    </ComboboxOption>
                  ))
                ) : (
                  <div className="px-4 py-2 text-neutral-600 ">
                    Kullanıcı bulunamadı
                  </div>
                )}
              </ComboboxOptions>
            </Combobox>
            <Pro />
            <div className="h-full bg-neutral-100 w-full rounded-md flex justify-center items-center text-sm text-neutral-600 shadow">
              Reklam Panosu
            </div>
            <div className="mt-auto w-full">
              <Link
                to="/more"
                className="w-full px-4 py-2 text-sm flex gap-x-2 rounded-md bg-zinc-50 font-semibold text-neutral-500 border hover:bg-zinc-100 justify-between items-center"
              >
                Daha fazlası için tıklayın
                <IoIosMore size={20} />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Rightbar;
