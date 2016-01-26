
"use strict";

import React from 'react';
import {render} from 'react-dom';

class Header extends React.Component {

	constructor() {
		super();
	}

	render() {
		return (
			<div>
				<h6>还没有做响应式，还请在大屏上使用；</h6>
				<h6>目前开发调试只在Chrome上，Safari上有适配问题。</h6>
			</div>
		);
	}
}

export default Header