import * as React from 'react';
import socket from '../socket';

class UserList extends React.Component {
  private __socket = socket;
  state : {users: string[]};

  constructor(props: any) {
    super(props);
    this.state = {users: []};
  }

  render() {
    return (
      <div>
        <span>Users</span>
        <ul>
          {this.state.users.map( (userName: string) => {
            return <li key={userName}>{userName}</li>
          })}
        </ul>
      </div>
    );
  }

  componentDidMount() {
    this.__setupHandlers();
  }

  private __setupHandlers(): void {
    this.__socket.on("UserList.update", (users: string[]) => {
      this.setState((_prevState: {users: string[]}) => {
        return {users: users}
      });
    });
  }
}

export default UserList;
