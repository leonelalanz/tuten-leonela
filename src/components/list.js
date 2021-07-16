
import React, { Component } from 'react'
import { connect } from "react-redux";
import Axios from 'axios';
import * as moment from 'moment';
import * as numeral from 'numeral';
import M from 'materialize-css';
import pdf from '../pdf/Problema3-listadodedatos.pdf'

const operationValues = [">=","<="];
class list extends Component {
    constructor(){
        super()
        this.state={
            bookings:[],
            notFound:false,
            showFiltro:true,
            filtro:{
                bookingId:"",
                compBookingId: ">=",
                bookingPrice:"",
                compBookingPrice: ">="
            }
        }
    }

    componentDidMount(){
        this.getBookings();
        var elems = document.querySelectorAll('select');
        M.FormSelect.init(elems, {});
    }

    getBookings= async ()=>{
        try {
            const {token} = this.props.userAuthenticated;
            const response = await Axios.get('https://dev.tuten.cl/TutenREST/rest/user/contacto@tuten.cl/bookings?current=true',{
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "adminemail": "testapis@tuten.cl",
                    "token": token,
                    "app": "APP_BCK"

                }
            }); 
            if (response.data && response.data.length>0) {
                this.setState({
                    bookings: response.data
                })                
            }else{
                this.setState({
                    notFound: true
                })
            }           
        } catch (error) {
            this.setState({
                notFound:true
            })
        }

    }
    onChange = e => {
        const {filtro} = this.state;
        filtro[e.target.name] = e.target.value;
        this.setState({
            filtro
        });
    }

    onSubmit=async (e)=>{
        e.preventDefault();
        await this.getBookings();
        const {bookings, filtro}=this.state
        const result = bookings.filter((obj) => {
            if (filtro.bookingId) {
                if (filtro.compBookingId===">=") {
                    if (obj.bookingId < filtro.bookingId) {
                        return false
                    }                    
                } else {
                    if (obj.bookingId > filtro.bookingId) {
                        return false
                    }
                }                
            }
            if (filtro.bookingPrice) {
                if (filtro.compBookingPrice === ">=") {
                    if (obj.bookingPrice < filtro.bookingPrice) {
                        return false
                    }
                } else {
                    if (obj.bookingPrice > filtro.bookingPrice) {
                        return false
                    }
                }
            }
            return true;
        })
        this.setState({
            bookings:result
        })
    }
    resetForm =() =>{
        this.setState({
            filtro: {
                bookingId: "",
                compBookingId: ">=",
                bookingPrice: "",
                compBookingPrice: ">="
            }
        });
        this.getBookings();
    }
    changeShowFiltro=()=>{
        this.setState((state) => {
            return {
                showFiltro: !state.showFiltro
            }
        })
    }

    render() {
        return (
                <div className="card">
                       <a href={pdf}>Enunciado</a>
                    <div className="card-content">
                        <div className="dataTable_filter">
                            <div className="row">
                                <div className="col s12">
                                    <a onClick = {this.changeShowFiltro}>{this.state.showFiltro?"Ocultar":"Mostrar"} Filtro </a>
                                </div>
                            </div>
                            {this.state.showFiltro&&
                            <form action="" onSubmit={this.onSubmit}>
                                <div className="row">
                                    <div className="col s10">
                                        <div className="row">
                                            <div className="input-field col s4">
                                                < select name = "compBookingId"
                                                    onChange={this.onChange}>
                                                    {operationValues.map((obj,index) =>                                                     
                                                            <option key ={index} value = {obj}>
                                                                {obj}</option>
                                                        
                                                        )}
                                                </select>
                                                <label>Comparator</label>
                                        </div>
                                            <div className="input-field col s8">
                                                <input
                                                name = "bookingId"
                                                id = "bookingId"
                                                type = "number"
                                                min="0"
                                                className="validate"
                                                value={this.state.filtro.bookingId}
                                                onChange={this.onChange}/>
                                                <label htmlFor="bookingId" className="active">bookingId</label>
                                            </div> 
                                        </div>
                                        <div className="row">                                            
                                            <div className="input-field col s4">
                                                <select name="compBookingPrice" 
                                                    onChange={this.onChange}>
                                                    {operationValues.map((obj,index) =>                                                     
                                                            <option key ={index} value = {obj}>
                                                                {obj}</option>
                                                        
                                                        )}
                                                </select>
                                                <label>Comparator</label>
                                        </div>
                                        <div className="input-field col s8">
                                            <input
                                                name = "bookingPrice"
                                                id = "bookingPrice"
                                                type = "number"
                                                min="0"
                                                className="validate" value={this.state.filtro.bookingPrice}
                                                onChange={this.onChange}/>
                                                <label htmlFor="bookingPrice" className="active">bookingPrice</label>
                                        </div>  
                                                       
                                </div>
                                    </div>
                                    <div className="col s2">                                        
                                        <div className = "row " >
                                            < div className = "col s12" >
                                                <button type="submit" className = "waves-light btn"> Filtrar</button>
                                            </div>
                                        </div>
                                         <div className = "row " >
                                            < div className = "col s12" >
                                                <button className = "btn waves-light" onClick={this.resetForm}>Limpiar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form> }          
                       </div>
                    {!this.state.notFound?
                       <table className="responsive">
                            <thead>
                            <tr role="row">
                                <th>BookingId</th>
                                <th>Cliente</th>
                                <th>Fecha de Creación</th>              
                                <th width="40%">Dirección</th>              
                                <th>Precio</th>              
                            </tr>
                           
                            </thead>
                            <tbody>
                                {
                                    this.state.bookings.map((obj, i) =>  <tr key={obj.bookingId}>
                                            <td>{obj.bookingId}</td>
                                            <td>{obj.tutenUserClient.firstName+" "+obj.tutenUserClient.lastName}</td>
                                            <td>{moment(obj.bookingTime).format("DD-MM-YYYY")}</td>
                                            <td>{obj.locationId.streetAddress}</td>
                                            <td>{numeral(obj.bookingPrice).format('$0,0.00')}</td>                                            
                                        </tr>
                                    )
                                }          
                            </tbody>
                         
                        </table>
                       :<p>No Encontrado</p> 
                       }                       
                    </div>                    
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userAuthenticated: state.userAuthenticated
    }
}

export default connect(mapStateToProps)(list)