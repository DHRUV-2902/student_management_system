import { useState, useEffect } from "react";
import axios from 'axios';
import { useLocation } from "react-router-dom";

export default function Update()
{
	const [ rno, setRno ] = useState("");
	const [ name, setName ] = useState("");
	const [ marks, setMarks ] = useState("");
	const [ ans, setAns ] = useState("");
	const loc = useLocation();

	const hRno = (event) => { setRno(event.target.value); }
	const hName = (event) => { setName(event.target.value); }
	const hMarks = (event) => { setMarks(event.target.value); }

	useEffect(() => {
		setRno(loc.state.r);
		setName(loc.state.n);
		setMarks(loc.state.m);
}, []);


	const save = (event) => { 
		event.preventDefault(); 
		let data = {rno, name, marks};
		let urladd = "http://localhost:9000/modify";
		axios.put(urladd, data)
		.then( res => {
				setAns("Record Updated");
				setRno("");
				setName("");
				setMarks("");
		})
		.catch(err => {
			if (err.code == "ERR_NETWORK")		setAns("Sever Down Please Try Again After Some Time");
		})
	}




	return(
	<>
	<center>
	<h1>Update</h1>
	<form onSubmit={save}>
	<input type="number" placeholder="enter rno"
	onChange={hRno} value={rno} disabled={true} />
	<br/><br/>
	<input type="text" placeholder="enter name"
	onChange={hName} value={name} />
	<br/><br/>
	<input type="number" placeholder="enter marks"
	onChange={hMarks} value={marks} />
	<br/><br/>
	<input type="submit" value="Update" />
	</form>
	<h1> { ans } </h1>
	</center>
	</>
	);
}