import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { UilThumbsUp } from '@iconscout/react-unicons'
import { UilCommentAltDots } from '@iconscout/react-unicons'
import { UilUsersAlt } from '@iconscout/react-unicons'
import { UilMapMarker } from '@iconscout/react-unicons'
import { UilVideo } from '@iconscout/react-unicons'
import { UilBasketball } from '@iconscout/react-unicons'
import { UilCheckCircle } from '@iconscout/react-unicons'
import profile1 from '../../images/profile1.jpg'
import profile2 from '../../images/profile2.jpg'
import profile3 from '../../images/profile3.jpg'
import profile4 from '../../images/profile4.jpg'
import profile5 from '../../images/profile5.jpg'
import profile6 from '../../images/profile6.jpg'
import { Link } from 'react-router-dom';
const Home = () => {
    const [allPost, setAllPost] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        fetch('http://localhost:5000/allPostHome')
            .then(res => res.json())
            .then(data => {
                setLoading(false)
                setAllPost(data)
            })

    }, [])

    const submitPost = (event) => {
        event.preventDefault();
        const post = event.target.post.value;
        const image = event.target.image.files[0];

        const formData = new FormData()
        formData.append('image', image);
        const url = "https://api.imgbb.com/1/upload?key=ab3e927fbb2142be370cd6e16ff2fdee"
        fetch(url, {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(data => {
                console.log(data.data.display_url)
                const image = data.data.display_url;
                const postInfo = {
                    post,
                    image
                }

                fetch('http://localhost:5000/posts', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(postInfo)
                })
                    .then(res => res.json())
                    .then(data => console.log(data))

            })
            .catch(error => console.log(error))
        event.target.reset();
        toast.success("Post uploaded")



    }


    if (loading) {
        return <div className="mx-auto my-8 w-20 h-20 border-4 border-dashed rounded-full animate-spin dark:border-teal-400"></div>
    }


    return (
        <div className='lg:flex'>
            <div className='w-1/3 my-6 hidden lg:block'>
                <ul>
                    <li className='flex '><UilUsersAlt className='mr-1 text-orange-600 '></UilUsersAlt><span className='font-bold'>Friends</span></li>
                    <li className='flex my-3 '><UilVideo className='mr-1 text-orange-600 '></UilVideo><span className='font-bold'>Live</span></li>
                    <li className='flex '><UilBasketball className='mr-1 text-orange-600 '></UilBasketball><span className='font-bold'>Game</span></li>
                    <li className='flex my-3 '><UilMapMarker className='mr-1 text-orange-600 '></UilMapMarker><span className='font-bold'>Location</span></li>
                    <li className='flex '><UilCheckCircle className='mr-1 text-orange-600 '></UilCheckCircle><span className='font-bold'>Donate</span></li>
                </ul>
            </div>
            <div className=' lg:w-1/3   mx-auto '>
                <div className=' mx-auto shadow-xl rounded-xl border border-orange-600 p-6 m-6 relative'>
                    <form onSubmit={submitPost}>
                        <div>
                            <textarea className='border rounded w-full text-center' name="post" placeholder='Write your post.....' required ></textarea>
                        </div>
                        <div className='mx-auto mt-2'>
                            <input type="file" accept='image/*' name="image" required />
                        </div>
                        <div className=''>
                            <button type='submit' className='absolute right-2 bottom-2 btn btn-xs bg-orange-600 border-0 mt-3'>Post</button>
                        </div>
                    </form>
                </div>
                <div className='mx-auto'>
                    {
                        allPost.map(post => <div className='border border-orange-600 my-6 rounded w-full'>
                            <div className='p-6 pb-0'>
                                <img className='mx-auto' src={post.image} alt="" />
                            </div>
                            <div className='m-6 mb-0 border-t border-b py-2 flex'>
                                <div className='flex items-center mr-8'>
                                    <span className='mr-1 0'>{post.like}</span>
                                    <UilThumbsUp></UilThumbsUp>
                                </div>
                                <div className='flex items-center'>
                                    <span className='mr-1 '></span>
                                    <UilCommentAltDots></UilCommentAltDots>
                                </div>
                            </div>

                            <div className='p-6'>{post.post}<span className='text-gray-400'>....</span><button className='text-orange-800'><Link to={`/postDetails/${post._id}`}>See Details</Link></button></div>
                        </div>)
                    }
                </div>
            </div>
            <div className='w-1/3 mx-auto my-6 hidden lg:block'>
                <ul className='pl-28'>
                    <li className='flex items-center'><img className='w-10 h-10 rounded-full ring ring-orange-600 mr-2' src={profile1} alt="" /><span className='font-bold'>Md Hasan</span></li>
                    <li className='flex items-center my-4'><img className='w-10 h-10 rounded-full ring ring-orange-600 mr-2' src={profile2} alt="" /><span className='font-bold'>Sakib Islam</span></li>
                    <li className='flex items-center'><img className='w-10 h-10 rounded-full ring ring-orange-600 mr-2' src={profile3} alt="" /><span className='font-bold'>Md Sabbir</span></li>
                    <li className='flex items-center my-4'><img className='w-10 h-10 rounded-full ring ring-orange-600 mr-2' src={profile4} alt="" /><span className='font-bold'>Miraz Mafuz</span></li>
                    <li className='flex items-center'><img className='w-10 h-10 rounded-full ring ring-orange-600 mr-2' src={profile5} alt="" /><span className='font-bold'>Sila Anam</span></li>
                    <li className='flex items-center my-4'><img className='w-10 h-10 rounded-full ring ring-orange-600 mr-2' src={profile6} alt="" /><span className='font-bold'>Eva Mahmud</span></li>
                </ul>
            </div>
        </div>
    );
};

export default Home;