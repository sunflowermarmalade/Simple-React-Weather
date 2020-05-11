import React from "react";

const ErrorMessage = (props) => {
  return (
    <div class="ui active dimmer">
      <div class="ui text " style={{ color: "white" }}>
        {props.message}{" "}
      </div>
    </div>
  );
};

export default ErrorMessage;
