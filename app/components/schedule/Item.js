
"use strict";

import React from 'react';
import {render} from 'react-dom';
import WebAPI from '../../api/WebAPI';

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
		let checked = e.target.checked
		this.item.done = checked
		let id = this.item._id;
		// console.log(checked);
		WebAPI.setDone(id, checked, (data) => {
			console.log(data)
			data = JSON.parse(data);
			console.log(data.ok === 1);
			if (data.ok === 1) {
				this.setState( {
					done: checked,
					choseStyle: {
						color: checked ? "#BDBDBD" : "#000000"
					}
				})
			}else {
				this.setState( {
					done: !checked
				})
				this.item.done = !checked
			}
		})
		// console.log(this.item)
		// WebAPI update
		
		// this.props.item.done = 
	}

	deleteItem(e){
		let i = this.props.i;
		// console.log("i", i)
		let id = this.item._id;
		WebAPI.deleteItem(id, (data) => {
			console.log(data)
			data = JSON.parse(data);
			if (data.ok === 1) {
				if (this.props.deleteItem) {
					this.props.deleteItem(i, e);
				}
			}
		})
	}

	updateItem() {

	}


	render() {


		return (
			<div className="item flex-layout h-center v-between">
				<div className="flex-layout h-center">
					<input type="checkbox" checked={this.state.done} onChange={ (e) => this.checkbox(e) } />
					<div className="content" style={this.state.choseStyle}>
						{this.props.item.content}	
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