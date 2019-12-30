import React, {Component} from 'react';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu(){
    this.setState({ menu: !this.state.menu })
  }

  componentDidMount() {
  }

  render(){
    const show = (this.state.menu) ? "show" : "" ;
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-default fixed-top">
          <div className="navbar-header">
            <div id="mobile-menu">
              <div className="left-nav-toggle">
                <a href="#">
                  <i className="stroke-hamburgermenu"></i>
                </a>
              </div>
            </div>
            <a className="navbar-brand" href="/">
              NASDAILY
            </a>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <div className="left-nav-toggle">
              <a href="">
                <i className="stroke-hamburgermenu"></i>
              </a>
            </div>
            <form className="navbar-form mr-auto">
              <input type="text" className="form-control" placeholder="Search"></input>
              <i className="fa fa-search"></i>
            </form>
            <ul className="nav navbar-nav">
              <li className="nav-item profil-link">
                <a href="login.html">
                  <span className="profile-address">nas@nasdaily.com</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <aside className="navigation">
          <nav>
            <ul className="nav luna-nav">
              <li className="active">
                <a href="/">Main</a>
              </li>

              <li>
                <a href="#source" aria-expanded="false" onClick={ this.toggleMenu }>
                  Source<span className="sub-nav-icon"> <i className="stroke-arrow"></i> </span>
                </a>
                <ul id="#source" className={"nav nav-second collapse" + show}>
                  <li><a href="/fb-insight"> Facebook</a></li>
                  <li><a href="/ig-insight"> Instagram</a></li>
                </ul>
              </li>
            </ul>
          </nav>
        </aside>
      </div>
    )
  }

}

export default NavBar;
