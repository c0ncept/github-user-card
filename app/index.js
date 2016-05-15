import React from 'react'
import ReactDOM from 'react-dom'
import 'whatwg-fetch'
import Card from 'Card'

const GITHUB_URL = 'https://api.github.com/users/'


class Application extends React.Component {
  constructor() {
    super()
    this.state = {user : {}, repos : []}
    this.loadGitHubUser('linuxenko')
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
    console.log(this.state.user, this.state.repos)
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
