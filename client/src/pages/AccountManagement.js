import React, { useEffect, useState } from 'react'
import SearchBox from '../components/SearchBox'
import DropDown1 from '../components/DropDown1'
import {users} from "../assets/dummy_data/users"
import DataTable from '../components/DataTable'
import Header from '../components/Header'
import { sortBy } from '../utils/sortBy'
import findEntries  from '../utils/findEntries'

const AccountManagement = () => {
    const [userList, setuserList] = useState(users)
    const [originalSerializedUserList, setOriginalSerializedUserList] = useState([])
    const [serializedUserList, setSerializedUserList] = useState([])

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
                    user_id: user.id,
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
        setOriginalSerializedUserList(sortBy(serializedData,"lastName",true))
        setSerializedUserList(sortBy(serializedData,"lastName",true))
    }, []);
    
    

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