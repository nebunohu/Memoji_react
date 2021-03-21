import React, {Component} from 'react';

class UserInfo extends Component {
    render() {
        return (
            <div className="userInfo">
                Player: <span className="userInfo__name">{this.props.playerName}</span>
            </div>
        );
    }
};

export default UserInfo;