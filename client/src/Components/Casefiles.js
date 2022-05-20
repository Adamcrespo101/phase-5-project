import { useEffect, useState } from 'react'
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment'


function Casefiles(){

    const [patients, setPatients]= useState([])
    const [casefiles, setCasefiles]= useState([])
    const [selectedPatient, setSelectedPatient] = useState(null)
    const [patientDisplay, setPatientDisplay] = useState("Select a patient")
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [editState, setEditState]= useState(false)
    

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

      useEffect(() => {
          fetch('/casefiles')
          .then(res => res.json())
          .then(data => setCasefiles(data))
      },[])


    useEffect(() => {
        fetch('/patients')
        .then(res => res.json())
        .then(data => setPatients(data))
    }, [casefiles])

    
    const handleChange = (e) => {
        setPatientDisplay(e.target.value);
      };
      
      const handleProgress = (e) => {
        setProgressData({...progressData, [e.target.name]: e.target.value});
      };
      const filterPatients = patients.filter((patient) => patient.full_name?.includes(patientDisplay))
      const patientInfo = filterPatients.map((patient) => patient.id)
      console.log(patientInfo[0])
      const [progressData, setProgressData]= useState({
        report_date: '',
        progress: '',
        patient_id: patientInfo[0]
    })
    
    function handleSubmit(e){
        e.preventDefault()
        const newReport = {
            report_date: progressData.report_date,
            progress: progressData.progress,
            patient_id: patientInfo[0]
        }
        fetch('/casefiles', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newReport)
        })
        .then(res => res.json())
        .then(data => setCasefiles([...casefiles, data]))
        setOpen(false)
    }  
    
    function handleEditState(){
        setEditState(prev => !prev)
    }

    let date = moment().format("YYYY-MM-DD");
   
    const [editProgressData, setEditProgressData]= useState({
        report_date: '',
        progress: '',
        patient_id: patientInfo[0]
    })
    
    const handleEditProgress = (e) => {
        setEditProgressData({...editProgressData, [e.target.name]: e.target.value});
      };

    function handleEditSubmit(e){
        e.preventDefault()
    }

    return(
        <div className="casefiles">
            <h1>Patient Casefiles:</h1>
            <label>Select a patient casefile to display: </label>
            <select onChange={handleChange}>
                <option>Select a patient</option>
                {patients.map((patient) => {
                    return(
                        <option>{patient.full_name}</option>
                    )
                })}
            </select>
                <div className={ patientDisplay === "Select a patient" ? 'hidden' : 'file-container'}>
                    { patientDisplay === "Select a patient" ? null : filterPatients.map((patient) => {
                        return (
                            <>
                            
                                <h3>Casefile for {patient.first_name} {patient.last_name}</h3>                            
                                <ul ><strong>Date of birth</strong> : {patient.date_of_birth}</ul>
                                <ul><strong>Email Address</strong>: {patient.email}</ul>
                                <div className='patient-bio'>
                                <p><strong>Patient Bio</strong>: {patient.bio}</p>
                                </div>
                                    <br></br>          
                                <details>                      
                                <summary className='report-summary'><h3>Progress Reports</h3></summary>
                                { patient.casefiles.length < 1 ?  <h3 style={{textAlign: "center"}}>No notes have been added yet</h3> : patient.casefiles.map((casefile) => {
                                        return (
                                            <>
                                    {!editState ? 
                                       <Accordion>   
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}
                                          aria-controls="panel1a-content"
                                          id="panel1a-header"
                                        >
                                          <Typography>Update as of {casefile.report_date}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                          <Typography>
                                          {casefile.progress}
                                          </Typography>
                                          <EditIcon onClick={handleEditState}/>
                                          <ClearIcon />
                                        </AccordionDetails>
                                      </Accordion> 
                                      :
                                      <Accordion>   
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}
                                          aria-controls="panel1a-content"
                                          id="panel1a-header"
                                        >
                                          <Typography>Update as of {casefile.report_date}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <form>
                                          <Typography>
                                              <label>Update notes:</label>
                                          </Typography>
                                            <textarea className='bio-box' name="progress" onChange={handleEditProgress} value={editProgressData.progress} placeholder={casefile.progress}></textarea>
                                          <button className='edit-button' type="submit" onClick={handleEditState}>Save changes</button>
                                          <ClearIcon />
                                          </form>
                                        </AccordionDetails>
                                      </Accordion> }
                                             
                                        </>
                                        )
                                    })}  
                                    </details>
                                    <button className='new-update' onClick={handleOpen}>Add new patient notes [+]</button>
                                    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                                        <Box sx={style}>
                                            <form className='add-reports' onSubmit={handleSubmit}>
                                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                                Add patient notes: 
                                            </Typography>
                                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            <label>Date: </label>
                                            <input className="login-inputs" type="text" name="report_date" onChange={handleProgress} placeholder='YYYY/MM/DD' value={progressData.report_date}/>
                                            </Typography>
                                            <Typography>
                                                <label>Notes:</label>
                                            </Typography>
                                            <textarea className='bio-box' name="progress" onChange={handleProgress} value={progressData.progress}></textarea>
                                            <button className='new-update'>Upload notes</button>
                                            </form>
                                        </Box>
                                    </Modal>           
                            </>
                        )
                    })}

                </div>

        </div>
    )
}
export default Casefiles;