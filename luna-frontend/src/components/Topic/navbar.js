import React from 'react'
import '../../static/css/bootstrap.min.css'

export default class Navbar extends React.Component {

    render() {
        return  <nav class="navbar navbar-expand-sm navbar-dark" style={{ padding: 0, backgroundColor: '#0F1D33' }}>
            <div class="container">
            <ul class="navbar-nav">
                <li class="nav-item" style={{ borderBottom: 'solid #47C9D1', borderBottomWidth: 'thick'}}>
                    <a class="nav-link" href="/topic" style={{ color: '#47C9D1' }}>Problem</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Challenge</a>
                </li>
            </ul>
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a class="nav-link" href="#">
                    <img src="https://sdm.ulm.ac.id/uploads/no_pict.png" alt="icon-user" class="rounded-circle" height="34" width="34"/>    
                    &nbsp; Profile
                    </a>
                </li>
            </ul>
            </div>
        </nav>
    }
}