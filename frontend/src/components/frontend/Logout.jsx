import React, {useContext} from 'react'
import { LoginContext } from '../../contexts/LoginContext';

const Logout = () => {

    const { user, SetUser } = useContext(LoginContext);

    const logout = () => {
        console.log('click click');
        localStorage.removeItem("token");
        SetUser(null);
        console.log(user);
    }
    
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
        {/* <h2 className="text-center">Hello</h2> */}
        <button onClick={logout} className='btn btn-danger btn-lg'>Logout</button>
    </div>
  )
}

export default Logout