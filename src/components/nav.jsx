import { Link } from "react-router-dom"

export function Nav({myList}){

    return (
        <>
            <div className="nav">
                <Link to={"/"} className="navLink">Users</Link>
                <Link to={"/mylist"} className="navLink">My List <span className="myListCount">{myList.length}</span></Link>
            </div>
        </>
    )
}