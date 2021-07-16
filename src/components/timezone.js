import React, { Component } from 'react'
import Axios from 'axios';
import M from "materialize-css";

export default class timezone extends Component {
    constructor(props) {
        super(props);
        this.state = {            
            time: "",
            timezone: "",
            res:null,
            errors:{
                time:"",
                timezone:""
            },
            hasError:false
        };        
    }    
    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    onSubmit = async (salir = false, e) => {
        e.preventDefault(); 
        const body = {
            time: this.state.time,
            timezone: this.state.timezone >= 0 ? "+"+this.state.timezone : this.state.timezone
        };
        const res = await Axios.post('http://localhost:3000/time', body);
        console.log(res);
        if (res.data.response) {            
            this.setState({
                res: res.data.response
            });
        }else{
             M.toast({
                 html: res.message
             });
        }
            
        
    }

    render() {
        return (
            <div className="row container">
                    < div className = "col s6" >
                        <h4 className="">Time</h4>
                        <div className="card ">
                            <div className="card-content">
                                <form onSubmit={this.onSubmit.bind(this,false)}>
                                    <div className="row">
                                        <div className="input-field col s6">
                                            < input id = "time"
                                            name = "time"
                                            type = "time"
                                            className = "validate"
                                            onChange={this.onChange}
                                            value={this.state.time}/>
                                            <label htmlFor ="time" className ="active">Time</label>
                                        </div>
                                        <div className="input-field col s6">
                                            < input id = "timezone"
                                            name = "timezone"
                                            type = "number"
                                            min="-18"
                                            max="18"
                                            className = "validate"
                                            onChange={this.onChange}
                                            value={this.state.timezone}/>
                                            <label htmlFor ="timezone" className ="active">timezone</label>
                                        </div>
                                    </div>
                                    < div className = "row " >                                        
                                        < div className = "col s6 right-align" >                                            
                                            <button className = "btn"
                                             onClick={this.onSubmit.bind(this,true)}>Enviar</button>                                       
                                        </div>
                                        
                                    </div>
                                </form>                            
                            </div>                            
                        </div>
                    </div>
                    < div className = "col s6" >
                        <h4 className="">Time in UTC</h4>
                        {this.state.res && 
                            < div className = "card " >
                                <div className="card-content">
                                    <p>Time: {this.state.res.time}</p>                                    
                                </div>
                            </div>
                        }
                    </div>
                </div>
        )
    }
}
