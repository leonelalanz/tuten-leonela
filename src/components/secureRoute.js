import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux'

 class secureRoute extends Component {
     constructor(props){
         super(props)
     }

    isAuthenticate = () => {
            const {userAuthenticated} = this.props;          
            if (userAuthenticated && userAuthenticated.isAuthenticated) {
                return true;
            }
            return false
    }   
    render() {
        const { component: Component, ...props } = this.props

        return (
        <Route 
            {...props} 
            render={props => (
            this.isAuthenticate() ?
                <Component {...props} />
                :<Redirect to='/login' />
            )} 
        />
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userAuthenticated: state.userAuthenticated
    }
}

export default connect(mapStateToProps)(secureRoute);
