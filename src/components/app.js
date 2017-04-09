import React, { Component, PropTypes } from 'react';
import { Link, withRouter } from 'react-router';

import NotificationSystem from 'react-notification-system';
import Moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
momentLocalizer(Moment);

import Navbar from './navbar';

class App extends Component {
  state = {
    notificationSystem: null
  };

  getChildContext() {
    const { notificationSystem } = this.state;
    return { notificationSystem };
  }

  componentDidMount() {
    this.setState({ notificationSystem: this.refs.notificationSystem });
  }

  render() {
    return (
      <div className='body'>
        <Navbar router={this.props.router} />
        <div className='container'>
          {this.props.children}
        </div>
        <NotificationSystem ref='notificationSystem'/>
      </div>
    );
  }
}

App.childContextTypes = {
  notificationSystem: PropTypes.object
}

export default withRouter(App);