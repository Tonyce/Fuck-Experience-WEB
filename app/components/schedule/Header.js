
"use strict";

import React from 'react';
import {render} from 'react-dom';
import { Link } from 'react-router';

import weeker from '../../util/Weeker'

class Header extends React.Component {

	constructor() {
		super();
	}
	
	render() {
		// const { schedule, item } = this.props.params
		// console.log(schedule, item);
		let weekNum = weeker.weeks();
		let year = new Date().getFullYear();
		return (
			<div className="header-nav">
				<h3>Schedule&nbsp;&nbsp;&nbsp;[&nbsp;{year}&nbsp;第{weekNum}周&nbsp;]</h3>
				<div className="header-as flex-layout h-center ">
					<Link to="schedule/1" className="center" activeClassName='animate'>星期一</Link>
					<Link to="schedule/2" className="center" activeClassName='animate'>星期二</Link>
					<Link to="schedule/3" className="center" activeClassName='animate'>星期三</Link>
					<Link to="schedule/4" className="center" activeClassName='animate'>星期四</Link>
					<Link to="schedule/5" className="center" activeClassName='animate'>星期五</Link>
					<Link to="schedule/6" className="center" activeClassName='animate'>星期六</Link>
					<Link to="schedule/0" className="center" activeClassName='animate'>星期天</Link>
				</div>
				
			</div>
		);
	}
}

export default Header