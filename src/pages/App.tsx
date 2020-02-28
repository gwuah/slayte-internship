import React from "react";
import BasicDetails from "./Onboarding/BasicDetails";
import UserGoals from "./Onboarding/UserGoals";
import AdminEmailCollector from "./Onboarding/AdminEmailCollector";
import StepWrapper from "../components/StepWrapper";
import ApplicationPreview from "./ApplicationPreview";
import Node from "../shared/lib/Node";
import LinkedList from "../shared/lib/LinkedList";
import {
  OnboardingStatuses,
  handleChangeResponse,
  BasicDetailsErrors,
  UserGoalsErrors,
} from "../shared/interfaces";
import "../App.css";

import * as firebase from "firebase";
import * as firebaseui from "firebaseui";
import firebaseConfig from "../shared/firebaseConfig";
import { Grid, Button } from "semantic-ui-react";

interface State {
  authenticated: boolean;
  currentNode: Node | null;
  initialStage: boolean;
  firstName: string;
  lastName: string;
  email: string;
  firstGoal: string;
  secondGoal: string;
  thirdGoal: string;
  adminEmails: string[];
  basicDetailsErrors: BasicDetailsErrors;
  userGoalsErrors: UserGoalsErrors;
  [x: string]:
    | string
    | BasicDetailsErrors
    | string[]
    | Node
    | null
    | boolean
    | UserGoalsErrors;
}

class App extends React.Component<{}, State> {
  _list: LinkedList = new LinkedList();
  _firebase = firebase.initializeApp(firebaseConfig);

  constructor(props: {}) {
    super(props);

    this.state = {
      authenticated: false,
      currentNode: null,
      initialStage: true,
      basicDetailsErrors: {
        firstNameHasError: false,
        lastNameHasError: false,
        emailHasError: false,
      },
      userGoalsErrors: {
        firstGoalHasError: false,
        secondGoalHasError: false,
        thirdGoalHasError: false,
      },
      firstName: "",
      lastName: "",
      email: "",
      firstGoal: "",
      secondGoal: "",
      thirdGoal: "",
      adminEmails: [],
    };
  }

  validateBasicDetails = async (): Promise<boolean> => {
    const { firstName, lastName, email, basicDetailsErrors } = this.state;
    let hasError = false;

    if (!firstName) {
      basicDetailsErrors.firstNameHasError = true;
      hasError = true;
    }
    if (!lastName) {
      basicDetailsErrors.lastNameHasError = true;
      hasError = true;
    }
    if (!email) {
      basicDetailsErrors.emailHasError = true;
      hasError = true;
    }

    await this.setState({ basicDetailsErrors });

    return hasError;
  };

  validateUserGoals = async (): Promise<boolean> => {
    const { firstGoal, secondGoal, thirdGoal, userGoalsErrors } = this.state;
    let hasError = false;

    if (!firstGoal) {
      userGoalsErrors.firstGoalHasError = true;
      hasError = true;
    }
    if (!secondGoal) {
      userGoalsErrors.secondGoalHasError = true;
      hasError = true;
    }
    if (!thirdGoal) {
      userGoalsErrors.thirdGoalHasError = true;
      hasError = true;
    }

    await this.setState({ userGoalsErrors });

    return hasError;
  };

  runValidations = async (): Promise<boolean> => {
    const { currentNode } = this.state;

    if (currentNode) {
      if (currentNode.value === OnboardingStatuses.started) {
        const hasError = await this.validateBasicDetails();
        return hasError;
      }

      if (currentNode.value === OnboardingStatuses.basicDetailsProvided) {
        const hasError = await this.validateUserGoals();
        return hasError;
      }
    }

    return false;
  };

  handleChange = (key: string): handleChangeResponse => {
    return async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
      const value = e.target.value;
      await this.setState({ [key]: value });
      console.log(this.state);
    };
  };

  next = async (): Promise<void> => {
    const { currentNode } = this.state;
    const hasError = await this.runValidations();

    if (currentNode && !hasError) {
      const next = currentNode.next;
      next && (await this.setState({ currentNode: next, initialStage: false }));
    }
  };

  prev = async (): Promise<void> => {
    const { currentNode } = this.state;
    if (currentNode) {
      const prev = currentNode.prev;
      prev && (await this.setState({ currentNode: prev, initialStage: false }));
    }
  };

  generateView = (): JSX.Element => {
    const {
      currentNode,
      basicDetailsErrors,
      userGoalsErrors,
      firstName,
      lastName,
      firstGoal,
      secondGoal,
      thirdGoal,
      email,
    } = this.state;
    const user = JSON.parse(localStorage["firebaseui::rememberedAccounts"]);
    const onboardingStatus = currentNode?.value;

    switch (onboardingStatus) {
      case OnboardingStatuses.started:
        return (
          <BasicDetails
            errors={basicDetailsErrors}
            handleChange={this.handleChange}
          />
        );
      case OnboardingStatuses.basicDetailsProvided:
        return (
          <UserGoals
            firstName={firstName}
            errors={userGoalsErrors}
            handleChange={this.handleChange}
          />
        );
      case OnboardingStatuses.userGoalsProvided:
        return (
          <AdminEmailCollector
            errors={basicDetailsErrors}
            handleChange={this.handleChange}
          />
        );
      case OnboardingStatuses.adminEmailsProvided:
        return (
          <ApplicationPreview
            userData={{
              firstName,
              lastName,
              secondGoal,
              thirdGoal,
              firstGoal,
              email,
              img: user ? user[0].photoUrl : "",
            }}
          />
        );
      default:
        return <div>No Match</div>;
    }
  };

  async componentDidMount(): Promise<void> {
    const existingAccount = localStorage["firebaseui::rememberedAccounts"];

    this._list.insertAtEnd(OnboardingStatuses.started);
    this._list.insertAtEnd(OnboardingStatuses.basicDetailsProvided);
    this._list.insertAtEnd(OnboardingStatuses.userGoalsProvided);
    this._list.insertAtEnd(OnboardingStatuses.adminEmailsProvided);
    await this.setState({
      currentNode: this._list.head,
    });

    if (existingAccount) {
      await this.setState({ authenticated: true });
      return;
    }

    const ui = new firebaseui.auth.AuthUI(this._firebase.auth());

    const uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: (): boolean => {
          this.setState({ authenticated: true });
          return true;
        },
        uiShown: function(): void {
          const loader = document.getElementById("loader");
          if (loader) {
            loader.style.display = "none";
          }
        },
      },
      signInFlow: "popup",
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    };

    ui.start("#firebaseui-auth-container", uiConfig);
  }

  logout = (): void => {
    this._firebase
      .auth()
      .signOut()
      .then(async () => {
        localStorage.clear();
        await this.setState({ authenticated: false });
        window.location.reload();
      });
  };

  render(): JSX.Element {
    const { currentNode, authenticated } = this.state;
    let view: JSX.Element | null;

    if (authenticated) {
      view = (
        <StepWrapper
          currentStage={currentNode}
          prev={this.prev}
          next={this.next}
        >
          <div>
            <Grid container columns="equal" stackable>
              <Grid.Row
                textAlign="right"
                style={{
                  padding: "30px",
                }}
              >
                <Grid.Column>
                  <Button onClick={this.logout}>Logout</Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            {this.generateView()}
          </div>
        </StepWrapper>
      );
    } else {
      view = (
        <div>
          <div
            data-testid="firebaseui-auth-container"
            id="firebaseui-auth-container"
          ></div>
        </div>
      );
    }

    return <div className="App">{view}</div>;
  }
}

export default App;
