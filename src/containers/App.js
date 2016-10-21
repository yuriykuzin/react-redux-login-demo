import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Login from '../components/Login'
import * as submitLogin from '../actions/SubmitLogin'

class App extends Component {
  render() {
    const submit = this.props.submitLogin
    const login = this.props.login
    
    return <div>
      <Login fetching={login.fetching} denied={login.denied} logged={login.logged} submitLogin={submit} />
    </div>
  }
}

function mapStateToProps (state) {
  return {
    login: state.login
  }
}

function mapDispatchToProps(dispatch) {
  return {
    submitLogin: bindActionCreators(submitLogin, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
