
"use strict";

import React from 'react';
import {render} from 'react-dom';

class Item extends React.Component {

	constructor(props) {
		super(props);
		// console.log(this.props.item)
		this.item = this.props.item;
		this.state = {
			done: this.props.item.done ? true : false,
			choseStyle: {
				color: this.props.item.done ? "#BDBDBD" : "#000000"
			}
		}
	}

	componentWillReceiveProps(nextProps) {
		this.item = this.props.item;
		this.state = {
			done: nextProps.item.done ? true : false,
			choseStyle: {
				color: nextProps.item.done ? "#BDBDBD" : "#000000"
			}
		}
	}

	checkbox(e) {
		this.item.done = e.target.checked
		// console.log(this.item)
		// WebAPI update
		this.setState( {
			done: e.target.checked,
			choseStyle: {
				color: e.target.checked ? "#BDBDBD" : "#000000"
			}
		})
		// this.props.item.done = 
	}

	deleteItem(e){
		let i = this.props.i;
		// console.log("i", i)
		if (this.props.deleteItem) {
			this.props.deleteItem(i, e);
		}
	}

	updateItem() {

	}


	render() {


		return (
			<div className="item flex-layout h-center v-between">
				<div className="flex-layout h-center">
					<input type="checkbox" checked={this.state.done} onChange={ (e) => this.checkbox(e) } />
					<div className="content" style={this.state.choseStyle}>
						完成schedule {this.props.item.content}	
					</div>
				</div>
				<div className="flex-layout h-center">
					<div className="close" onClick={ (e) => this.deleteItem(e)}>×</div>
				</div>
			</div>
		);

	}
}

export default Item