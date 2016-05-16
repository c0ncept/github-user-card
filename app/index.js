import React from 'react'
import ReactDOM from 'react-dom'
import 'whatwg-fetch'
import 'es6-shim'
import Card from 'Card'

const GITHUB_F_USER = typeof GITHUB_USER !== 'undefined' ? GITHUB_USER : 'linuxenko'


const GITHUB_URL = 'https://api.github.com/users/'


class Application extends React.Component {
  constructor() {
    super()
    this.state = {user : {}, repos : []}
    this.loadGitHubUser(GITHUB_F_USER)
  }

  loadGitHubUser(user) {
    Promise.all([
      fetch(GITHUB_URL + user).then(r => r.json()),
      fetch(GITHUB_URL + user + '/repos').then(r => r.json()),
      fetch(GITHUB_URL + user + '/events?per_page=300').then(r => r.json())
    ]).then((resp) => {
      this.setState({user: resp[0], repos : resp[1], events : resp[2]})
    })
  }

  render() {
    let children = this.state.user.hasOwnProperty('login')
      ? <Card user={this.state.user} repos={this.state.repos} events={this.state.events} />
      : <div className="loading"><span></span><span></span><span></span><span></span><span></span></div>

    return (
      <div className="wrapper">
        {children}
      </div>
    )
  }
}

ReactDOM.render(<Application />,
   document.getElementById('application'))
