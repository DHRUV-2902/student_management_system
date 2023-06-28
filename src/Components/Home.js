import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
	
export default function Home()
{
	const nav = useNavigate();
	const [info, setInfo] = useState([]);

	useEffect( () => {
		let urladd = 'http://localhost:9000/read';
		axios.get(urladd)
		.then(res => { setInfo(res.data);
				console.log(info);})
		.catch(err=> console.log(err));
} ,[] );

	const delStu = (rno) => {
		let urladd = "http://localhost:9000/remove";
		let d = { data:{rno} }
		axios.delete(urladd, d)
		.then(res => {
			alert("record deleted");
			window.location.reload();
		})
		.catch(err => alert("del stu " + err))
	}

	const updateStu = (_id, name, marks) => {
		nav("/update", {state:{r:_id, n:name, m:marks}})
	}


	return(
	<>
	<center>
	<h1>Home</h1>
	<table border="4" style={{ "width":"50%" }}>
	<tr>
		<th>Rno</th>
		<th>Name</th>
		<th>Marks</th>
		<th>Delete</th>
		<th>Update</th>
	</tr>
	{
	info.map((e)=>(
		<tr style={{"text-align":"center"}}>
		<td> { e._id } </td>
		<td> { e.name } </td>
		<td> { e.marks } </td>
		<td> <button onClick =
		{ ()=> {if(window.confirm("Do U Want To Delete ???"))
 		delStu(e._id) } } > 
		Delete </button> </td>
		<td> <button onClick =
		{ ()=> {if(window.confirm("Do U Want To Update ???")) 
		updateStu(e._id, e.name, e.marks); } } > 
		Update </button> </td>
	</tr>
	))
	}	
	</table>
	</center>
	</>
	);
}