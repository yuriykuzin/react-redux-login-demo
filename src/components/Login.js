import ReactDOM from 'react-dom'
import React, {
  Component
} from 'react'

export default class Login extends Component {

  onSubmitHandler(e) {
    e.preventDefault()

    if (!this.props.fetching) this.props.submitLogin.submitLogin(
      ReactDOM.findDOMNode(this.refs.loginInput).value,
      ReactDOM.findDOMNode(this.refs.passwordInput).value)
  }
  
  render() {
    const {
      fetching,
      denied,
      logged
    } = this.props
  
    let loginInputStyle = 'loginform__control form-control input-md' + 
      ((denied) ? ' login-denied' : '')
    
    return <div className="container">
      { logged ?
        <div className="logged_msg">
          <span className="logged_msg-text"><span className="glyphicon glyphicon-ok"></span> Successfully logged</span>
        </div>
        :
        <form className="loginform form-horizontal">
          <fieldset>
            <legend className="loginform__legend">
              <span className="glyphicon glyphicon-fire"></span>Login
            </legend>
            <input ref="loginInput" type="text" placeholder="Login" className={loginInputStyle} required="" />
            <input ref="passwordInput" type="password" placeholder="Password" className="loginform__control form-control input-md" required="" />
            <button id="login_btn" className="loginform__btn btn" onClick={this.onSubmitHandler.bind(this)}>
              { fetching ?
                <span className="glyphicon glyphicon-cog"></span>
                :
                <span>Login <span className="loginform__btn__arrow">&#8594;</span></span>
              }
            </button>
          </fieldset>
        </form>
      }
    </div>
  }
}
