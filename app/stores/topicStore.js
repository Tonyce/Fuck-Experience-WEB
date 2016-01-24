"use strict"

import EventEmitter from 'events';
import smallAppDispatcher from '../dispatcher/smallAppDispatcher';

let topics = [];
let topic = {};

class Store extends EventEmitter {
	constructor() {
		super();
	}

	emitGetTopics() {
		this.emit("GetTopics");
	}

	emitGetTopic() {
		this.emit("GetTopic");	
	}

	changeHeader(value) {
		this.emit("changeHeader", value)	
	}

	addChangeListener(eventName, callback) {
		this.on(eventName, callback);
	}

	removeChangeListener(eventName, callback) {
		this.removeListener(eventName, callback)
	}

	getTopics() {
		return topics;
	}

	getTopic() {
		// console.log(topic)
		return topic;
	}
}

let store = new Store()

store.dispatchToken = smallAppDispatcher.register(payload => {
	let action = payload.action
	switch (action.type) {
		// case 'loadTopicsData': 
			// could show loding...
			// break;
		case 'receiveTopicsData': {
			topics = action.data;
			store.emitGetTopics();
		}
      		break;
      	case 'receiveTopicsMore': {
      		let moreDate = action.data;
      		topics = topics.concat(moreDate);
      		store.emitGetTopics();
      	}
      		break;
      	case 'receiveTopic': {
      		topic = action.data;
      		topic = JSON.parse(topic);
      		// console.log(topic);
      		store.emitGetTopic();
      	}
      		break;
      	default: 
      		return
	}
	return true;
})

export default store
