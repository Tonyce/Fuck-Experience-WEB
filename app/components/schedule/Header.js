
"use strict";

import React from 'react';
import {render} from 'react-dom';
import { Link } from 'react-router';

class Header extends React.Component {

	constructor() {
		super();
	}

	weeks() {
		let num = Math.round((this.getFour() - this.getFirstFour()) / 3600000 / 7 / 24) + 1
		if ( num > 0 ) {
			return num
		}else {
			return 0
		}
	}	

	getFirstFour () {
		let date = new Date();
		date.setDate(1);
		date.setMonth(0);
		let firstDay = date.getDay();
		if (firstDay === 0) {
			firstDay = 7;
		}
		let chaDay = 7 - ( 4 - firstDay ) - 1;
		date.setDate(chaDay);
		date.setHours(0);
		date.setMinutes(0);
		date.setSeconds(0);
		return date
	}

	getFour () {
		let d = new Date();
		let date = d.getDate()
		let firstDay = d.getDay();
		if (firstDay === 0) {
			firstDay = 7;
		}
		let chaDay = 4 - firstDay;
		d.setDate( date + chaDay);
		d.setHours(0);
		d.setMinutes(0);
		d.setSeconds(0);
		return d	
	}

	

	render() {
		// const { schedule, item } = this.props.params
		// console.log(schedule, item);
		let weekNum = this.weeks();
		let year = new Date().getFullYear();
		return (
			<div>
				<h3>Schdule&nbsp;&nbsp;&nbsp;[&nbsp;{year}&nbsp;第{weekNum}周&nbsp;]</h3>
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