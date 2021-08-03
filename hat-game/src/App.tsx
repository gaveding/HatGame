import * as React from 'react';
import socket from './socket';
import './App.css';
import Login from './components/Login';
import UserList from './components/UserList';
import Content from "./components/Content";
import Chat from "./components/Chat";

class App extends React.Component {
  private __socket = socket;
  state: {joined: boolean};

  constructor(props: any) {
      super(props);
      this.state = {
        joined: false
      };
  }

  render() {
    if (this.state.joined) {
      return this.__mainContent();
    }
    else {
      return this.__login();
    }
  }

  componentDidMount() {
    this.__setupHandlers();
  }

  private __login(): React.ReactNode {
    return (
      <div>
        <Login />
      </div>
    );
  }

  private __mainContent(): React.ReactNode {
    return (
      <div id="mainRow">
        <UserList />
        <Content />
        <Chat />
      </div>
    );
  }

  private __setupHandlers(): void {
    this.__socket.on("App.joined", () => {
      this.setState({joined: true});
    });
  }
}

export default App;
