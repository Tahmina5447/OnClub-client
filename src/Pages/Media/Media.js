import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UilThumbsUp } from '@iconscout/react-unicons'
import { UilCommentAltDots } from '@iconscout/react-unicons'
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import { useQuery } from 'react-query';
import SinglePost from '../../Component/SinglePost/SinglePost';

const Media = () => {
    const [allPost, steAllPost] = useState([])
    const [loading, setLoading] = useState(true)
    
    const { user } = useContext(AuthContext)



    
    useEffect(() => {

        fetch('https://onclub-server.vercel.app/allPost')
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
                allPost.map(singlepost => <SinglePost singlepost={singlepost}></SinglePost>)
            }
            
        </div>
    );
};

export default Media;