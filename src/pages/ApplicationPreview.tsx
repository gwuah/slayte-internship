import React from "react";
import { Grid, Item } from "semantic-ui-react";

interface Props {
  userData: {
    img: string;
    firstName: string;
    lastName: string;
    email: string;
    firstGoal: string;
    secondGoal: string;
    thirdGoal: string;
  };
}

const ApplicationPreview = (props: Props): JSX.Element => {
  return (
    <div className="view-container">
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Item.Group link>
              <Item>
                <Item.Image size="tiny" src={props.userData.img} />

                <Item.Content>
                  <Item.Header>
                    {props.userData.firstName} {props.userData.lastName}
                  </Item.Header>
                  <Item.Description>
                    <p>Email : {props.userData.email}</p>
                    <p>First Goal: {props.userData.firstGoal}</p>{" "}
                    <p>Second Goal:{props.userData.secondGoal} </p>
                    <p>Third Goal:{props.userData.thirdGoal}</p>
                  </Item.Description>
                </Item.Content>
              </Item>
            </Item.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default ApplicationPreview;
