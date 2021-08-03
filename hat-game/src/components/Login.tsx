import * as React from 'react';
import socket from '../socket';
import $ from 'jquery';

class Login extends React.Component {
  private __socket = socket;
  state: {error: string};

  constructor(props: any) {
    super(props);
    this.state = {error: ""};
  }

  render() {
    return (
      <div>
        <form onSubmit={(e: React.FormEvent) => {
          e.preventDefault();
          const name = $("#loginName").val() as string;
          const room = $("#loginRoom").val() as string;
          const inputsValid = this.__validateInputs(name, room);
          if (inputsValid) {
            this.__socket.emit("Login.join", {name: name, room: room});
          }
        }}>
          <label htmlFor="loginName">Name: </label>
          <input type="text" id="loginName" name="loginName" maxLength={20}/>
          <br/>
          <label htmlFor="loginRoom">Room: </label>
          <input type="text" id="loginRoom" name="loginRoom" maxLength={20}/>
          <br/>
          <input type="submit" value="Submit"/>
        </form>
        <div>
          {this.state.error}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.__setupHandlers();
  }

  private __setupHandlers() {
    this.__socket.on("Login.duplicateName", () => {
      this.setState({error: "That name is already in use"})
    })
  }

  private __validateInputs(name: string, room: string): boolean {
    let error = "";

    if (name === "") {
      error += "Please enter a name. "
    }

    if (room === "") {
      error += "Please enter a room code. "
    }

    this.setState({error : error});
    return (error === "");
  }
}

export default Login;
