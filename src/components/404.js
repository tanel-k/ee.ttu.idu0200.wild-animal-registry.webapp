import React, { Component } from 'react';
import { Link } from 'react-router';

class NotFoundPage extends Component {
    render() {
        return (
              <div className="jumbotron">
                <h1>404 Not Found</h1> 
                <p>Click <Link to='/'>here</Link> to return to the index.</p>
            </div>
        );
    }
}

export default NotFoundPage;