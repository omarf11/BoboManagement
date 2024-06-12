import { NavLink } from 'react-router-dom'
import { useAppDispatch } from '../../store/rootReducer'
import { signOutUser } from '../../store/modules/authModule'

const SignedInLinks = () => {
  const dispatch  = useAppDispatch()


  return (
    <div>
      <ul className="right">
        <li><NavLink to='/create'>New Project</NavLink></li>
        <li><a onClick={()=> dispatch(signOutUser()) }>Log Out</a></li>
        <li><NavLink to='/' className="btn btn-floating pink lighten-1">NN</NavLink></li>
      </ul>
    </div>
  )
}

export default SignedInLinks