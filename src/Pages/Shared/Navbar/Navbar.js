import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import logo from '../../../images/logo.png'

const Navbar = () => {
    const { logOut, user } = useContext(AuthContext)


    const handleSignOut = () => {
        logOut()
            .then()
            .catch(error => console.log(error))
        toast.success('Log Out Done!')
    }
    const menuItems = <React.Fragment>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/media'>Media</Link></li>
        {
            user?.email ?
                <>
                    <li><Link to='/message'>Message</Link></li>
                    <li><Link to='/about'>About</Link></li>

                    <li><Link onClick={handleSignOut}>Sign Out</Link></li>
                </>

                :
                <>
                    <li><Link to='/login'>Login</Link></li>
                    {/* <li><Link to='/signup'>Signup</Link></li> */}
                </>
        }



    </React.Fragment>
    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content text-orange-600 font-bold mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {menuItems}

                        </ul>
                    </div>
                    <div className='flex'><Link to='/'><img className='h-16 w-16' src={logo} alt="" /></Link><span className='text-orange-600 font-bold text-2xl flex items-center'>nClub</span></div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-orange-600 font-bold">
                        {menuItems}
                    </ul>
                </div>
            </div>
            <hr />
        </div>
    );
};

export default Navbar;