import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import googleLogo from '../../../images/googleLogo.png'

const Login = () => {
    const { loginUser, loginWithProvider } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorMessage, setErrormessage] = useState('')
    const location = useLocation()
    const navigate = useNavigate();
    const from = location?.state?.from?.pathname || '/';

    const googleProvider = new GoogleAuthProvider();
    const handlegoogleLogin = () => {
        loginWithProvider(googleProvider)
            .then(result => {
                const user = result.user;
                console.log(user)
                navigate(from, { replace: true })

            })
            .catch(error => {
                console.error(error)
                setErrormessage(error.message)
            });

    }
    const handleLogin = (data) => {
        console.log(data)
        loginUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('Successfully Login')
                navigate(from, { replace: true })

            })
            .catch(error => {
                console.log(error.message)
                setErrormessage(error.message)
            });


    };

    return (
        <div>
            <div className="hero min-h-screen">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl ">
                    <h1 className="text-xl font-bold text-center mt-4">Login now!</h1>
                    {errorMessage && <p className='text-bold text-error'>{errorMessage}</p>}
                    <form onSubmit={handleSubmit(handleLogin)} className="card-body">

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                {...register('email', { required: 'Email is required.' })}
                                type="text" placeholder="Email" className="input input-bordered" />
                            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                {...register('password', { required: 'Password is required.' })}
                                type="password" placeholder="password" className="input input-bordered" />
                            {errors.password && <p className='text-red-500'>{errors.password.message}</p>}

                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-orange-600 border-0">Login</button>
                        </div>
                    </form>
                    <div className='flex mx-auto'>
                        <h3 className='font-bold mr-1'>Login With</h3>
                        <button onClick={handlegoogleLogin}><img className='w-5 h-5' src={googleLogo} alt="" /></button>
                    </div>
                    <p className='text-center'>Create a new account.<Link className='btn btn-link' to='/signup'>Sign Up</Link></p>

                </div>

            </div>
        </div>
    );
};

export default Login;