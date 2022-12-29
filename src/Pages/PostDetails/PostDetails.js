import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { UilThumbsUp } from '@iconscout/react-unicons'
import { UilCommentAltDots } from '@iconscout/react-unicons'
import { UilNavigator } from '@iconscout/react-unicons'
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const PostDetails = () => {
    const postDetails = useLoaderData('')
    const { user } = useContext(AuthContext)
    const { _id, post, image, likes } = postDetails
    console.log(_id)
    const [like, setLike] = useState(likes + 1 || 1)


    const handleLike = (_id) => {

        const likes = {
            like
        }
        setLike(like + 1)
        fetch(`http://localhost:5000/addLike/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(likes)

        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                // setLike(like)
            })
            .catch(error => console.log(error))
        // if (data.modifiedCount > 0) {
        //     setProfile(updatedInfo)
        // }



    }

    const handleComment = (event) => {
        event.preventDefault();
        const comment = event.target.comment.value;

        const commentInfo = {
            userName: user?.displayName,
            comment
        }

        fetch(`http://localhost:5000/addComment/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(commentInfo)

        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))
    }
    return (
        <div className='w-3/5 mx-auto border border-2 rounded my-10'>
            <div>
                <img className='mx-auto mt-4' src={image} alt="" />
            </div>
            <div className='m-6 border-t border-b py-2 flex'>
                <div onClick={() => handleLike(_id)} className='flex items-center mr-8'>
                    <span className=''>{like}</span>
                    <UilThumbsUp></UilThumbsUp>
                </div>
                <div className='flex items-center'>
                    <span className=''></span>
                    <UilCommentAltDots></UilCommentAltDots>
                </div>
            </div>

            <div className='px-6'>
                <div>
                    <p>{post}</p>
                </div>
                <div className=' my-4 '>
                    <form onSubmit={handleComment} className='flex items-center'>
                        <input type="text" name='comment' className='input input-bordered input-xs mr-1 border-orange-600 text-center ' placeholder='write your comment' />
                        <button type='submit'><UilNavigator className='text-orange-600 font-bold'></UilNavigator></button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;