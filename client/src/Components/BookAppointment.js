import { formatDate } from 'devextreme/localization';
import { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import { relativeTimeThreshold } from 'moment';

function BookAppointment({currentUser, setAppointments, appointments}){

  let nav = useNavigate();
    
    
    
    
    const [appointmentTime, setAppointmentTime]= useState('')
    const [selectedDay, setSelectedDay]= useState('')
    const [open, setOpen]= useState(false)
    const [chooseDate, setChooseDate]= useState(false)
    const handleClose = () => setOpen(false);
    const handleOpen = () => {
      setOpen(true)
      setChooseDate(prev => !prev)
    };
    const [appointmentData, setAppointmentData]= useState({
      admin_id: 2,
      patient_id: currentUser?.id,
      time: '',
      startDate: selectedDay,
      endDate: selectedDay,
      type_service: '',
      notes: '',
      title: `Appointment for ${currentUser?.first_name} ${currentUser?.last_name}`,
      location_type: ''
    })

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
      

        const dates = [
            {day: "Monday", timeSlots: ["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"]},
            {day: "Tuesday", timeSlots: ["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"]},
            {day: "Wednesday", timeSlots: ["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"]},
            {day: "Thursday", timeSlots: ["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"]},
            {day: "Friday", timeSlots: ["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"]},]



        const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
        const times = ["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"]

    function handleTime(e){
        setSelectedDay(e.target.id)
        setAppointmentTime(e.target.value)
        console.log(appointmentTime)
    }

    function handleSlot(e){
      console.log(e.target.name)
    }
    
    function handleDay(event, value){
       setSelectedDay(formatDate(value, 'dd MMM y'))
      
    };
    const mappedDays = dates.map((date) => date.day)
    
    const mappedTimes = dates.map((date) => date.time)

    const selectedDate = dates.find((date) => date.day === selectedDay) //WE HAVE SELECTED A WEEKDAY THIS FILTERS THE SELECTED DAY FROM THE REST
    
    const selectedTime = dates.find((date) => date.time === appointmentTime)

    const handleChange = (e) => {
      setAppointmentData({...appointmentData, [e.target.name]: e.target.value});
    };

    function logDates (value, event){
       setSelectedDay(formatDate(value, 'dd MMM y'))
        setOpen(prev => !prev)
    }
    console.log(currentUser)
    function handleSubmit(e){
      const newAppointment = {
        admin_id: 2,
        patient_id: currentUser?.id,
        startDate: selectedDay,
        endDate: selectedDay,
        title: `Appointment for ${currentUser?.first_name} ${currentUser?.last_name} on ${selectedDay} at ${appointmentData.time}`,
        type_service: appointmentData.type_service,
        notes: appointmentData.notes,
        time: appointmentData.time,
        location_type: appointmentData.location_type
      }
      e.preventDefault();
      fetch('/appointments', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newAppointment)
      })
      .then(res => res.json())
      .then(data => setAppointments([...appointments, data]))
      nav('/confirmation')
    }


    console.log(appointmentData)
    return(
        <div className="appointments">
       {/* <h1>Select an appointment to book:</h1>
        <table className="appointments_table">
                {dates.map((date) => {
                    return(
                    
                        <tr>
                            <th className='days columns' id={date.day} onClick={handleDay}>{date.day}</th>
                        </tr>
                    )
                })}

                <tr>
                  {times.map((time) => {

                  })}
                </tr>
                </table>*/}
          <label>Select a date:</label> 
            <Calendar id={!chooseDate ? null : 'hidden'} onClickDay={logDates} defaultActiveStartDate={new Date()} minDate={new Date()} maxDate={new Date(2023, 1, 1)}/>
            
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <form className='book-appointments' onSubmit={handleSubmit}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Appointment for: {selectedDay}
          </Typography>
          <Typography>
            Choose a time slot:
          </Typography>
          <select name="time" onChange={handleChange} value={appointmentData.time}>
            {times.map((time) => {
              return(
                <option key={time} name={time}>{time}</option>
              )
            })}
          </select>
          <Typography>
            Choose Remote or In-person services:
          </Typography>
          <select onChange={handleChange} name='location_type' value={appointmentData.location_type}>
            <option>Remote</option>
            <option>In-person</option>
          </select>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           Select a Service:
          </Typography>
          <select onChange={handleChange} name="type_service" value={appointmentData.type_service}>
            <option >Anxiety and Panic Reduction</option>
            <option >Bereavement Counseling</option>
            <option >Career and Vocational Counseling</option>
            <option >Child and Adolescent Services</option>
            <option >Depression Alleviation</option>
            <option >Marital, Relationship and Family Problems</option>
            <option >Pre- and Post-Surgical Counseling</option>
            <option >Telephone and Video Sessions</option>
          </select>
          <Typography>Additional Notes:</Typography>
          <textarea className='bio-box' name='notes' onChange={handleChange} value={appointmentData.notes} placeholder='Include any information you feel your therapist should know prior to the appointment.'></textarea>
          <button type='submit'>Confirm</button>
      </form>
        </Box>
      </Modal>
      </div>
    )
}

export default BookAppointment;