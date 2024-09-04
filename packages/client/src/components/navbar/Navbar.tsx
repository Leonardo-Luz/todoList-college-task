import { Link } from "react-router-dom"
import "../../styles/navbar.style.css"

export const Navbar = () => {
    return(
        <div className="navbar">
            <Link to='/'>Home</Link>
            <Link to='/todo'>Todo List</Link>
        </div>
    )
}