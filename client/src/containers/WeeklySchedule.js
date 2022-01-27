import React, { useState, useEffect } from "react";

import axios from "axios";
import { url } from "../utils/utils";

import "../styles/SearchResult.scss";
import HomeNav from "../components/Navigations/HomeNav";
import Footer from '../components/Footer';
import { set } from "mongoose";


function WeeklySchedule(props) {
  const [resturantId, setResturantId] = useState('612260ca90e2100af040874e');
  const [complete, setComplete] = useState(false);
  const [mondayOpen, setMondayOpen] = useState("")
  const [mondayClose, setMondayClose] = useState("")
  const [tuesdayOpen, setTuesdayOpen] = useState("")
  const [tuesdayClose, setTuesdayClose] = useState("")
  const [wednesdayOpen, setWednesdayOpen] = useState("")
  const [wednesdayClose, setWednesdayClose] = useState("")
  const [thursdayOpen, setThursdayOpen] = useState("")
  const [thursdayClose, setThursdayClose] = useState("")
  const [fridayOpen, setFridayOpen] = useState("")
  const [fridayClose, setFridayClose] = useState("")
  const [saturdayOpen, setSaturdayOpen] = useState("")
  const [saturdayClose, setSaturdayClose] = useState("")
  const [sundayOpen, setSundayOpen] = useState("")
  const [sundayClose, setSundayClose] = useState("")
  
  const updateHours = async () => {
    // console.log("fetchResult run")
    try {
      const updateHours = await axios.post(url, {
        query: `
        mutation{
            updateResturantBussinessHourWeek(
                resturantId: "${localStorage.merchantId}",
                weekHours: {
                  mon: {
                    open: "${mondayOpen}",
                    close: "${mondayClose}"
                },
                tue: {
                    open: "${tuesdayOpen}",
                    close: "${tuesdayClose}"
                },
                wed: {
                    open: "${wednesdayOpen}",
                    close: "${wednesdayClose}"
                },
                thu: {
                    open: "${thursdayOpen}",
                    close: "${thursdayClose}"
                },
                fri: {
                    open: "${fridayOpen}",
                    close: "${fridayClose}"
                },
                sat: {
                    open: "${saturdayOpen}",
                    close: "${saturdayClose}"
                },
                sun: {
                    open: "${sundayOpen}",
                    close: "${sundayClose}"
                }

                }
            ){
                mon {
                    open
                    close
                }
                tue {
                    open
                    close
                }
                wed {
                    open
                    close
                }
                thu {
                    open
                    close
                }
                fri {
                    open
                    close
                }
                sat {
                    open
                    close
                }
                sun {
                    open
                    close
                }

              }
            }
                    `,
      });
      setMondayOpen(updateHours.data.data.updateResturantBussinessHourWeek.mon.open)
      setMondayClose(updateHours.data.data.updateResturantBussinessHourWeek.mon.close)
      setTuesdayOpen(updateHours.data.data.updateResturantBussinessHourWeek.tue.open)
      setTuesdayClose(updateHours.data.data.updateResturantBussinessHourWeek.tue.close)
      setWednesdayOpen(updateHours.data.data.updateResturantBussinessHourWeek.wed.open)
      setWednesdayClose(updateHours.data.data.updateResturantBussinessHourWeek.wed.close)
      setThursdayOpen(updateHours.data.data.updateResturantBussinessHourWeek.thu.open)
      setThursdayClose(updateHours.data.data.updateResturantBussinessHourWeek.thu.close)
      setFridayOpen(updateHours.data.data.updateResturantBussinessHourWeek.fri.open)
      setFridayClose(updateHours.data.data.updateResturantBussinessHourWeek.fri.close)
      setSaturdayOpen(updateHours.data.data.updateResturantBussinessHourWeek.sat.open)
      setSaturdayClose(updateHours.data.data.updateResturantBussinessHourWeek.sat.close)
      setSundayOpen(updateHours.data.data.updateResturantBussinessHourWeek.sun.open)
      setSundayClose(updateHours.data.data.updateResturantBussinessHourWeek.sun.close)
      console.log("fetchResult result", updateHours)
    } catch (error) {
      console.log("fetchResult error", error)
      throw error;
    }
  };


  const getWeeklyHours = async () => {
    try {
      const schedule = await axios.post(
        url,
        {
          query: ` 
                     query{
                         resturant(resturantId:"${localStorage.merchantId}"){
                          business_hours_week {
                             mon {
                              open
                              close
                            }
                            tue {
                                open
                                close
                            }
                            wed {
                                open
                                close
                            }
                            thu {
                                open
                                close
                            }
                            fri {
                                open
                                close
                            }
                            sat {
                                open
                                close
                            }
                            sun {
                                open
                                close
                            }
                         }
                        }
                     }
                  `
        }
      );
      setComplete(true);
      setMondayOpen(schedule.data.data.resturant.business_hours_week.mon.open)
      setMondayClose(schedule.data.data.resturant.business_hours_week.mon.close)
      setTuesdayOpen(schedule.data.data.resturant.business_hours_week.tue.open)
      setTuesdayClose(schedule.data.data.resturant.business_hours_week.tue.close)
      setWednesdayOpen(schedule.data.data.resturant.business_hours_week.wed.open)
      setWednesdayClose(schedule.data.data.resturant.business_hours_week.wed.close)
      setThursdayOpen(schedule.data.data.resturant.business_hours_week.thu.open)
      setThursdayClose(schedule.data.data.resturant.business_hours_week.thu.close)
      setFridayOpen(schedule.data.data.resturant.business_hours_week.fri.open)
      setFridayClose(schedule.data.data.resturant.business_hours_week.fri.close)
      setSaturdayOpen(schedule.data.data.resturant.business_hours_week.sat.open)
      setSaturdayClose(schedule.data.data.resturant.business_hours_week.sat.close)
      setSundayOpen(schedule.data.data.resturant.business_hours_week.sun.open)
      setSundayClose(schedule.data.data.resturant.business_hours_week.sun.close)
      console.log(schedule);
    } catch (error) {
      throw error;
    }

  }


  useEffect(() => {
    console.log("weekly schedule page useEffect")
    getWeeklyHours();
  }, []);

  return (
    <>
      <div style={{ paddingBottom: 20 }}>
        <h1>Weekly Schedule</h1>
        <div style={{ display: "flex", flexDirection: 'column' }}>
          
          <div style={{}}>
            <h3>Monday</h3>
            <div style={{ display: 'flex', justifyContent: "space-between" }}>
              <p><b>OPEN: </b><input value={mondayOpen} onChange={e => setMondayOpen(e.target.value)} /></p>
              <p><b>CLOSE: </b><input value={mondayClose} onChange={e => setMondayClose(e.target.value)} /></p>
            </div>
          </div>
          <div style={{}}>
            <h3>Tuesday</h3>
            <div style={{ display: 'flex', justifyContent: "space-between" }}>
              <p><b>OPEN: </b><input value={tuesdayOpen} onChange={e => setTuesdayOpen(e.target.value)} /></p>
              <p><b>CLOSE: </b><input value={tuesdayClose} onChange={e => setTuesdayClose(e.target.value)} /></p>
            </div>
          </div>
          <div style={{}}>
            <h3>Wednesday</h3>
            <div style={{ display: 'flex', justifyContent: "space-between" }}>
              <p><b>OPEN: </b><input value={wednesdayOpen} onChange={e => setWednesdayOpen(e.target.value)} /></p>
              <p><b>CLOSE: </b><input value={wednesdayClose} onChange={e => setWednesdayClose(e.target.value)} /></p>
            </div>
          </div>
          <div style={{}}>
            <h3>Thursday</h3>
            <div style={{ display: 'flex', justifyContent: "space-between" }}>
              <p><b>OPEN: </b><input value={thursdayOpen} onChange={e => setThursdayOpen(e.target.value)} /></p>
              <p><b>CLOSE: </b><input value={thursdayClose} onChange={e => setThursdayClose(e.target.value)} /></p>
            </div>
          </div>
          <div style={{}}>
            <h3>Friday</h3>
            <div style={{ display: 'flex', justifyContent: "space-between" }}>
              <p><b>OPEN: </b><input value={fridayOpen} onChange={e => setFridayOpen(e.target.value)} /></p>
              <p><b>CLOSE: </b><input value={fridayClose} onChange={e => setFridayClose(e.target.value)} /></p>
            </div>
          </div>
          <div style={{}}>
            <h3>Saturday</h3>
            <div style={{ display: 'flex', justifyContent: "space-between" }}>
              <p><b>OPEN: </b><input value={saturdayOpen} onChange={e => setSaturdayOpen(e.target.value)} /></p>
              <p><b>CLOSE: </b><input value={saturdayClose} onChange={e => setSaturdayClose(e.target.value)} /></p>
            </div>
          </div>
          <div style={{}}>
            <h3>Sunday</h3>
            <div style={{ display: 'flex', justifyContent: "space-between" }}>
              <p><b>OPEN: </b><input value={sundayOpen} onChange={e => setSundayOpen(e.target.value)} /></p>
              <p><b>CLOSE: </b><input value={sundayClose} onChange={e => setSundayClose(e.target.value)} /></p>
            </div>
          </div>

          <button onClick={updateHours}>UPDATE</button>

        </div>
      </div>
    </>
  );
}

export default WeeklySchedule;
