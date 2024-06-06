const express = require('express');
const bodyParser = require("body-parser");

const db = require('./db'); // db connection 

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));

app.get("/checkouts", async (req, res) => { 
	const sql = "SELECT * FROM checkouts";
	
	const result  = await db.query(sql);
	res.status(201).json(result.rows);
	  
  }); // get requst to get all data

  app.post("/checkout", (req, res) => {
	console.log(new Date());
	const { fullname, 
		    email, 
			phone_number, 
			reason, 
			message } = req.body;
	const date = new Date().toISOString(); // post request to insert new data 
  
	db.query(`INSERT INTO checkouts (fullname,email,phone_number,reason,message) VALUES ($1,$2,$3,$4,$5)`,[fullname, email, phone_number, reason, message])
	res.status(201).json({ fullname, email, phone_number, reason, message });
	  
  }); // to insert values to the query

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => 
{
	console.log('Server is running on port ${PORT}');
});
