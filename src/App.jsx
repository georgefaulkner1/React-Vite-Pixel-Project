import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"

//Componenets
import { Loading } from "./components/loading"

//Functions
import { sortAlphabetically } from "./functions/sortAlphabetically"
import { Nav } from "./components/nav"
import { RemoveIcon } from "./components/removeIcon"
import { AddIcon } from "./components/addIcon"

//Time out time for the fetch response, purely to demo the loading component
const fetchDelay = 2000

function App() {

  //API Endpint to call
  const api = `https://jsonplaceholder.typicode.com/users`

  //States
  const [users, setUsers] = useState([])
  const [myList, setMyList] = useState([])
  const [usersSortBy, setUsersSortBy] = useState(1)
  const [myListSortBy, setMyListSortBy] = useState(1)

  //ListUsers - provide users array, sortBy is === to either 0 : 1. 0 returns decending order whilst 1 returns ascending order, auto define as 1 if nothing is passed through. myUserList if passed as true return as if its for My List rather than api returned data.
  function ListUsers({users, sortBy, myUserList}){
    //If sortBy not a number or does not match existing values return as 1
    if(isNaN(sortBy) || sortBy !== 1 && sortBy !== 0) sortBy = 1
    //If no myUserList provided auto assign as false to render the api users returned, NOT My List users
    if(!myUserList) myUserList = false
    //Sort users with sortAlphabetically function, pass through the users to sort and how to sortBy, this must be a number 0 : 1
    users = sortAlphabetically({users, sortBy})

    //Return all the users encapsulated in a .profile-container
    if(users && users.length > 0){
      return (
        <>
          {users.map((user) => (
              <div className="profile-container" key={`${user.id}-profile`}>
                
                <div className="left-side">
                  <p key={`${user.id}-name`}><b>Name:</b> {user.name}</p>
                  <p key={`${user.id}-username`}><b>Username:</b> {user.username}</p>
                  <p key={`${user.id}-email`}><b>Email:</b> {user.email}</p>
                
                </div>
                
                {myUserList ? <button key={`${user.id}-button`} onClick={() => handleRemoveFromMyList({user})}>Remove <RemoveIcon /> </button> : myList.find(myListUser => myListUser.id === user.id) === undefined ? <button key={`${user.id}-button`} onClick={() => handleAddToMyList({user})}> <AddIcon /> My List</button> : ""}

              </div>
          ))}
        </>
      )
    } 
  
    return (<></>)
  
  }
  
  //Update state for adding a new user to My List
  function handleAddToMyList({user}){

    myList.find(myListUser => myListUser.id === user.id) === undefined ? 
    setMyList([
      ...myList,
      user
    ]) : alert(`User with the name ${user.name} already exists in My List`)
  
  }

  //Update state for removing a existing user in My List
  function handleRemoveFromMyList({user}){
    setMyList(myList.filter(myListUser => myListUser.id !== user.id))
  }
  
  //Render Home page "/"
  function RenderHome({users}){
    return (
      <>
        <h1>Home</h1>

        {users.length === 0 ? <Loading /> : <ListUsers users={users} sortBy={usersSortBy} />}
      </>
    )
  }

  //Render My List page "/mylist"
  function RenderMyList({users}){

    function handleSortByChange({value}){
      if(value) setMyListSortBy(Number(value))
    }
  
    return (
      <>
        <h1>My List</h1>

        {users.length === 0 ? <p>No Users.</p> : 
          <>
            <select value={myListSortBy} onChange={(e) => handleSortByChange({value: e.target.value})}>
              <option value={1}>Alphabetic Acending</option>
              <option value={0}>Alphabetic Decending </option>
            </select>

            <ListUsers users={users} myUserList={true} sortBy={myListSortBy}/>
          </>
        } 
  
      </>
    )
  }
  
  //Render unfound page "*"
  function Render404(){
  
    return (
      <>
        <h1>404, you must be lost!</h1>
      </>
    )
  }


  useEffect(() => {

    //Fetch api
    const callFetch = async () => {
      const response = await fetch(api)
      setTimeout(async () => {
        setUsers(await response.json())
      }, fetchDelay)
    }
    callFetch()

  }, [])

  return (
    <>

    <div className="page-container">

      <Nav myList={myList}/>

    
      <div className="content">
        <Routes>
          <Route path="/" element={<RenderHome users={users} />} />
          <Route path="/mylist" element={<RenderMyList users={myList}/>} />
          <Route path="*" element={<Render404 />} />
        </Routes>
      </div>

    </div>

    </>
  )
}

export default App
