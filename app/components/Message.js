
"use strict";

import React from 'react';
import {render} from 'react-dom';

class Message extends React.Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
	}

	render() {
		return (
			<div>
				<div className="card">
					Message
				</div>

				<div id="main-content" className="flex-layout row">
					<div className="left">
						<img src="http://img5.duitang.com/uploads/item/201408/12/20140812133247_zcLCB.jpeg" />
					</div>

					<div className="right flex-layout column">
						<div>
							<img src="http://img2.duitang.com/uploads/item/201208/18/20120818150713_zarnG.jpeg" />
						</div>
						<div>
							<img src="http://upload.chinaz.com/2015/1222/1450757174825.jpg" />
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Message