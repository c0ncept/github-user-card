import React from 'react'
import Chart from 'chart.js'

Chart.defaults.global = {
  animation: true,
  animationSteps: 50,
  animationEasing: "easeOutBounce",
  scaleLabel: "<%=value%>",
  bezierCurve: true,
  bezierCurveTension: 1,
  scaleIntegersOnly: true,
  scaleBeginAtZero: false,
  maintainAspectRatio: false,
  onAnimationProgress: function() {},
  onAnimationComplete: function() {}
}

class Repo extends React.Component {
  render() {
    let {repo} = this.props
    return (
        <a className="repository" href={repo.html_url}>
          <span className="repo-info">
            <span><i className="fa fa-star"></i>
              <span>{repo.stargazers_count}</span>
            </span>
          </span>
          <span>
            <span className="title">{repo.name}</span>
            <span className="desc">{repo.description}</span>
          </span>
        </a>
    )
  }
}

class DataChart extends React.Component {
  componentDidMount() {
    var lineChartData = {
      labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      datasets: [{
        label: "Growth",
        fillColor: "#7E9BA0",
        strokeColor: "rgba(0,0,0,0)",
        pointColor: "rgba(255, 255, 255, 0)",
        pointStrokeColor: "rgba(255, 255, 255, 0)",
        data: [300, 200, 250, 100, 120, 50, 170, 150, 150, 220, 200, 300]
      }, {
        label: "Loss",
        fillColor: "#f06292",
        pointColor: "rgba(255, 255, 255, 0)",
        pointStrokeColor: "rgba(255, 255, 255, 0)",
        data: [100, 150, 100, 70, 10, 20, 90, 90, 120, 120, 150, 150]
      }]
    };


    var ctx1 = document.getElementById("chart").getContext("2d");
    window.myLine = new Chart(ctx1).Line(lineChartData);

  }
  render() {
    return (
      <div className="chart">
        <canvas id="chart" width="370" height="100" />
      </div>
    )
  }
}


export default class Card extends React.Component {
  render() {
    let repos = this.props.repos
      .sort((a,b) => b.stargazers_count - a.stargazers_count)
      .slice(0,3)
      .map((r,i) => <Repo key={i} repo={r} />)

    return (
        <div className="card">
          <div className="header">

            <a className="userlink" href={this.props.user.html_url}>
              {this.props.user.login}
              <i className="fa fa-link"></i>
            </a>

            <div className="avatar">
              <img src={this.props.user.avatar_url} />
            </div>

            <span className="repos-count">
              {this.props.user.public_repos}
            </span>

            <div className="userinfo">
              <h2>{this.props.user.name || this.props.user.login}</h2>
              <p>{this.props.user.location}</p>
            </div>
          </div>

          <DataChart />

          <div className="super-line">TOP Rated</div>

          <div className="top-repos">
            {repos}
          </div>

          <div className="totals">
            <div>
              {this.props.user.followers}
              <div className="desc">Followers</div>
            </div>
            <div>
              {this.props.user.following}
              <div className="desc">Following</div>
            </div>
          </div>



        </div>
    )
  }
}
