import React from "react";
import { Form, Grid } from "semantic-ui-react";
import {
  handleChangeResponse,
  BasicDetailsErrors,
} from "../../shared/interfaces";

interface Props {
  handleChange: (key: string) => handleChangeResponse;
  errors: BasicDetailsErrors;
}

const BasicDetails = (props: Props): JSX.Element => {
  const { handleChange, errors } = props;
  const firstNameError = errors.firstNameHasError && {
    content: "Please enter your first name",
    pointing: "below",
  };
  const lastNameError = errors.lastNameHasError && {
    content: "Please enter your last name",
    pointing: "below",
  };
  const emailError = errors.emailHasError && {
    content: "Please enter your email",
    pointing: "below",
  };

  return (
    <div className="view-container">
      <div className="heading">
        <h1>Hi There.</h1>
      </div>
      <Form error>
        <Grid container columns="equal" stackable>
          <Grid.Row>
            <Grid.Column>
              <Form.Field error={firstNameError}>
                <label>First Name</label>
                <input
                  onChange={handleChange("firstName")}
                  type="text"
                  placeholder="John"
                />
              </Form.Field>{" "}
            </Grid.Column>

            <Grid.Column>
              <Form.Field error={lastNameError}>
                <label>Last Name</label>
                <input
                  onChange={handleChange("lastName")}
                  type="text"
                  placeholder="Doe"
                />
              </Form.Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Form.Field error={emailError}>
                <label>Email</label>
                <input
                  onChange={handleChange("email")}
                  type="email"
                  placeholder="random@gmail.com"
                />
              </Form.Field>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </div>
  );
};

export default BasicDetails;
