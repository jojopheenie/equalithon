/** @format */

var express = require("express");
var router = express.Router();
var pool = require("./db");

/*
  USER PROFILE SECTION
*/

//User initial sign up
router.post("/api/signup", (req, res, next) => {
	const values = [
		req.body.first_name,
		req.body.last_name,
		req.body.email,
		req.body.pwd,
	];
	try {
		let newUser = pool.query(
			`INSERT INTO users(first_name, last_name, email, pwd)
              VALUES($1, $2, $3, $4)`,
			values
		);
		res.json(newUser);
	} catch (err) {
		next(err);
	}
});

//User registration after signing up for an equalithon
router.put("/api/registration", (req, res, next) => {
	const values = [
		req.body.slack_handle,
		req.body.reason_for_joining,
		req.body.country,
		req.body.region,
		req.body.city,
		req.body.post_code,
		req.body.linkedIn,
		req.body.job_title,
		req.body.main_speciality,
		req.body.experience,
		req.body.last_company,
		req.body.num_employees,
		req.body.sector,
		req.body.user_type,
		req.body.uid,
	];

	try {
		let updateUser = pool.query(
			`UPDATE users SET slack_handle=$1,reason_for_joining=$2,country=$3,region=$4,city=$5,post_code=$6,linkedIn=$7,job_title=$8,main_speciality=$9,experience=$10,last_company=$11,num_employees=$12,sector=$13,user_type=$14 WHERE uid=$15`,
			values
		);
		res.json(updateUser);
	} catch (err) {
		next(err);
	}
});


/*
  EQUALITHON SECTION
*/

//get all equalithons
router.get("/api/equalithons", (req, res, next) => {
	pool.query(`SELECT * FROM equalithons ORDER BY startdate DESC`, (
    (q_err, q_res) => {
			if (q_err) {
        next(q_err)
			}
			res.json(q_res.rows);
		}
  ));
});

/*
  CHALLENGES SECTION
*/

//get all challenges
router.get("/api/challenges/:id", (req, res, next) => {
	const equalithonID = req.params.id
	pool.query(`SELECT * FROM challenges WHERE equalithon_id=${equalithonID}`, (
    (q_err, q_res) => {
			if (q_err) {
        next(q_err)
			}
			res.json(q_res.rows);
		}
  ));
});

/*
  USER EQUALITHONS HISTORY SECTION
*/

//User joins a new Equalithon, Challenege, and Team
router.post("/api/user_equalithons", (req, res, next) => {
	const values = [
		req.body.user_id,
		req.body.equalithon_id,
		req.body.team_id,
		req.body.current,
	];
	try {
		let newUserEqualithon = pool.query(
			`INSERT INTO user_equalithons(user_id, equalithon_id, team_id, current)
              VALUES($1, $2, $3, $4)`,
			values
		);
		res.json(newUserEqualithon);
	} catch (err) {
		next(err);
	}
});

// let team_lead_id = pool.query('teams table');
// let slackHandle = pool.query('SELECT slackHandle FROM Users WHERE id=$1', [team_lead_id])

// var i =0;
// var team="";

// looping through the recordset {

// if(i==0){
//    Display the name of the Equalithon
// }

// if(team != row->teamid){
//    <div>Display team<div>
// }

//  team = row->team
//  i++;
// }

// select userid from users where first_name='Beyonce';

// -- get the userid ---

// Decide what to do,

// select * from equalithons where endDate>now()

// --search equalithon

// select * from equalithons where equalithon_name='Women Day';
// -- get the ids of the equalithons

// select * from teams where team.equalithonid=[id]

// get all teams???

// post - create a team
// INSERT INTO teams()

// //get all equalithons history for one user
// SELECT equalithons.equalithon_name, user_equalithons.team_id, users.first_name
// FROM teams
// INNER JOIN equalithons ON teams.equalithon_id=equalithons.equalithon_id
// INNER JOIN user_equalithons ON user_equalithons.team_id=teams.team_id
// INNER JOIN users ON users.uid=user_equalithons.user_id
// WHERE user_id=$1

module.exports = router
