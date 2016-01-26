
"use strict";

import React from 'react';
import {render} from 'react-dom';

import topicStore from '../../stores/topicStore';

class Header extends React.Component {

	constructor() {
		super();
		this._changeTitle = this._changeTitle.bind(this);
		this.state = {
			title: "Topic",
			author: "",
			image: ""
		}
	}

	componentDidMount() {
		// console.log(this.props.location)
		topicStore.addChangeListener("changeHeader", this._changeTitle)
	}

	componentWillUnmount() {
		topicStore.removeChangeListener("changeHeader", this._changeTitle)
	}

	_changeTitle(value) {
		// console.log(value)
		if (typeof value === "object") {
			this.setState( {
				title: value.title,
				author: value.author,
				image: value.image
			})
		}else {
			this.setState( {
				title: value,
				author: "",
				image: ""
			})	
		}
	}

	render() {
		if (this.state.author) {
			return (
				<div>
					<h2>{this.state.title}</h2>
					<div className="header-as flex-layout h-center">
						<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
						<img src={this.state.image} />
						<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
						<span>{this.state.author}</span>
						<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
						<span>2016-01-21</span>
					</div>
				</div>
			)
		}else {
			return (
				<div>
					<h2>{this.state.title}</h2>
				</div>
			)
		}
	}
}

export default Header