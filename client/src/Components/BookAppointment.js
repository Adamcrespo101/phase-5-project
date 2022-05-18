import { formatDate } from 'devextreme/localization';
import { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


function BookAppointment(){

    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  

    const [appointmentTime, setAppointmentTime]= useState(null)
    const [selectedDay, setSelectedDay]= useState(null)
    const [open, setOpen]= useState(false)

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
        setAppointmentTime(e.target.id)
        console.log(appointmentTime)
    }
    
    function handleDay(e){
       setSelectedDay(e.target.id)
       setOpen(prev => !prev)
    }
    const mappedDays = dates.map((date) => date.day)
    
    const mappedTimes = dates.map((date) => date.time)

    const selectedDate = dates.find((date) => date.day === selectedDay) //WE HAVE SELECTED A WEEKDAY THIS FILTERS THE SELECTED DAY FROM THE REST
    
    const selectedTime = dates.find((date) => date.time === appointmentTime)

  
    console.log(`weekday: ${selectedDate?.day}`, `time: ${appointmentTime}`)

    function logDates (value, event){
       console.log(formatDate(value, 'dd MMM y'))
        
    }
    
    return(
        <div className="appointments">
        <h1>Select an appointment to book:</h1>
        {/*<table className="appointments_table">
                {dates.map((date) => {
                    return(
                        <>
                        <tr>
                            <th className='days columns' id={date.day} onClick={handleDay}>{date.day}</th>
                        </tr>
                        <tr>
                            {open ? selectedDate?.timeSlots?.map((time) => {
                                return (
                                    <td className='cells times' id={time} onClick={handleTime}>{time}</td>
                                )
                            }) : null}
                        </tr>
                        </>
                    )
                })}
        </table>*/}
        <form className='book-appointments'>
            <Calendar onClickDay={handleOpen} defaultActiveStartDate={new Date()} minDate={new Date()} maxDate={new Date(2023, 1, 1)}/>
            <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
        </form>
        </div>
    )
}

export default BookAppointment;