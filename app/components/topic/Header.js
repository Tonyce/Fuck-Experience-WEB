
"use strict";

import React from 'react';
import {render} from 'react-dom';

import topicStore from '../../stores/topicStore';

class Header extends React.Component {

	constructor() {
		super();
		this._changeTitle = this._changeTitle.bind(this);
		this.state = {
			title: "Topic"
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
		// console.log(value);
		this.setState( {
			title: value
		})
	}

	render() {
		return (
			<div>
				<h2>{this.state.title}</h2>
			</div>
		);
	}
}

export default Header