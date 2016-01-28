
"use strict";

import React from 'react';
import {render} from 'react-dom';
import Card from '../Card'

import mainStore from '../../stores/mainStore';
import mainAction from '../../actions/mainAction';

import Item from './Item';
import weeker from '../../util/Weeker'

class Main extends React.Component {

	constructor(props) {
		super(props);
		this._onChange = this._onChange.bind(this);
		this.state = {
			card: "",
			newSchedule: "",
			items: []
		}
		// console.log("about card")
	}

	componentDidMount() {
		// console.log("about didMount")
		const { day } = this.props.params
		mainStore.addChangeListener( this._onChange );
    	mainAction.loadScheduleData(`${day}`);
	}

	componentWillUnmount() {
		// console.log("about WillUnmount")
	    mainStore.removeChangeListener( this._onChange );
	}

	newChange(e) {
	 	this.setState({
    		newSchedule: e.target.value
    	})
  	}

	addNew() {
		let year = new Date().getFullYear();
		let weekNum = weeker.weeks();
		let { day } = this.props.params;
		let dayNumber = Number(day);
		// console.log(year, weekNum, dayNumber);
		let newItem = {
			content: this.state.newSchedule,
			done: false
		}

		let items = this.state.items.concat([newItem]);

		this.setState( {
			items: items,
			newSchedule: ''
		})
	}

	deleteItem(i, e) {
		let items = this.state.items.splice(i, 1);
		this.setState( {
			items: this.state.items
		})
	}

	_onChange() {

		let scheduleContent = mainStore.getMainData();
		scheduleContent = JSON.parse(scheduleContent);

		let cardContent = scheduleContent.card;
		let items = scheduleContent.items;
		
		this.setState({ 
			card: cardContent,
			items: items
		}); 
	}

	render() {
		// const { item } = this.props.params
		// console.log(this.state.items)
		return (
			<div>
				<Card>
					{this.state.card}
				</Card>

				<div className="schedule">
					<div className="flex-layout h-center flex-end">
						<input className="new" placeholder="新建schedule" 
							value={this.state.newSchedule} onChange={ (e)=>this.newChange(e) } />
						<div className="add" onClick={ () => this.addNew() }>
							+
						</div>
					</div>
					<div className="items">
						{this.state.items.map( (item, i) => {
							return <Item key={i} i={i} item={item} deleteItem={(i, e)=>this.deleteItem(i, e)} />
						})}
					</div>
				</div>
			</div>
		);
	}
}

export default Main