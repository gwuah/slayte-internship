import React from "react";
import "./App.css";

interface State {
  currentState: string;
}

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = { currentState: "" };
  }

  render(): JSX.Element {
    return <div>Onboarding Flow</div>;
  }
}

export default App;
