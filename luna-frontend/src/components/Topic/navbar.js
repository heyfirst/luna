import React from 'react'
import '../../static/css/bootstrap.min.css'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { actions as userAction } from '../../ducks/reducers/topic'

const NavbarDark = styled.nav`
    background-color: #0F1D33;
    padding: 0px !important; 
` 

const NavbarUl = styled.ul`
    height: 49px;
    margin-left: 60px;
`

const NavbarProfile = styled.ul`
    margin-right: 60px;
`

const NavbarLi = styled.li`
    border-bottom: solid #47C9D1; 
    border-bottom-width: thick;
`

const NavbarLink = styled.a`
    margin: 0px;
    color: #47C9D1 !important;
`

const ImgProfile = styled.img`
    height: 34px;
    width: 34px;
`

class Navbar extends React.Component {

    state = {
        loading: false,
        users: {}
    }

    async componentDidMount() {
        const user = await this.props.getUser().payload
        this.setState({
            users: user
        })
    }

    render() {
        return  <NavbarDark className="navbar navbar-expand-sm navbar-dark" >
            <div className="container-fluid">
            <NavbarUl className="navbar-nav">
                <NavbarLi className="nav-item">
                    <NavbarLink className="nav-link" href="/topic"> Problem </NavbarLink>
                </NavbarLi>
                <li className="nav-item">
                    <a className="nav-link" href="#">Challenge</a>
                </li>
            </NavbarUl>
            <NavbarProfile className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        <ImgProfile src="https://sdm.ulm.ac.id/uploads/no_pict.png" alt="icon-user" className="rounded-circle"/>    
                        &nbsp; { this.state.users.userName }
                    </a>
                </li>
            </NavbarProfile>
            </div>
        </NavbarDark>
    }
}

export default connect(
    u => ({
        user: u.user
    }),
    {
        getUser: userAction.getUser
    }
)(Navbar)