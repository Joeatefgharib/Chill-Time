import './navListItem.css'
import {Link} from 'react-router-dom'
const NavListItem = ({ nav }) => {
  return (
        <li>
            <Link className={' ml-10 hover:text-red-600 duration-[.5s] '} to={ nav.link }>{ nav.name }</Link>
        </li>
    )
}

export default NavListItem