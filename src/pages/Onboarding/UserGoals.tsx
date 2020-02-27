import React from "react";
import { Form, Grid } from "semantic-ui-react";
import { handleChangeResponse, UserGoalsErrors } from "../../shared/interfaces";

interface Props {
  handleChange: (key: string) => handleChangeResponse;
  errors: UserGoalsErrors;
  firstName: string;
}

const UserGoals = (props: Props): JSX.Element => {
  const { handleChange, errors, firstName } = props;
  const firstGoalError = errors.firstGoalHasError && {
    content: "Please enter a goal",
    pointing: "below",
  };
  const secondGoalError = errors.secondGoalHasError && {
    content: "Please enter a goal",
    pointing: "below",
  };
  const thirdGoalError = errors.thirdGoalHasError && {
    content: "Please enter a goal",
    pointing: "below",
  };

  return (
    <div className="view-container">
      <div className="heading">
        <h1>Hi {firstName}</h1>
      </div>

      <Form>
        <Grid container columns="equal" stackable>
          <Grid.Column>
            <p>What are your main goals with Slayte?</p>
          </Grid.Column>
          <Grid.Row>
            <Grid.Column>
              <Form.Field error={firstGoalError}>
                <label>Goal 1</label>
                <input
                  onChange={handleChange("firstGoal")}
                  type="text"
                  placeholder="First goal"
                />
              </Form.Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Form.Field error={secondGoalError}>
                <label>Goal 2</label>
                <input
                  onChange={handleChange("secondGoal")}
                  type="text"
                  placeholder="Second Goal"
                />
              </Form.Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Form.Field error={thirdGoalError}>
                <label>Goal 3</label>
                <input
                  onChange={handleChange("thirdGoal")}
                  type="text"
                  placeholder="Third Goal"
                />
              </Form.Field>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </div>
  );
};

export default UserGoals;
