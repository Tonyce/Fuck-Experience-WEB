"use strict"

import EventEmitter from 'events';
// import smallAppDispatcher from '../dispatcher/smallAppDispatcher'

// const CHANGE_EVENT = 'change';

const OPEN_TOPIC = "openTopic";

// var mainData = "";

class Store extends EventEmitter {
	constructor() {
		super();
	}

	openTopic(onOff) {
		this.emit(OPEN_TOPIC, onOff)
	}

	addChangeListener(callback) {
		this.on(OPEN_TOPIC, callback);
	}

	removeChangeListener(callback) {
		this.removeListener(OPEN_TOPIC, callback)
	}
}

let store = new Store()

// store.dispatchToken = smallAppDispatcher.register(payload => {
// 	let action = payload.action
// 	switch (action.type) {
// 		case 'loadMainData': 
// 			// could show loding...
// 			break;
// 		case 'receiveMainData': {
// 			mainData = action.data;
// 			mainStore.emitChange();
// 		}
//       		break;
//       	default: 
//       		return
// 	}
// 	return true;
// })

export default store
