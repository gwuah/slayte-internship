import React from "react";
import { Form, Grid, Icon, Button } from "semantic-ui-react";
import {
  handleChangeResponse,
  BasicDetailsErrors,
} from "../../shared/interfaces";

interface Props {
  handleChange: (key: string) => handleChangeResponse;
  errors: BasicDetailsErrors;
}

const EmailInput = ({
  name,
  handleChange,
}: {
  name: string;
  handleChange: (name: string) => handleChangeResponse;
}): JSX.Element => {
  return (
    <React.Fragment>
      <Form.Field>
        <label></label>
        <input
          onChange={handleChange(name)}
          type="text"
          placeholder="Enter Email"
        />
      </Form.Field>
    </React.Fragment>
  );
};

interface State {
  emails: number[];
}

class AdminEmailCollector extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { emails: [1] };
  }

  addAnotherElement = async (): Promise<void> => {
    const { emails } = this.state;
    const count = emails.length;
    await this.setState({ emails: [...emails, count + 1] });
  };

  render(): JSX.Element {
    return (
      <div className="view-container">
        <div className="heading">
          <h1>Way to go!</h1>
        </div>

        <Form>
          <Grid container columns="equal" stackable>
            <Grid.Column>
              <p>
                Let us know who should be admins in your setup and then youre on
                your way
              </p>
            </Grid.Column>
            {this.state.emails.map(
              (key: number): JSX.Element => {
                return (
                  <Grid.Row key={key}>
                    <Grid.Column>
                      <EmailInput
                        name={`${key}`}
                        handleChange={this.props.handleChange}
                      />
                    </Grid.Column>
                  </Grid.Row>
                );
              },
            )}
            <Grid.Column
              style={{
                textAlign: "center",
              }}
            >
              <Button onClick={this.addAnotherElement}>
                <Icon name="plus square" />
              </Button>
            </Grid.Column>
          </Grid>
        </Form>
      </div>
    );
  }
}

export default AdminEmailCollector;
