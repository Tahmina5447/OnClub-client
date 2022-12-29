import React, { useContext, useEffect, useState } from 'react';
import { UilThumbsUp } from '@iconscout/react-unicons'
import { UilCommentAltDots } from '@iconscout/react-unicons'
import { UilNavigator } from '@iconscout/react-unicons'
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
const SinglePost = ({ singlepost }) => {
    const { user } = useContext(AuthContext)
    const [comments, setComments] = useState([])
    
    const { image, like, post, _id } = singlepost

    const [likeCount, setLikeCount] = useState(like)

    const handleLike = (event) => {

        fetch(`https://onclub-server.vercel.app/addLike/${_id}`, {
            method: 'PUT',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    setLikeCount(prevLike => prevLike + 1)
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
            postId: _id
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
        <div className='border border-2 my-6 rounded'>
            <div className='p-6 pb-0 '>
                <img className='mx-auto ' src={image} alt="" />
            </div>
            <div className='m-6 border-t border-b py-2 flex'>
                <div onClick={handleLike} className='flex items-center mr-8'>
                    <span className='mr-1'>{likeCount}</span>
                    <UilThumbsUp className='hover:text-orange-600'></UilThumbsUp>
                </div>
                <div className='flex items-center'>
                    <span className=''>{comments.length}</span>
                    <UilCommentAltDots></UilCommentAltDots>
                </div>
            </div>

            <div className='p-6'>{(post).slice(0, 30)}<span className='text-gray-400'>....</span><button className='text-orange-800'><Link to={`/postDetails/${_id}`}>See Details</Link></button></div>
            <div className=' my-4 px-4 '>
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
    );
};

export default SinglePost;