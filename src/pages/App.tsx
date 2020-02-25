import React from "react";
import BasicDetails from "./Onboarding/BasicDetails";
import UserGoals from "./Onboarding/UserGoals";
import AdminEmailCollector from "./Onboarding/AdminEmailCollector";
import ApplicationPreview from "./ApplicationPreview";

interface State {
  onboardingStatus: string;
}

enum OnboardingStatuses {
  started = "onboarding_started",
  basicDetailsProvided = "basic_details_provided",
  userGoalsProvided = "user_goals_provided",
  adminEmailsProvided = "admin_emails_provided",
}

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = { onboardingStatus: "" };
  }

  generateView = (): JSX.Element => {
    const { onboardingStatus } = this.state;

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

  render(): JSX.Element {
    return <div>{this.generateView()}</div>;
  }
}

export default App;
