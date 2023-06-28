import { useState, useEffect } from "react";
import axios from 'axios';

export default function Create()
{
	const [ rno, setRno ] = useState("");
	const [ name, setName ] = useState("");
	const [ marks, setMarks ] = useState("");
	const [ ans, setAns ] = useState("");

	const hRno = (event) => { setRno(event.target.value); }
	const hName = (event) => { setName(event.target.value); }
	const hMarks = (event) => { setMarks(event.target.value); }

	const save = (event) => { 
		event.preventDefault(); 
		let data = {rno, name, marks};
		let urladd = "http://localhost:9000/save";
		axios.post(urladd, data)
		.then( res => {
			if (res.data.insertedId == rno)
			{
				setAns("Record Created");
				setRno("");
				setName("");
				setMarks("");
			}
			else
			{
				setAns(rno + " Already Exists");
				setRno("");
				setName("");
				setMarks("");
			}
		})
		.catch(err => {
			if (err.code == "ERR_NETWORK")		setAns("Sever Down Please Try Again After Some Time");
		})
	}




	return(
	<>
	<center>
	<h1>Create</h1>
	<form onSubmit={save}>
	<input type="number" placeholder="enter rno"
	onChange={hRno} value={rno} />
	<br/><br/>
	<input type="text" placeholder="enter name"
	onChange={hName} value={name} />
	<br/><br/>
	<input type="number" placeholder="enter marks"
	onChange={hMarks} value={marks} />
	<br/><br/>
	<input type="submit" value="Save" />
	</form>
	<h1> { ans } </h1>
	</center>
	</>
	);
}