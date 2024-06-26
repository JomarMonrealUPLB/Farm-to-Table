import React, { useEffect, useState } from 'react'
import SearchBox from '../components/SearchBox'
import DropDown1 from '../components/DropDown1'
import {users} from "../assets/dummy_data/users"
import DataTable from '../components/DataTable'
import Header from '../components/Header'
import { sortBy } from '../utils/sortBy'
import findEntries  from '../utils/findEntries'
import { useRouteLoaderData, useNavigate } from 'react-router-dom'

const AccountManagement = () => {
    const [userList, setuserList] = useState([])
    const [originalSerializedUserList, setOriginalSerializedUserList] = useState([])
    const [serializedUserList, setSerializedUserList] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3000/users')
          .then(response => response.json())
          .then(body => {
            console.log(body);
            setuserList(body)
          })
      },[]);
    
    const handleDelete = (user_id)=> {
        fetch(`http://localhost:3000/users/${user_id}`,
      {
        credentials: 'include',
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(response => {
        response.text()
        alert("User deleted!");
        window.location.reload();
      })
      

    }
      
    const dropDownOptionsLastName = [
        {name: "Last Name (A-Z)", value: "A-Z"},
        {name: "Last Name (Z-A)", value: "Z-A"}
    ]

    const dropDownOptionsFirstName = [
        {name: "First Name (A-Z)", value: "A-Z"},
        {name: "First Name (Z-A)", value: "Z-A"}
    ]

    const heads = [
        {label: "User ID", width: "10%"}, 
        {label: "Email", width: "30%"}, 
        {label: "First Name", width: "20%"}, 
        {label: "Last Name", width: "15%"}, 
        {label: "Actions"}
    ]

    useEffect(() => {
        const serializedData = []
        userList.forEach(user => {
            serializedData.push(
                {
                    user_id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    actions: [
                    {
                            label:"View Profile", 
                            buttonStyle: {backgroundColor : "var(--primary-green)", hoverColor: "var(--primary-green-hover)"} ,
                            callback: ()=>{navigate(`/profile-page/${user._id}`);}},
                    {
                            label:"Delete Profile", 
                            buttonStyle: {backgroundColor : "var(--secondary-red)", hoverColor: "var(--secondary-red-hover)"} , 
                            callback: ()=>{handleDelete(user._id)}
                        },
                    ]
                }
            )
            
        })
        setOriginalSerializedUserList(sortBy(serializedData,"lastName",true))
        setSerializedUserList(sortBy(serializedData,"lastName",true))
    }, [userList]);
    
    

    const sortData = (dropDownValue, key) => {
        if(dropDownValue === "A-Z"){
            setSerializedUserList(sortBy(originalSerializedUserList,key,true))
        } else{
            setSerializedUserList(sortBy(originalSerializedUserList,key,false))
        }
    }


    return (
    <div className='account_management page'>
        <Header headerTitle={"Account Management"}/>
        <SearchBox placeholder="Find User" onChange={e=>setSerializedUserList(findEntries(originalSerializedUserList,e.target.value))}/>

        <hr/>
        <div className='account_management_dropdowns' style={{display: "flex", alignItems: "center"}}>
            <span style={{padding: "5px 1ch"}}>Sort By: </span>
            <DropDown1 name="alphabetical_dropdown" options={dropDownOptionsFirstName} onChange={(e)=>{sortData(e.target.value, "firstName")}}/>
            <DropDown1 name="alphabetical_dropdown" options={dropDownOptionsLastName} onChange={(e)=>{sortData(e.target.value, "lastName")}}/>
        </div>
        <hr/>

        <DataTable data={serializedUserList} heads={heads}/>

    </div>
    )

   
}

export default AccountManagement