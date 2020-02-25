import React from "react";

interface Props {
  children: JSX.Element;
}

class StepWrapper extends React.Component<Props, {}> {
  render(): JSX.Element {
    return (
      <div id="step-wrapper">
        <div id="view">{this.props.children}</div>
      </div>
    );
  }
}

export default StepWrapper;
