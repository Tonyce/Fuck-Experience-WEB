
"use strict";

import React from 'react';
import {render} from 'react-dom';

import WebAPI from '../api/WebAPI';

class SelfInfo extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			infoStr: ""
		}
		// console.log("about card")
	}

	componentDidMount() {

		// check token

		// tong guo token huo qu token zhong de shu ju bing she zhi cookie
		WebAPI.login( "api/selfinfo", data => {
			let loginObj = {}
			try {
				loginObj = JSON.parse(data)
			}catch(e) {
				alert(e)
			}
			
			this.setState({
				infoStr: data
			})
		})
	}

	render() {
		return (
			<div>
				<div className="self-info">
					{this.state.infoStr}
				</div>
			</div>
		)
	}
}

export default SelfInfo