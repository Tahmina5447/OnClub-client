import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UilThumbsUp } from '@iconscout/react-unicons'
import { UilCommentAltDots } from '@iconscout/react-unicons'
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const Media = () => {
    const [allPost, steAllPost] = useState([])
    const [loading, setLoading] = useState(true)
    
    const { user } = useContext(AuthContext)

    // const [like,setLike]=useState(0)


    useEffect(() => {

        fetch('http://localhost:5000/allPost')
            .then(res => res.json())
            .then(data => {
                setLoading(false)
                steAllPost(data)
            })

    }, [])

    if (loading) {
        return <div className="mx-auto my-8 w-20 h-20 border-4 border-dashed rounded-full animate-spin dark:border-teal-400"></div>
    }



    
    
    return (
        <div className='w-3/5 mx-auto my-6'>
            {
                allPost.map(post => <div className='border border-2 my-6 rounded'>
                    <div className='p-6 pb-0'>
                        <img className='mx-auto' src={post.image} alt="" />
                    </div>
                    <div className='m-6 border-t border-b py-2 flex'>
                        <div className='flex items-center mr-8'>
                            <span className='mr-1'>{post.like}</span>
                            <UilThumbsUp></UilThumbsUp>
                        </div>
                        <div className='flex items-center'>
                            <span className=''></span>
                            <UilCommentAltDots></UilCommentAltDots>
                        </div>
                    </div>
                    
                    <div className='p-6'>{post.post}<span className='text-gray-400'>....</span><button className='text-orange-800'><Link to={`/postDetails/${post._id}`}>See Details</Link></button></div>
                </div>)
            }
        </div>
    );
};

export default Media;