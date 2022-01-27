import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { url } from '../../utils/utils';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';

import EditModal from '../Modals/FoodViewModal';
import Spinner from '../Modals/SpinnerModal';

function Profile() {
    let user;
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [complete, setComplete] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [message, setMessage] = useState('');
    const [spinner, setSpinner] = useState(false);

    const oldPassChangeHandler = (e) => {
        setOldPass(e.target.value);
    }
    const newPassChangeHandler = (e) => {
        setNewPass(e.target.value);
    }

    const passwordChangeHandler = async () => {
        try {
            if (oldPass, newPass) {
                setSpinner(true);
                setMessage('');
                const changePass = await axios.post(
                    url,
                    {
                        query: `
                          mutation{
                            userPasswordChange(token:"${localStorage.TOKEN}", oldPassword:"${oldPass}", newPassword:"${newPass}"){
                                success
                                error_message
                            }
                          }
                        `
                    }
                );
                console.log(changePass);
                if (changePass.data.data.userPasswordChange.success) {
                    setMessage('Password changed!');
                } else {
                    setMessage(changePass.data.data.userPasswordChange.error_message);
                }
                setNewPass('');
                setOldPass('');
                setSpinner(false);
            }
        } catch (error) {
            throw error;
        }
    }
    const fetchUser = async () => {
        try {
            const user = await axios.post(
                url,
                {
                    query: `
                       query{
                           fetchUser(token:"${localStorage.TOKEN}"){
                               _id
                               email
                               user_name
                               firstName
                               lastName
                           }
                       }
                    `
                }
            );
            console.log(user);
            setEmail(user.data.data.fetchUser.email);
            setUserId(user.data.data.fetchUser._id);
            setFirstName(user.data.data.fetchUser.firstName)
            setLastName(user.data.data.fetchUser.lastName)
            setComplete(true);

        } catch (error) {
            throw error;
        }
    };
    const editModalShow = () => {
        setEditModal(true);
    }
    const editModalClose = () => {
        setEditModal(false);
    }

    const updateName = async() => {
        try {
            if (firstName, lastName) {
                setSpinner(true);
                setMessage('');
                const changeName = await axios.post(
                    url,
                    {
                        query: `
                          mutation{
                            updateUser(
                                userId: "${userId}",
                                firstName: "${firstName}",
                                lastName: "${lastName}"
                            ){
                                success
                                error_message
                            }
                          }
                        `
                    }
                );
                console.log(changeName);
                if (changeName.data.data.updateUser.success) {
                    setMessage('Name changed!');
                } else {
                    setMessage(changeName.data.data.userPasswordChange.error_message);
                }
                fetchUser()
                setSpinner(false);
            }
        } catch (error) {
            throw error;
        }
    }

    if (complete) {
        user = <div className="profile-section">
            <Spinner show={spinner} />
            <EditModal show={editModal} foodViewHandler={editModalClose}>

            </EditModal>
            <h2>Profile and Settings</h2>
            <div className="user-change-password">
                <h3>User Information</h3>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
                <button onClick={updateName} >Update Name</button>
            </div>
            <h3>Email</h3>
            <p>{email}</p>
            {/* <h3>Name</h3>
                    {userName ? <p>{userName} <button onClick={editModalShow}><FontAwesomeIcon icon={faEdit}/></button></p>:<button onClick={editModalShow}><FontAwesomeIcon icon={faPlus}/> Add your name</button>} */}
            <div className="user-change-password">
                <h3>Change password</h3>
                <input onChange={oldPassChangeHandler} value={oldPass} type="password" placeholder="Old password" />
                <input onChange={newPassChangeHandler} value={newPass} type="password" placeholder="New password" />
                <p>{message}</p>
                <button onClick={passwordChangeHandler}>Change password</button>
            </div>
        </div>
    } else {
        user = <p>Loading....</p>
    }
    useEffect(() => {
        fetchUser();
    }, [])
    return user;
};



export default Profile;