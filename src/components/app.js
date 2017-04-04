import React, { Component } from 'react';
import { Link, withRouter } from 'react-router';

import Moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
momentLocalizer(Moment);

import Navbar from './navbar';

class App extends Component {
  render() {
    return (
      <div className='body'>
        <Navbar router={this.props.router} />
        <div className='container'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default withRouter(App);