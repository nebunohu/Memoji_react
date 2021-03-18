import React, {Component} from 'react';

class UserInfo extends Component {
    render() {
        return (
            <div className="userInfo">
                Player: {this.props.playerName}
            </div>
        );
    }
};

export default UserInfo;