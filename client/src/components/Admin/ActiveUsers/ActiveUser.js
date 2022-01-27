import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { url } from '../../../utils/utils';
import Order from '../../MerchantPortal/MerchantOrder';
import FoodViewModal from '../../Modals/FoodViewModal';
import OrderModal from '../../Modals/OtherModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPoundSign } from '@fortawesome/free-solid-svg-icons';
import timeFormat from '../../../utils/timeFormat';
import ViewOrder from '../../User/Orders/ViewOrder';

const User = (props)=>{
    useEffect(() => {
        var arr = []
        if(props.user.orders.length > 0) {
            props.user.orders.map((val, ind) => {
                fetchOrders(val, ind)
                    .then((res) => {
                        console.log("res", res)
                        arr.push(res)
                    })
            })
            setOrder(arr)
            console.log("arr", arr)
        }
    }, [])
    const [showOrderModal, setShowOrderModal] = useState(false)
    const [showFoodModal, setshowFoodModal] = useState(false)
    const [orders, setOrder] = useState([])
    const [selectedOrder, setSelectedOrder] = useState(null)


    const fetchOrders = async (orderId, index) => {
        try {
            const order = await axios.post(
                url,
                {
                    query: `
                      query{
                        order(orderId:"${orderId}"){
                            _id
                            resturant
                            pickup_time
                            total
                            contact_number
                            foods{
                                image
                                title
                                itemId
                                quantity
                                price
                            }
                         }
                      }
                    `
                }
            );
            return order.data.data.order
            // setUsers(users.data.data.allUsers);
            // setComplete(true);
        } catch (error) {
            throw error;
        }
    };

    return(
        <div className="admin-user-view">
            <p>Name: {props.user.firstName} {props.user.lastName}</p>
            <p>Email: {props.user.email}</p>
            <p>Phone: {props.user.phone}</p>
            <p onClick={() => {
                if(props.user.orders.length > 0) {
                    setShowOrderModal(true)
                }
                }}>Orders activity : {props.user.orders.length}</p>
            <button onClick={()=>{props.blockShow(props.id)}}>Block</button>
            {showOrderModal &&
                <OrderModal show={showOrderModal}>
                    {orders.map((order, id) =>{
                        console.log("Sdf", order)
                        return (
                            <div style={{flexDirection: 'row'}}>
                                <div>
                                    <p>Pick up date: {timeFormat(order.pickup_time)}</p>
                                    <p>Total: <span className="order-total-price"><FontAwesomeIcon icon={faPoundSign}/><span className="order-total">{order.total}</span></span></p>
                                    <p>Ordered {order.foods.length} items</p>
                                </div>
                                <div >
                                    <button className="theme-button" onClick={() => {
                                        setSelectedOrder(order)
                                        setShowOrderModal(false)
                                        setshowFoodModal(true)
                                        }}>Show Foods</button>
                                </div>
                            </div>
                            )
                        })}
                        <div >
                            <button className="theme-button" onClick={() => {
                                setShowOrderModal(false)
                                }}> Cancel
                            </button>
                        </div>
                </OrderModal>}
            {showFoodModal && 
            <FoodViewModal show={showFoodModal} foodViewHandler={() => setshowFoodModal(false)}>
                <ViewOrder
                    modalClose={() => setshowFoodModal(false)}
                    order={selectedOrder}
                />
            </FoodViewModal>}
        </div>
    );
};
export default User;