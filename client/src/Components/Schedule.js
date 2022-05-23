import * as React from 'react';
import { useState, useEffect } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { formatDate } from 'devextreme/localization';


function Schedule({admin, appointments, setAppointments, currentUser, patients}){
 
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
  
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


    const [open, setOpen] = React.useState(false);
    //const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [selectAppointment, setSelectAppointment] = useState(null)
    const [editState, setEditState]= useState(true)
    const [editDate, setEditDate]= useState('')
    const [filterMonth, setFilterMonth]= useState("All")
    const [selectPatient, setSelectPatient]= useState('')
    const [apptEdit, setApptEdit]= useState({
      admin_id: '',
      patient_id: '',
      time: '',
      startDate: '',
      endDate: '',
      type_service: '',
      notes: '',
      title: ``,
      location_type: ''
  })

  const [adminAppt, setAdminAppt]= useState({
    admin_id: '',
    patient_id: '',
    time: '',
    startDate: '',
    endDate: '',
    type_service: '',
    notes: '',
    title: ``,
    location_type: ''
  })

  const times = ["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"]

 
  function handleOpen(appointment){
    setSelectAppointment(appointment.id)
    setOpen(true)
  }

function changeEditState(){
  setEditState(prev => !prev)
}
 
  console.log(selectAppointment)

  function deleteAppointments(id){
    fetch(`/appointments/${selectAppointment.id}`, {
        method: "DELETE"
      })
      const deletedAppointments = appointments.filter(appointment => appointment.id !== selectAppointment.id)
      setAppointments(deletedAppointments)
      setOpen(false)
}

const findPatient = appointments.filter((appointment) => appointment.id === selectAppointment?.id)

function handleEditSubmit(e){
  e.preventDefault()
  const updatedAppointment = {
    admin_id: 1,
    patient_id: selectAppointment.patient_id,
    time: apptEdit.time,
    startDate: editDate,
    endDate: editDate,
    type_service: apptEdit.type_service,
    notes: apptEdit.notes,
    title: `Appointment for ${findPatient[0]?.patient?.first_name} ${findPatient[0]?.patient?.last_name} at ${selectAppointment?.time} on ${selectAppointment?.startDate}`,
    location_type: apptEdit.location_type
  }
  fetch(`/appointments/${selectAppointment.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedAppointment)
    })
    .then(res => res.json())
    .then(data => setAppointments(appointments.map(appointment => {return appointment.id === data.id ? data : appointment}))
    )
    setEditState(prev => !prev)
    setApptEdit({
      admin_id: '',
      patient_id: '',
      time: '',
      startDate: '',
      endDate: '',
      type_service: '',
      notes: '',
      title: ``,
      location_type: ''
    })
}
  // want to be able to sort all of the appointment by date and time***
  function handleDate(value, event){
     setEditDate(formatDate(value, 'dd MMM y'))
  }  

  const handleChange = (e) => {
    setApptEdit({...apptEdit, [e.target.name]: e.target.value});
  };

  const handleAdminAppt = (e) => {
    setAdminAppt({...adminAppt, [e.target.name]: e.target.value})
  }
  
  const filterByMonth = admin?.appointments?.filter((appointment) => appointment.startDate.includes(filterMonth))

  console.log(selectPatient)

  const adminApptSubmit = (e) => {
    e.preventDefault()
    const newAppointment = {
      admin_id: 1,
      patient_id: selectPatient,
      startDate: editDate,
      endDate: editDate,
      title: `Appointment for ${patientName?.full_name} on ${editDate} at ${adminAppt.time}`,
      type_service: adminAppt.type_service,
      notes: adminAppt.notes,
      time: adminAppt.time,
      location_type: adminAppt.location_type
    }
    fetch('/appointments', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newAppointment)
    })
    .then(res => res.json())
    .then(data => setAppointments([...appointments, data]))
    //nav('/confirmation')
    setAdminAppt({
      admin_id: '',
      patient_id: '',
      time: '',
      startDate: '',
      endDate: '',
      type_service: '',
      notes: '',
      title: ``,
      location_type: ''
    })
  }
  
  const adminAppointments = appointments.filter((appointment) => appointment.admin_id === admin?.id)
  
  const patientName = patients.find((patient) => patient.id == selectPatient)
  console.log(patientName)
    return(
      <div className="appointments">
        <h1 id="appointment title">Upcoming Appointments:</h1>
        <label>
          Filter Appointments By Month:  
          <select onChange={(e) => setFilterMonth(e.target.name)}>
            <option name="All">All</option>
            {months.map((month) => {
              return(
                <option key={month} name={month}>{month}</option> 
                )
              })}
              </select>
        </label>
        <br></br>
        <div className='appointment-container'>
          {appointments.map((appointment) => {
            return (
              
              <Accordion key={appointment.id} onClick={() => setSelectAppointment(appointment)}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{appointment.title}</Typography>
              </AccordionSummary>
                {editState ? 
                <>
                <AccordionDetails>
                <Typography>
                Location: {appointment.location_type}
                </Typography>
                <Typography>
                Type of Service: {appointment.type_service}
                </Typography>
                <Typography>
                Additional notes: {appointment.notes}
                </Typography>
                <RemoveCircleOutlineIcon onClick={handleOpen}/>
                <EditIcon onClick={changeEditState}/>
                </AccordionDetails>
                </>
                :
                <>
                <AccordionDetails>
                  <form onSubmit={handleEditSubmit}>
                  <label>Select a new date: 
                    <Calendar onClickDay={handleDate} defaultActiveStartDate={new Date()} minDate={new Date()} maxDate={new Date(2023, 1, 1)} />
                  </label>
                  <br></br>
                  <label>Select a new time: 
                    <select name="time" onChange={handleChange} value={apptEdit.time}>
                      {times.map((time) => {
                        return (
                          <option key={time} name={time}>{time}</option>
                        )
                      })}
                    </select>
                  </label>
                  <br></br>
                <label>
                Location: <select name="location_type" onChange={handleChange} value={apptEdit.location_type}>
                  <option>Remote</option>
                  <option>In person</option>
                </select>
                </label>
                <Typography className="login-inputs">
                <br></br>
                  <label>
                Type of Service: 
                <select name="type_service" onChange={handleChange} value={apptEdit.type_service}>
                <option >Anxiety and Panic Reduction</option>
            <option >Bereavement Counseling</option>
            <option >Career and Vocational Counseling</option>
            <option >Child and Adolescent Services</option>
            <option >Depression Alleviation</option>
            <option >Marital, Relationship and Family Problems</option>
            <option >Pre- and Post-Surgical Counseling</option>
            <option >Telephone and Video Sessions</option>
                  </select>
                  </label>
                  <br></br>
                </Typography>
                <br></br>
                <label>
                Additional notes:
                </label>
                <Typography>
                <textarea className='bio-box' placeholder={appointment.notes} name="notes" onChange={handleChange} value={apptEdit.notes}/>
                </Typography>
                <EditIcon onClick={changeEditState}/>
                <button type="submit" className='save'>Save</button>
                </form>
              </AccordionDetails>
              </>
                }
            
            
            </Accordion>       
          )})}
        </div>
        <div className='admin-appointment-form'>
          <details>
          <summary className='add'>Add an Appointment [+]</summary>
          <form className='book-appointments' onSubmit={adminApptSubmit}>
          <label>Select a patient:</label>
                    <select onChange={(e) => setSelectPatient(e.target.value)}>
                      <option >Select a patient</option>
                      {patients.map((patient) => {
                return (<option key={patient.id} value={patient.id}>{patient.full_name}</option>
                      )})}
                    </select>
                    <br></br>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Select date: 
          <Calendar onClickDay={handleDate} defaultActiveStartDate={new Date()} minDate={new Date()} maxDate={new Date(2023, 1, 1)} />
          </Typography>
          <Typography>
            Choose a time slot:
          </Typography>
          <select name="time" onChange={handleAdminAppt} value={adminAppt.time}>
            {times.map((time) => {
              return(
                <option key={time} name={time}>{time}</option>
              )
            })}
          </select>
          <Typography>
            Choose Remote or In-person services:
          </Typography>
          <select name='location_type' onChange={handleAdminAppt} value={adminAppt.location_type}>
            <option>Remote</option>
            <option>In-person</option>
          </select>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           Select a Service:
          </Typography>
          <select name="type_service" onChange={handleAdminAppt} value={adminAppt.type_service} >
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
          <textarea className='bio-box' name='notes' onChange={handleAdminAppt} value={adminAppt.notes} placeholder='Include additional patient notes for the appointment...'></textarea>
          <button type='submit'>Confirm</button>
      </form>
          </details>
        </div>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you would like to delete this appointment?
          </Typography>
          <Typography className='delete-buttons' id="modal-modal-description" sx={{ mt: 2 }} onClick={deleteAppointments}>
            Confirm
          </Typography>
          <Typography className='delete-buttons' id="modal-modal-description" sx={{ mt: 2 }} onClick={handleClose}>
            Cancel
          </Typography>
        </Box>
      </Modal>
    </div>
  
             
    )
}

export default Schedule;