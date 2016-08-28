import React from 'react';

class Chi2016EventsDaySession extends React.Component {
  render() {
    const {session} = this.props;
    return session ? (
      <div>
        {session.s_title}
      </div>
    ) : null;
  }
}

export default Chi2016EventsDaySession;
