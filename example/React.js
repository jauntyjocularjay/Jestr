import React from "react";
function MyButton() {
    return (React.createElement("button", null, "I'm a button"));
}
function MyApp() {
    return (React.createElement("div", null,
        React.createElement("h1", null, "Welcome to my app"),
        React.createElement(MyButton, null)));
}
export { MyApp, MyButton };
//# sourceMappingURL=React.js.map