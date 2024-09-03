import React from "react";
function MyButton() {
  return /*#__PURE__*/React.createElement("button", {
    title: "Learn More",
    color: "#841584"
  }, "I'm a button");
}
function MyApp() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Welcome to my app"), /*#__PURE__*/React.createElement(MyButton, null));
}
export { MyApp, MyButton };
