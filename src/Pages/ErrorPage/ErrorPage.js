import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className=' text-center'>
            <h1 className='text-6xl text-red font-bold text-center mt-20'>4o4</h1>
            <p>Page not founded <Link to='/' className='btn btn-link'>Go to home page</Link></p>
        </div>
    );
};

export default ErrorPage;