import React, { PropTypes as T } from 'react'
import ReactDOM from 'react-dom'

import cache from './script-cache'
import GoogleApi from './google-api'

const defaultMapConfig = {}
export const wrapper = (options) => (WrappedComponent) => {
  const apiKey = options.apiKey;
  const libraries = options.libraries || ['places'];

  class Wrapper extends React.Component {
    constructor(props, context) {
      super(props, context);

      this.state = {
        loaded: false,
        google: null,
        mounted: false,
      }
    }

    componentDidMount() {
      const refs = this.refs;
      this.scriptCache.google.onLoad((err, tag) => {
        if (this.mounted) {
          /*
           * If this resolves when
           * the component has not been
           * mounted we get an annoying error.
          */
          this.setState({
            loaded: true,
            google: window.google
          })
        }
      });
    }

    componentWillMount() {
      this.scriptCache = cache({
        google: GoogleApi({
          apiKey: apiKey,
          libraries: libraries
        })
      });

      this.mounted = true;
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    render() {
      const props = Object.assign({}, this.props, {
        loaded: this.state.loaded,
        google: this.state.google
      });

      return (
        <div>
          <WrappedComponent {...props} />
        </div>
      )
    }
  }

  return Wrapper;
}

export default wrapper;
