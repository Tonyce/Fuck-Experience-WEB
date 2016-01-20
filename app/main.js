'use strict';


import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { browserHistory, Router, IndexRoute, IndexRedirect, Route, Link } from 'react-router';


import IndexHeader from './components/index/Header';
import AboutHeader from './components/about/Header';
import ScheduleHeader from './components/schedule/Header';

import IndexMain from './components/index/Main';
import AboutMain from './components/about/Main';
import ScheduleMain from './components/schedule/Main';
import ScheduleItem from './components/schedule/Item';

import Footer from './components/Footer';

import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import WebAPI from './api/WebAPI'

import './main.css'


class SingIn extends React.Component {

	constructor() {
		super()

		this.state = {
			name: "",
			src: ""
		}
	}


	componentDidMount() {

		// check token

		// tong guo token huo qu token zhong de shu ju bing she zhi cookie
		WebAPI.login( "api/login", data => {
			var loginObj = {}
			try {
				loginObj = JSON.parse(data)
			}catch(e) {
				alert(e)
			}
			var userName = loginObj.userName || "";
			var image = loginObj.image || "";
			document.cookie = "name=" + userName + "; path=/fuckexperience";
			document.cookie = "image=" + image + "; path=/fuckexperience"
			this.shouldBeLogin()	
		})
	}

	shouldBeLogin() {
		let cookieObj = parseCookie()
		if (cookieObj.name && cookieObj.image) {
			this.setState ({
				name: cookieObj.name,
				src: cookieObj.image
			})

			localStorage.setItem('login', true);
		}else {
			localStorage.setItem('login', false);	
		}
		
		window.addEventListener('storage', (e) => {
			// console.log(e);
			cookieObj = parseCookie()
			// console.log(cookieObj);
			if (cookieObj.name && cookieObj.image) {
				this.setState ({
					name: cookieObj.name,
					src: cookieObj.image
				})
			}
		})
	}

	componentWillUnmount() {
		console.log("WillUnmount")
	    // mainStore.removeChangeListener( this._onChange );
	}

	singOut() {

		WebAPI.login( "api/logout", data => {
			var loginObj = {}
			try {
				loginObj = JSON.parse(data)
			}catch(e) {
				alert(e)
			}
			var userName = loginObj.userName || "";
			var image = loginObj.image || "";
			document.cookie = "name=" + userName + "; path=/fuckexperience";
			document.cookie = "image=" + image + "; path=/fuckexperience"
			// this.shouldBeLogin()	
			localStorage.setItem('login', false);
			this.setState ({
				name: userName,
				src: image
			})
		})
	}

	render() {
		let name = this.state.name;
		let src = this.state.src;
		// alert(src);
		// <IconMenu
		// 	iconButtonElement={
		// 		<IconButton><MoreVertIcon /></IconButton>
		// 	}
		// 	targetOrigin={{horizontal: 'right', vertical: 'top'}}
		// 	anchorOrigin={{horizontal: 'right', vertical: 'top'}}
		// 	>
		// 	<div className="info-card">
		// 		<MenuItem primaryText="Sign out" />
		// 	</div>
		// </IconMenu>
		if (name) {
			return (
				<div className="user-info center">
					<a className="center">消息&nbsp;&nbsp;</a>
					<img src={this.state.src} />
					<span className="center" > 
						{name}
					</span>
					<a className="center" onClick={ ()=>this.singOut() }>
						&nbsp;&nbsp;&nbsp;&nbsp;QUIT
					</a>					
				</div>
			)
		}else {

			return (
				<div>
					<a className="center" href="/fuckexperience/api/github" target="_blank" > 
						SING IN
					</a>
				</div>
			)
		}
	}
}

class Nav extends React.Component {
	
	constructor() {
		super();
		// this._changeHeader = this._changeHeader.bind(this);
	}


	changeHeader(event) {
		// alert("changeHeader")
		// console.log("nav")
		// console.log(event)
		if (this.props.changeHeader) {
			this.props.changeHeader(event);
		}
	}

	locationToAuth() {
		window.location.href='/fuckexperience/api/github';
	}

	render() {
		return (
			<nav className="flex-layout h-center v-between">
				<div>
					<Link className="center" to="/">FuckExperience</Link>
				</div>
				<div className="center">
					<Link className="center" to="/about" activeClassName='animate' 
						onClick={ this.changeHeader.bind(this) }>
						ABOUT
					</Link>
					<Link className="center" to="/schedule" activeClassName='animate' 
						onClick={ (event) => this.changeHeader(event) }>
						SCHEDULE
					</Link>

					<SingIn />
				</div>	

				
			</nav>
		);
	}
}

Nav.propTypes = { 
	changeHeader: React.PropTypes.func
};

class Header extends React.Component {

	constructor() {
		super();
		this.state = {
			bg: "#00BCD4",
			animateStyle: {}
		}
	}

	componentDidMount() {

	}
	
	componentWillMount() {
		this.stepTime = 20;
		this.docBody = document.body;
		this.focElem = document.documentElement;
	}

	animatedCircle (x, y , bg, speed) {
		let header = document.getElementsByTagName('header')[0];
		let width = header.clientWidth;
    	let height = header.clientHeight;

    	// alert(`${width}, ${x}, ${y}`)

		let r = Math.sqrt(width * width + height * height);

		let animateStyle = {
			backgroundColor: bg,
			left: x,
			top: y,
			width: (r * 2),
			height: (r * 2),
			marginLeft: -r,
			marginTop: -r,
			transition: 'all 0.5s linear'
		}

		this.setState({
			animateStyle: animateStyle
		});

		let timer = setTimeout(() => {
			this.setState({
				bg: bg,
				animateStyle: {},
				headerNav: {
					opacity: 1.0
				}
			})
			clearTimeout(timer);
		}, 500);
	}

	changeBg(event) {
		this.setState({
			headerNav: {
				opacity: 0.0
			}
		})
		let bg = this.state.bg === "#607D8B" ? "00BCD4" : "#607D8B"
		this.animatedCircle( event.pageX, event.pageY, bg, 1000);
	}

	render() {
		return (
			<header id="header" style={{ backgroundColor: this.state.bg}}>
				<Nav changeHeader={ (event) => this.changeBg(event) }/>
				<div className="header-nav">
					{ this.props.children }
				</div>
				<div className="circle" style={this.state.animateStyle}></div>
			</header>
		)
	}
}


class App extends React.Component {
	render() {
		
		let { header, main } = this.props;
		main = <div id="main" key={this.props.location.pathname}>{main}</div>;
		
		return (
			<div>
				
				<Header>
					{header}
				</Header>

			 	<ReactCSSTransitionGroup
					component="div"
					transitionName="example"
					transitionEnterTimeout={500}
					transitionLeaveTimeout={500}>
						{ main }
				</ReactCSSTransitionGroup>

				<Footer />
				
			</div>
		)
	}
}

ReactDOM.render((
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<IndexRoute components={{ main: IndexMain }}></IndexRoute>
			<Route path="about" components={{ header: AboutHeader, main: AboutMain }}></Route>
			<Route path="schedule" components={{ header: ScheduleHeader, main: ScheduleMain }}>
				<IndexRedirect to="day1" />
				<Route path=":item" component={ScheduleItem} />
			</Route>
		</Route>
	</Router>
), document.getElementById('app'))


function parseCookie (){
	var cookieObjs = document.cookie.split(";");

	var cookieObj = {};

	for (var i = 0; i < cookieObjs.length; i++) {
		var searchObjStr = cookieObjs[i];
		var key = searchObjStr.split("=")[0];
		key = key.replace(/\s+/g,'');
		var value = searchObjStr.split("=")[1];
		cookieObj[key] = value;
	};
	return cookieObj
}
