// src/components/navbars/sidebar/CustomToggle.jsx
import React from "react";
import { useAccordionButton } from "react-bootstrap";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";

export const CustomToggle = ({ children, eventKey, icon }) => {
  const [open, setOpen] = React.useState(false);
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    setOpen(!open)
  );

  return (
    <button
      type="button"
      className="nav-link text-white d-flex align-items-center w-100 text-start px-4 py-2 border-0 bg-dark"
      onClick={decoratedOnClick}
    >
      {icon && <span className="me-2 fs-6">{icon}</span>}
      <span className="flex-grow-1">{children}</span>
      {open ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
    </button>
  );
};
