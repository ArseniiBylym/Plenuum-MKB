import React, {Component} from 'react';

import './index.css';

export default class PrivacyPolicy extends Component {
    render() {
        return (
          <iframe
            style={{
              width: '100%',
              height: 'calc(100vh - 6px)',
              overflow: 'scroll'
            }}
            src="https://s3.eu-central-1.amazonaws.com/plenuum-landing/privacy/index.html"
          />
        )
    }
}
