import React from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
} from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";
import { faqItems } from "~/data/data";

const Documents = () => {
  return (
    <div className="flex-grow h-screen p-5 flex items-start justify-start flex-col gap-5">
      <h1 className="text-4xl text-primary font-black mb-4">Dokümantasyon</h1>
      <p className="text-lg text-neutral-600 ">
        Dokümanı okuyarak Loop platformunu nasıl kullanabileceğini
        öğrenebilirsin.
      </p>
      <div className="w-full  bg-white  rounded-lg">
        {faqItems.map((item, index) => (
          <Disclosure key={index}>
            {({ open }) => (
              <>
                <DisclosureButton
                  className={`flex justify-between items-center w-full px-2  py-3 text-left text-lg font-semibold border-b ${
                    open ? "bg-primary-100" : "bg-white"
                  } hover:bg-primary/10`}
                >
                  <span className="text-neutral-600">{item.question}</span>
                  <FiChevronDown
                    className={`transform transition-transform ${
                      open ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </DisclosureButton>
                <Transition
                  enter="transition duration-300 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-200 ease-in"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <DisclosurePanel className="px-2 py-3 text-primary/80 bg-primary/10">
                    {item.answer}
                  </DisclosurePanel>
                </Transition>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
};

export default Documents;
