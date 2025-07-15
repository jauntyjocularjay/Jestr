import React from "react";
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
const CheckboxWithLabel = () => {
  return /*#__PURE__*/React.createElement("label", null, " 'a label'", /*#__PURE__*/React.createElement("input", {
    type: "checkbox"
  }));
};
const Link = () => {
  return /*#__PURE__*/React.createElement("a", {
    className: "link",
    href: "https://github.com"
    // onMouseEnter={onMouseEnter}
    // onMouseLeave={onMouseLeave}
  });
};
export { MyApp, MyButton, STATUS, CheckboxWithLabel, Link };
