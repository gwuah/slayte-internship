import React from "react";
import { Button, Grid } from "semantic-ui-react";
import Node from "../shared/lib/Node";
import { OnboardingStatuses } from "../shared/interfaces";

interface Props {
  currentStage: Node | null;
  children: JSX.Element;
  next: () => void;
  prev: () => void;
}

const buttonStyle: React.CSSProperties = {
  width: "100%",
  backgroundColor: "#8b62ff",
  color: "white",
};

class StepWrapper extends React.Component<Props, {}> {
  render(): JSX.Element | null {
    let showProceedButton = false,
      hideButtons = false,
      nextButtonText = "Proceed";
    const { currentStage } = this.props;

    let nextButtonStyle: React.CSSProperties = {
      ...buttonStyle,
    };

    if (currentStage) {
      currentStage.value === OnboardingStatuses.started &&
        (showProceedButton = true);
      currentStage.value === OnboardingStatuses.userGoalsProvided &&
        (nextButtonText = "Finish");
      currentStage.value === OnboardingStatuses.adminEmailsProvided &&
        (hideButtons = true);
      currentStage.value === OnboardingStatuses.userGoalsProvided &&
        (nextButtonStyle = { ...buttonStyle, backgroundColor: "#28b166" });
    }
    return (
      <div id="step-wrapper">
        <div id="view">{this.props.children}</div>
        {!hideButtons && (
          <Grid container columns="equal" stackable>
            {showProceedButton ? (
              <Grid.Row>
                <Grid.Column>
                  <Button style={buttonStyle} onClick={this.props.next}>
                    Proceed
                  </Button>
                </Grid.Column>
              </Grid.Row>
            ) : (
              <Grid.Row>
                <Grid.Column>
                  <Button style={buttonStyle} onClick={this.props.prev}>
                    Back
                  </Button>
                </Grid.Column>
                <Grid.Column>
                  <Button style={nextButtonStyle} onClick={this.props.next}>
                    {nextButtonText}
                  </Button>
                </Grid.Column>
              </Grid.Row>
            )}
          </Grid>
        )}
      </div>
    );
  }
}

export default StepWrapper;
