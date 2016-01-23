"use strict"

import EventEmitter from 'events';
// import smallAppDispatcher from '../dispatcher/smallAppDispatcher'

// const OPEN_TOPIC = "changeHeader";

// var mainData = "";

class Store extends EventEmitter {
	constructor() {
		super();
	}

	// openTopic(onOff) {
	// 	this.emit(OPEN_TOPIC, onOff)
	// }

	changeHeader(value) {
		this.emit("changeHeader", value)	
	}

	addChangeListener(eventName, callback) {
		this.on(eventName, callback);
	}

	removeChangeListener(eventName, callback) {
		this.removeListener(eventName, callback)
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
