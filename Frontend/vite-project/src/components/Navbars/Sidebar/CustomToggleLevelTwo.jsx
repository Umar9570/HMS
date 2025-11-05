// src/components/navbars/sidebar/CustomToggleLevelTwo.jsx
import React from "react";
import { useAccordionButton } from "react-bootstrap";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";

export const CustomToggleLevelTwo = ({ children, eventKey }) => {
  const [open, setOpen] = React.useState(false);
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    setOpen(!open)
  );

  return (
    <button
      type="button"
      className="nav-link text-white w-100 text-start px-4 py-2 border-0 bg-dark"
      onClick={decoratedOnClick}
    >
      <span className="flex-grow-1">{children}</span>
      {open ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
    </button>
  );
};
