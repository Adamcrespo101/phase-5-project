import { useState } from 'react'


function BookAppointment(){

    const [appointmentTime, setAppointmentTime]= useState(null)
    const [selectedDay, setSelectedDay]= useState(null)
    const [open, setOpen]= useState(false)

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

  
    console.log(`weekday: ${selectedDate.day}`, `time: ${appointmentTime}`)
    
    return(
        <div className="appointments">
        <h1>Select an appointment to book:</h1>
        <table className="appointments_table">
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
        </table>
        </div>
    )
}

export default BookAppointment;