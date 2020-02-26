import React from "react";
import BasicDetails from "./Onboarding/BasicDetails";
import UserGoals from "./Onboarding/UserGoals";
import AdminEmailCollector from "./Onboarding/AdminEmailCollector";
import StepWrapper from "../components/StepWrapper";
import ApplicationPreview from "./ApplicationPreview";
import Node from "../shared/lib/Node";
import LinkedList from "../shared/lib/LinkedList";

interface State {
  currentNode: Node;
}

enum OnboardingStatuses {
  started = "onboarding_started",
  basicDetailsProvided = "basic_details_provided",
  userGoalsProvided = "user_goals_provided",
  adminEmailsProvided = "admin_emails_provided",
}

class App extends React.Component<{}, State> {
  _list: LinkedList = new LinkedList();

  constructor(props: {}) {
    super(props);
    this._list.insertAtEnd(OnboardingStatuses.started);
    this._list.insertAtEnd(OnboardingStatuses.basicDetailsProvided);
    this._list.insertAtEnd(OnboardingStatuses.userGoalsProvided);
    this._list.insertAtEnd(OnboardingStatuses.adminEmailsProvided);

    this.state = { currentNode: this._list.head as Node };
  }

  next = async (): Promise<void> => {
    const { currentNode } = this.state;
    const next = currentNode.next;
    next && (await this.setState({ currentNode: next }));
  };

  generateView = (): JSX.Element => {
    const { currentNode } = this.state;
    const onboardingStatus = currentNode.value;

    switch (onboardingStatus) {
      case OnboardingStatuses.started:
        return <BasicDetails />;
      case OnboardingStatuses.basicDetailsProvided:
        return <UserGoals />;
      case OnboardingStatuses.userGoalsProvided:
        return <AdminEmailCollector />;
      case OnboardingStatuses.adminEmailsProvided:
        return <ApplicationPreview />;
      default:
        return <div>No Match</div>;
    }
  };

  // async componentDidMount(): Promise<void> {}

  render(): JSX.Element {
    return (
      <div>
        <StepWrapper next={this.next}>{this.generateView()}</StepWrapper>
      </div>
    );
  }
}

export default App;
