import React from "react";
import "./App.css";

interface Props {}

interface State {}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render(): JSX.Element {
    return <div>Onboarding Flow</div>;
  }
}

export default App;
