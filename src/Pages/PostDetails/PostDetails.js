import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { UilThumbsUp } from '@iconscout/react-unicons'
import { UilCommentAltDots } from '@iconscout/react-unicons'
import { UilNavigator } from '@iconscout/react-unicons'
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import { toast } from 'react-hot-toast';

const PostDetails = () => {
    const postDetails = useLoaderData('')
    const { user } = useContext(AuthContext)
    const [comments, setComments] = useState([])
    const { _id, post, image,like:liked } = postDetails
    const [likeCount,setLikeCount]=useState(liked)

    const handleLike = (event) => {
        
        fetch(`https://onclub-server.vercel.app/addLike/${_id}`, {
            method: 'PUT',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.modifiedCount>0){
                    setLikeCount(prevLike=>prevLike+1)
                }
            })
            .catch(error => console.log(error))



    }

    
    

    const addComment = (event) => {
        event.preventDefault();
        const comment = event.target.comment.value;

        const commentInfo = {
            userName: user?.displayName,
            comment,
            postId:_id
        }

        fetch(`https://onclub-server.vercel.app/comments`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(commentInfo)

        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast.success('Comment Added')
                event.target.reset();
            })
            .catch(error => console.log(error))
            
    }

    useEffect(() => {
        fetch(`https://onclub-server.vercel.app/commet?postId=${_id}`)
            .then(res => res.json())
            .then(data => setComments(data))
            .catch(err => console.error(err))
    }, [_id,comments])
    return (
        <div className='w-3/5 mx-auto border border-2 rounded my-10'>
            <div>
                <img className='mx-auto mt-4' src={image} alt="" />
            </div>
            <div className='m-6 border-t border-b py-2 flex'>
                <div onClick={ handleLike} className='flex items-center mr-8'>
                    <span className=''>{likeCount}</span>
                    <UilThumbsUp className='hover:text-orange-600'></UilThumbsUp>
                </div>
                <div className='flex items-center'>
                    <span className=''>{comments.length}</span>
                    <UilCommentAltDots></UilCommentAltDots>
                </div>
            </div>

            <div className='px-6'>
                <div>
                    <p>{post}</p>
                </div>
                <div className=' my-4 '>
                    <form onSubmit={addComment} className='flex items-center'>
                        <input type="text" name='comment' className='input input-bordered input-xs mr-1 border-orange-600 text-center ' placeholder='write your comment' />
                        <button type='submit'><UilNavigator className='text-orange-600 font-bold'></UilNavigator></button>
                    </form>
                    <div className='my-3'>
                    
                    {
                        comments.map(com => <div className='border bg-gray-300 rounded-xl my-1'>
                            <p className='font-bold ml-3'>{com.userName}</p>
                            <p className='ml-3'>{com.comment}</p>
                            </div>)
                    }
                </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;