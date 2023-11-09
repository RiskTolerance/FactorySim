import mysql, { ConnectionOptions } from 'mysql2';
require('dotenv').config();

console.log(process.env);

import { Employee } from './factory_class/employee';
import { Skills } from './factory_class/skill';
import { Connection } from 'mysql2/typings/mysql/lib/Connection';

// import env variables for connection strings:
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbName = process.env.DB_NAME;

// choose to connect to PlanetScale or to a local DB (I think that PlanetScale would be a good place to start out, and then a larger DB would be good as a proof of concept for handling large tables.)
const local = false; // false = PS

const createConnection = () => {
	if (local) {
		const access: ConnectionOptions = {
			host: dbHost,
			user: dbUser,
			password: dbPass,
			database: dbName,
		};
		return mysql.createConnection(access);
	} else {
		if (process.env.PS_URL) {
			return mysql.createConnection(process.env.PS_URL);
		} else {
			console.log('process.env.PS_URL did not exist');
		}
	}
};
const conn = createConnection();
console.log(conn);

// if there is a connection, we can go ahead to the simulation:
if (conn) {
	// after making the connection, we'll need to validate the schema of the database? I'll probably make the initial database from scratch on every run - so start by deleting everything and starting over:

	// then build a new db (this should be its own module):

	//

	const skillList = ['assembly', 'forklift', 'sewing'];
	const skills: Skills = new Skills(['assembly'], skillList);
	const e1 = new Employee('Gregg', skills);
	e1.greet();

	// simulate time at a rate of one hour per three seconds
	// 500 ms is 10 minutes
	const simStart = new Date(); // set start datetime
	let simTime = simStart; // set the variable for tracking datetime

	function formatSimTime(date: Date) {
		let hours = date.getHours();
		let ampm = hours >= 12 ? 'PM' : 'AM';
		hours = hours % 12;
		hours = hours ? hours : 12; // The hour '0' should be '12'
		let minutes = '00';
		let day = date.getDate();
		let month = date.getMonth() + 1; // Months are zero-based in JavaScript
		let year = date.getFullYear().toString().substr(-2); // Get the last two digits of the year

		return `${hours}:${minutes} ${ampm} ${month}/${day}/${year}`;
	}

	const eventLoop = () => {
		console.log(`The time is ${formatSimTime(simTime)} - evaluating events...`);
		// events per hour (we're not simulating realistic operating hours)
		// 1. variable orders arrive - are pushed on to the order sql table
		// orders: {customer: '', order_date: '', ordered products: []}
		// 2. orders are sorted by due date and added to the queue
		// 3. the contents of the order are worked on via a combination of machines and people:
		// a. machines - machines have an efficiency variable of 1 (working) or 0 (broken). For this simulation we assume a 90% uptime.
		// b. people - people have more variables. their efficiency is based on: experience ( 1x - 2x multiplier), missing work (1 or 0), and how likely they are to spend a lot of time trying to automate their work as opposed to actually doing the work ()
		console.log('Some things happened');

		simTime.setHours(simTime.getHours() + 1);
	};

	const eventLoopInterval = setInterval(eventLoop, 3000);
} else {
	console.error('A connection to the database could not be established...');
}
