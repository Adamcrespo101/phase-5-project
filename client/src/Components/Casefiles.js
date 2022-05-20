import { useEffect, useState } from 'react'


function Casefiles(){

    const [patients, setPatients]= useState([])
    const [selectedPatient, setSelectedPatient] = useState(null)
    const [patientDisplay, setPatientDisplay] = useState("All")

    useEffect(() => {
        fetch('/patients')
        .then(res => res.json())
        .then(data => setPatients(data))
    }, [])

    
    const handleChange = (e) => {
        setPatientDisplay(e.target.value);
      };
      
     const filterPatients = patients.filter((patient) => patient.full_name?.includes(patientDisplay))
      console.log(patients)
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
                <div className='file-container'>
                    { patientDisplay === "All" ? null : filterPatients.map((patient) => {
                        return (
                            <>
                            
                                <h3>Casefile for {patient.first_name} {patient.last_name}</h3>                            
                                <ul >Date of birth : {patient.date_of_birth}</ul>
                                <ul>Email Address: {patient.email}</ul>
                                <ul>Bio: {patient.bio}</ul>
                                    <br></br>                            
                                <h3>Progress Reports</h3>
                                    {patient.casefiles.map((casefile) => {
                                        return (
                                            <ul>{casefile.progress}</ul>
                                        )
                                    })}
                                
                            </>
                        )
                    })}
                </div>

        </div>
    )
}
export default Casefiles;