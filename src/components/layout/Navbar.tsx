import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/rootReducer';
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'

const Navbar:React.FC = () => {
  const user  = useAppSelector(state => state.userAuth.user);

  return (
    <nav className="nav-wrapper grey darken-3">
      <div className="container">
        <Link to='/'  className="brand-logo">BoboPlan</Link>
        {user ? <SignedInLinks /> :
        <SignedOutLinks />}
      </div>
    </nav>
  )
}

export default Navbar;