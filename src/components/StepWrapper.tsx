import React from "react";
import { Button } from "semantic-ui-react";

interface Props {
  children: JSX.Element;
  next: () => void;
}

class StepWrapper extends React.Component<Props, {}> {
  render(): JSX.Element {
    return (
      <div id="step-wrapper">
        <div id="view">{this.props.children}</div>
        <div>
          <Button onClick={this.props.next}>Next</Button>
        </div>
      </div>
    );
  }
}

export default StepWrapper;
