import React, { Component } from 'react'
import {Link, withRouter } from "react-router-dom"
import M from 'materialize-css';

import { connect } from "react-redux";
import clearUserAuth from "../redux/actions/clearUserAuth";

class Navigation extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount() {
            let elems = document.querySelectorAll('.dropdown-trigger');
            M.Dropdown.init(elems, {
                inDuration: 300,
                outDuration: 225
            });
    }
    logout = () =>{
        this.props.clearUserAuth(); 
        this.props.history.push("/");       
    }
    login = () =>{
        this.props.history.push("/login");       
    }
    render() {                
        return (
            [
                <ul id = "dd_menu" className = "dropdown-content" key={1}>
                    <li><Link to="/time">Problema # 2</Link></li>
                    <li><Link to="/login">Problema # 3</Link></li>
                    <li><Link to="/list">Problema # 4</Link></li>
                </ul>,
                               
                 <nav className="blue accent-3" role="navigation" key={2}>
                    <div className="nav-wrapper container">
                        <Link id="logo-container" to="/" className="brand-logo">PRUEBA PRÁTICA TUTEN</Link>
                    <ul className="right hide-on-med-and-down">
                       {this.props.userAuthenticated.isAuthenticated ? 
                       <li>
                           <a className="dropdown-trigger" href="#!" 
                           data-target="dd_menu" onClick={this.logout}>
                               {
                                   this.props.userAuthenticated.userAuthenticated.email
                               }
                            <i className="material-icons right">exit_to_app</i></a>
                       </li>
                       :<li>
                           <a onClick={this.login}>
                               Login</a>
                        </li>
                        }
                    </ul>
                    <Link to="#" data-target="nav-mobile" className="sidenav-trigger">
                        <i className="material-icons">menu</i></Link>
                    </div>                    
                </nav>
            ]            
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userAuthenticated: state.userAuthenticated
    }
}

const mapDispatchToProps = {    
    clearUserAuth
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navigation))
