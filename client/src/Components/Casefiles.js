import { useEffect, useState } from 'react'


function Casefiles(){

    const [patients, setPatients]= useState([])
    const [selectedPatient, setSelectedPatient] = useState(null)


    useEffect(() => {
        fetch('/patients')
        .then(res => res.json())
        .then(data => setPatients(data))
    }, [])


    const handleChange = (e) => {
        setSelectedPatient({[e.target.name]: e.target.value});
      };
      
     console.log(selectedPatient)

    return(
        <div className="casefiles">
            <h1>Patient Casefiles:</h1>
            <select onChange={handleChange}>
                {patients.map((patient) => {
                    return (
                        <option>{patient.first_name} {patient.last_name}</option>
                    )
                })}
            </select>
                

        </div>
    )
}
export default Casefiles;