import React, { useState } from 'react'
import SearchBox from '../components/SearchBox'
import DropDown1 from '../components/DropDown1'
import {users} from "../assets/dummy_data/users"
import DataTable from '../components/DataTable'

const AccountManagement = () => {
    const [userList, setuserList] = useState(users)

    const dropDownOptions = [
        {name: "Alphabetical (A-Z)", value: "A-Z"},
        {name: "Alphabetical (Z-A)", value: "Z-A"}
    ]

    const heads = [
        {label: "User ID", width: "10%"}, 
        {label: "Email", width: "30%"}, 
        {label: "First Name", width: "20%"}, 
        {label: "Last Name", width: "15%"}, 
        {label: "Actions"}
    ]

    const serializedData = []
    userList.forEach(user => {
        serializedData.push(
            {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                actions: [
                   {
                        label:"View Profile", 
                        buttonStyle: {backgroundColor : "var(--primary-green)", hoverColor: "var(--primary-green-hover)"} ,
                        callback: ()=>{}},
                   {
                        label:"Delete Profile", 
                        buttonStyle: {backgroundColor : "var(--secondary-red)", hoverColor: "var(--secondary-red-hover)"} , 
                        callback: ()=>{}
                    },
                ]
            }
        )
        
    })


    return (
    <div className='account_management page'>
        <h1>Account Management</h1>
        <SearchBox placeholder="Find User"/>

        <hr/>
        <div className='account_management_dropdowns' style={{display: "flex", alignItems: "center"}}>
            <span style={{padding: "5px 1ch"}}>Sort By: </span>
            <DropDown1 name="alphabetical_dropdown" options={dropDownOptions} onChange={()=>{}}/>
        </div>
        <hr/>

        <DataTable data={serializedData} heads={heads}/>

    </div>
    )

   
}

export default AccountManagement