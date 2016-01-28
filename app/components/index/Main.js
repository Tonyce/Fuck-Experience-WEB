
"use strict";

import React from 'react';
import {render} from 'react-dom';
import Card from '../Card';

import mainStore from '../../stores/mainStore';
import mainAction from '../../actions/mainAction';


class Item extends React.Component {


	render() {
		let status = this.props.item.done ? "✔" : "…";
		let date = new Date(this.props.item.time);
		let time = date.Format("yyyy-MM-dd");
		return (
			<div className="item flex-layout h-center">
				<div>{status}</div>
				<div className="time">
					{time}
				</div>
				<div className="dot"></div>
				<div>{this.props.item.content}</div>
			</div>
		)
	}
}

class Main extends React.Component {

	constructor(props) {
		super(props);
		this._onChange = this._onChange.bind(this);
		this.state = {
			card: "",
			timeLineItems: []
		}
	}

	componentDidMount() {
		// console.log("about didMount")
		mainStore.addChangeListener( this._onChange );
    	mainAction.loadIndexData();
	}

	componentWillUnmount() {
		// console.log("about WillUnmount")
	    mainStore.removeChangeListener( this._onChange );
	}

	_onChange() {
		let indexContent = mainStore.getMainData();
		indexContent = JSON.parse(indexContent);

		let cardContent = indexContent.card;
		let timeline = indexContent.timeline;

		// console.log(cardContent);
		this.setState({ 
			card: cardContent,
			timeLineItems: timeline
		}); 
	}
	
	render() {

		let items = this.state.timeLineItems ? this.state.timeLineItems : []

		return (
			<div>
				<Card>
					{this.state.card}
				</Card>

				<div className="timeline">
					<h2>计划、进度</h2>

					{items.map( (item, i) => {
						return <Item item={item} key={i} />
					})}
					
				</div>
			</div>
		);
	}
}

export default Main

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}