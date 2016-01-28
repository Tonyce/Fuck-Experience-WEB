
'use strict';

class Weeks {
	weeks() {
		let num = Math.round((this.getFour() - this.getFirstFour()) / 3600000 / 7 / 24) + 1
		if ( num > 0 ) {
			return num
		}else {
			return 0
		}
	}	

	getFirstFour () {
		let date = new Date();
		date.setDate(1);
		date.setMonth(0);
		let firstDay = date.getDay();
		if (firstDay === 0) {
			firstDay = 7;
		}
		let chaDay = 7 - ( 4 - firstDay ) - 1;
		date.setDate(chaDay);
		date.setHours(0);
		date.setMinutes(0);
		date.setSeconds(0);
		return date
	}

	getFour () {
		let d = new Date();
		let date = d.getDate()
		let firstDay = d.getDay();
		if (firstDay === 0) {
			firstDay = 7;
		}
		let chaDay = 4 - firstDay;
		d.setDate( date + chaDay);
		d.setHours(0);
		d.setMinutes(0);
		d.setSeconds(0);
		return d	
	}
}

export default new Weeks();

