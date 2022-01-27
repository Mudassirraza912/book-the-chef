import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { url } from '../../utils/utils';
import '../../styles/UserControl.scss';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import spinnerModal from '../../components/Modals/SpinnerModal';
import { useHistory } from 'react-router-dom';
function Deactivate() {
    const [userId, setUserId] = useState('');
    const [complete, setComplete] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [pass, setPass] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [message, setMessage] = useState("")

    const history = useHistory()

    const fetchUser = async () => {
        try {
            const user = await axios.post(
                url,
                {
                    query: `
                       query{
                           fetchUser(token:"${localStorage.TOKEN}"){
                               _id
                           }
                       }
                    `
                }
            );
            console.log(user);
            setUserId(user.data.data.fetchUser._id);
            setComplete(true);

        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        fetchUser();
    }, [])

    const deactivateAccountFunc = async () => {
        try {
            if (pass && confirmPass && pass == confirmPass) {
                setSpinner(true);
                setMessage('');
                const deactivate = await axios.post(
                    url,
                    {
                        query: `
                          mutation{
                            deactivateAccount(
                                userId: "${userId}",
                                password: "${pass}"
                            ){
                                success
                                error_message
                            }
                          }
                        `
                    }
                );
                console.log(deactivate);
                if (deactivate.data.data.deactivateAccount.success) {
                    setMessage('account Deactivated!');
                    localStorage.removeItem("TOKEN")
                    history.replace("/")
                } else {
                    setMessage(deactivate.data.data.deactivateAccount.error_message);
                }
                setSpinner(false);
            } else {
                setMessage("password not match")
            }
        } catch (error) {
            throw error;
        }
    }

    return (

        <div className="profile-section">
            <spinnerModal show={spinner} />

            <h2>Permanently deactivate your Account</h2>
            <div className="user-change-password">
                <h3>To Permanently deactivate your account, you'll need to enter your password .Please note that once this has been completed no reactivation of your account will be possible.</h3>
                <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="Password" />
                <input type="password" value={confirmPass} onChange={e => setConfirmPass(e.target.value)} placeholder="Confirm Password" />
                <p>{message}</p>

                <button onClick={deactivateAccountFunc}>Change password</button>
            </div>
        </div>
    );
};

export default Deactivate
