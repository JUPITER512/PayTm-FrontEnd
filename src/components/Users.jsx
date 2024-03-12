import { useEffect, useState } from "react";
import Button from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { set } from "mongoose";
function debounce(func, delay) {
    let timeoutId;

    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

function Users() {
    const [usersdata,setUsers]=useState([])
    const [filter,setfilter] = useState("");
    const handleInputChange=debounce((value)=>{
        setfilter (value);
    },300)

    async function getUsers(filter) {
        try {
            const response = await axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter,{
                headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
            } );
            return response.data.user;
        } catch (error) {
            console.error("Error fetching users:", error);
            return [];
        }
    }
    useEffect(()=>{
        async function fetchData() {
            try {
                const users = await getUsers(filter);
                setUsers(users);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }
        fetchData();
    },[filter])
  return (
    <>
    <div className=" font-bold mt-6 text-lg">
      Users
    </div>
    <div className=" my-2">
        <input onChange={(e) => handleInputChange(e.target.value)} type="text" placeholder="Search Users ...... " className=" w-full px-2 py-1 border-x-2 border-y-2 rounded border-slate-200" />
    </div>
    <div>
        {usersdata.map((user,index)=>{
            return<div key={index+2}>
            <User user={user}></User>
            </div>
        })}
    </div>
    </>
  )
}
function User({user}) {    const navigate=useNavigate()

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstname[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstname} {user.lastname}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button label={"Send Money"} onClick={(e)=>{
                    navigate(`/send?id=${user._id}&firstname=${user.firstname}&lastname=${user.lastname}`)
            }} />
        </div>
    </div>
}
export default Users
