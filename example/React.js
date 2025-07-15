import React, { useState } from "react";
const MyButton = () => {
  return /*#__PURE__*/React.createElement("button", null, "I'm a button");
};
const MyApp = () => {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Welcome to my app"), /*#__PURE__*/React.createElement(MyButton, null));
};
const STATUS = {
  HOVERED: 'hovered',
  NORMAL: 'normal'
};
const CheckboxWithLabel = ({
  labelOn = true,
  labelOff = false
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const onChange = () => {
    setIsChecked(!isChecked);
  };
  return /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: isChecked,
    onChange: onChange
  }), isChecked ? labelOn : labelOff);
};
const Link = ({
  URL = ''
}) => {
  const [status, setStatus] = useState(STATUS.NORMAL);
  const onMouseEnter = () => {
    setStatus(STATUS.HOVERED);
  };
  const onMouseLeave = () => {
    setStatus(STATUS.NORMAL);
  };
  return /*#__PURE__*/React.createElement("a", {
    className: status,
    href: URL || '#',
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave
  });
};
export { MyApp, MyButton, STATUS, CheckboxWithLabel, Link };
