import React from "react";
import { Form, Grid } from "semantic-ui-react";

const basicDetailsContainerStyle: React.CSSProperties = {
  padding: "40px",
};

class BasicDetails extends React.Component<{}, {}> {
  render(): JSX.Element {
    return (
      <div style={basicDetailsContainerStyle}>
        <Form>
          <Grid container columns="equal" stackable>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label>First Name</label>
                  <input type="text" placeholder="John" />
                </Form.Field>{" "}
              </Grid.Column>

              <Grid.Column>
                <Form.Field>
                  <label>Last Name</label>
                  <input type="text" placeholder="Doe" />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label>Email</label>
                  <input type="email" placeholder="random@gmail.com" />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </div>
    );
  }
}

export default BasicDetails;
