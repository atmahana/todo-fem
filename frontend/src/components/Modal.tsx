import React, { MouseEvent, useEffect, useRef } from "react";
import { dark } from "@clerk/themes";
import { SignIn } from "@clerk/clerk-react";
import { useTheme } from "../ThemeContext";
import IconCross from "../assets/icon-cross.svg";

interface ModalProps {
  openModal: boolean;
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ openModal, closeModal }) => {
  const { theme } = useTheme();
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    }

    if (openModal) {
      document.addEventListener("click", () => handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", () => handleOutsideClick);
    };
  }, [openModal, closeModal]);

  useEffect(() => {
    if (openModal) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [openModal]);

  return (
    <dialog ref={modalRef} onClose={closeModal} className="bg-transparent">
      <div className="w-full flex justify-end">
        <button onClick={closeModal} className="p-1.5 mr-8">
          <img src={IconCross} />
        </button>
      </div>
      <div>
        <SignIn
          appearance={{
            baseTheme: theme === "dark" ? dark : undefined,
            elements: {
              card: "bg-foreground",
              formButtonPrimary: "bg-primary rounded-md",
              footerActionLink: "text-primary",
              formFieldInput__identifier: "rounded-md bg-background border-muted",
            },
          }}
        />
      </div>
    </dialog>
  );
};

export default Modal;
