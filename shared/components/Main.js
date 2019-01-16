import React from 'react';
import { renderRoutes } from 'react-router-config';

class Main extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      userProfile: {}
    };
    this.handleConversation = this.handleConversation.bind(this);
  }

  handleConversation (data) {
    this.setState({ userProfile: data });
  }

  render () {
    return (
      <div>
        {renderRoutes(this.props.routes, { triggerParentHandler: this.handleConversation, userMainProfile: this.state.userProfile })}
      </div>
    );
    // return(
    //   <div>
    //     {renderRoutes(this.props.routes, {triggerParentHandler:this.handleConversation, userMainProfile:this.state.userProfile})}
    //     <div>
    //         <p>{JSON.stringify(this.state.userProfile)}</p>
    //     </div>
    //   </div>
    // );
  }
}

export default Main;
