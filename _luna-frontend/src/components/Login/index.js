import React from 'react'
import axios from '../../libs/axios'

class Login extends React.Component {
  login = () => {
    /* global FB */
    FB.login(
      fbResponse => {
        if (fbResponse) {
          const { accessToken } = fbResponse.authResponse
          console.log(accessToken)

          axios
            .post('http://localhost:8000/accounts/fb-login/', {
              accessToken
            })
            .then(resp => console.log(resp))
        }
      },
      { scope: 'email,public_profile', auth_type: 'rerequest' }
    )
  }
  render() {
    return (
      <div>
        Login <button onClick={() => this.login()}>login</button>
      </div>
    )
  }
}

export default Login
