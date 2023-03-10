import React, { useContext, useEffect, useState } from 'react';
import { UilPen } from '@iconscout/react-unicons'
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import { useQuery } from 'react-query';
import { toast } from 'react-hot-toast';

const About = () => {
    const { user } = useContext(AuthContext)
    const {data:profile=[0],refetch}=useQuery({
        queryKey:['appointmentData'],
        queryFn:()=>fetch(`https://onclub-server.vercel.app/profile?email=${user?.email}`)
        .then(res=>res.json())
    })
 const {_id,name,email,university,address}=profile[0];

    // useEffect(() => {
    //     fetch(`https://onclub-server.vercel.app/profile?email=${user?.email}`, {

    //     })
    //         .then(res => res.json()
    //         )
    //         .then(data => {
    //             // console.log(data)
    //             setProfile(data[0])
    //         })
    //         .catch(err => console.error(err))
    // }, [user?.email])

    const editProfile = (event)=> {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const university = event.target.university.value;
        const address = event.target.address.value;
        const updatedInfo = {
            name,
            email,
            university,
            address
        }
        console.log(updatedInfo)
        fetch(`https://onclub-server.vercel.app/updateInfo/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedInfo)

        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if (data.modifiedCount > 0) {
                refetch()
            }
            toast.success('Updated Successful')
        })
        .catch(error=>console.log(error))

    }


    return (
        <div className='lg:w-3/5 mx-auto shadow-xl rounded my-6 p-6 '>
            <h1 className='text-2xl font-bold text-center'>About Yourself</h1>
            <div>
                <div className='relative'><button ><label htmlFor="modal" className='absolute right-0 top-0 cursor-pointer'><UilPen></UilPen></label></button></div>

                <div className='p-6 m-6'>
                    <div className='border-b flex py-3'>
                        <div className='w-2/5 font-bold mr-2'>Name: </div>
                        <div className='w-3/5'><p>{name}</p></div>
                    </div>
                    <div className='border-b flex py-3'>
                        <div className='w-2/5 font-bold mr-2'>Email: </div>
                        <div className='w-3/5'><p>{email}</p></div>
                    </div>
                    <div className='border-b flex py-3 '>
                        <div className='w-2/5 font-bold mr-2'>University: </div>
                        <div className='w-3/5'><p>{university}</p></div>
                    </div>
                    <div className='border-b flex py-3'>
                        <div className='w-2/5 font-bold mr-2'>Address: </div>
                        <div className='w-3/5'><p>{address}</p></div>
                    </div>

                </div>
            </div>

            <div>



                <input type="checkbox" id="modal" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box">
                        <label htmlFor="modal" className="btn btn-sm btn-circle absolute right-2 top-2">???</label>
                        <p>Update your profile information</p>
                        <form onSubmit={editProfile}>
                        {/*  */}
                            <div>
                                <input className='input input-bordered input-sm my-3 ' type="text" name='name' placeholder='Name' defaultValue={name} required />
                            </div>
                            <div>
                                <input className='input input-bordered input-sm my-3 ' type="email" name="email" placeholder='Email' disabled defaultValue={email} />
                            </div>
                            <div>
                                <input className='input input-bordered input-sm my-3 ' type="text" name='university' placeholder='University' required defaultValue={university} />
                            </div>
                            <div>
                                <input className='input input-bordered input-sm my-3 ' type="text" name="address" placeholder='Address' required defaultValue={address} />
                            </div>


                            <div className="modal-action">
                                <button ><label htmlFor="modal" className="btn">Submit</label></button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;