import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function MyAppointments({currentUser, appointments, setAppointments}){

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [apptSelect, setApptSelect]= useState(null)
    let nav = useNavigate()
    
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

      function deleteAppointments(id){
        fetch(`/appointments/${apptSelect}`, {
            method: "DELETE"
          })
          const deletedAppointments = appointments.filter(appointment => appointment.id !== apptSelect)
          setAppointments(deletedAppointments)
          setOpen(false)
          nav('/my_appointments')
    }

    console.log(currentUser)
    return(
        <div className="my-appointments">
            <h1>My Appointments:</h1>
            { currentUser?.appointments?.length < 1 ? 
            
            
            
            <h1>No appoinments have been scheduled!</h1>
            
            
            :
            
                <>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Appointment</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Service</TableCell>
            <TableCell align="right" className='notes-header'>Additional Notes</TableCell>
            <TableCell align="right" className='notes-header'>Cancel</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentUser?.appointments?.map((appointment) => (
            <TableRow
              key={appointment.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onMouseOver={() => setApptSelect(appointment.id)}
            >
              <TableCell component="th" scope="row">
                {appointment.title}
              </TableCell>
              <TableCell align="right">{appointment.startDate}</TableCell>
              <TableCell align="right">{appointment.location_type}</TableCell>
              <TableCell align="right">{appointment.type_service}</TableCell>
              <TableCell align="right" className='notes'>{appointment.notes}</TableCell>
              <TableCell align="right" className='notes'><DoDisturbIcon onClick={handleOpen}/></TableCell>
            </TableRow>
            
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you would like to cancel your appointment?
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
        </>
    }
        </div>
    )
}

export default MyAppointments;