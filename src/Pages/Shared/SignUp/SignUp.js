import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import googleLogo from '../../../images/googleLogo.png'

const SignUp = () => {

    const { userCreate, updateUser, loginWithProvider } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorMessage, setErrormessage ] = useState('')
    const location = useLocation()
    const navigate = useNavigate();
    const from = location?.state?.from?.pathname || '/';
    const googleProvider = new GoogleAuthProvider();

    const handlegoogleSignup = () => {
        loginWithProvider(googleProvider)
            .then(result => {
                const user = result.user;
                console.log(user)
                saveUser(user?.displayName,user?.email)
                navigate(from, { replace: true })
            })
            .catch(error => {
                console.error(error)
                setErrormessage(error.message)
            });

    }

    const handleSignup = (data) => {
        
        userCreate(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                const userInfo = {
                    displayName: data.name
                    

                }
                updateUser(userInfo)
                    .then(() => {
                        saveUser(data.name, data.email);
                    })
                    .catch(err => console.log(err));
                
                navigate(from, { replace: true })

            })
            .catch(error => {
                console.log(error)
                setErrormessage(error.message)
            });
    };


    const saveUser = (name, email) => {
        const user = { name, email };
        fetch('https://onclub-server.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data=> console.log(data))
            
    }

    return (
        <div className="hero min-h-screen ">
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl">
                <h1 className="text-xl font-bold text-center mt-4">Create a new account.</h1>
                {errorMessage && <p className='text-bold text-error m-4'>{errorMessage}</p>}
                <form onSubmit={handleSubmit(handleSignup)} className="card-body">
                    
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            {...register('name', { required: 'Name is required.' })}
                            type="text" name='name' placeholder="Name" className="input input-bordered input-sm" />
                        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            {...register('email', { required: 'Email is required.' })}
                            type="email" placeholder="Email" className="input input-bordered input-sm" />
                        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            {...register('password', {
                                required: 'Password is required.',
                                minLength: { value: 6, message: "Password must be 6 characters long" },
                                pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                            })}
                            type="password" placeholder="Password" className="input input-bordered input-sm" />
                        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                    </div>
                    
                    <div className="form-control mt-6">
                        <button className="btn border-0 bg-orange-600">Sign Up</button>
                    </div>
                </form>
                <div className='flex mx-auto'>
                    <h3 className='font-bold mr-1'>Sign Up With</h3>
                    <button onClick={handlegoogleSignup}><img className='w-5 h-5' src={googleLogo} alt="" /></button>
                </div>
                <p className='text-center'>Already have an account? <Link className='btn btn-link' to='/login'>Login</Link></p>

            </div>
        </div>
    );
};

export default SignUp;