import React, { Component } from 'react'
import {Link } from "react-router-dom" 
import pdf from '../pdf/Leonelalanz-Problema1.pdf'

export default class home extends Component {
    render() {
        return (
            <div>
                <ul className="collection">
                    <li className="collection-item"><a href={pdf}>Problema # 1 Stack Postgres/Java8/React</a></li>
                    <li className="collection-item"><Link to="/time">Problema  # 2 Servicio REST</Link></li>
                    <li className="collection-item"><Link to="/login">Problema # 3 Site acceso Login</Link></li>
                    <li className="collection-item"><Link to="/list">Problema  # 4 Listado de datos</Link></li>
                </ul>
           
           

            </div>
        )
    }
}
