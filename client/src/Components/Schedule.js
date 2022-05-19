import * as React from 'react';
import { useState, useEffect } from 'react'
import moment from 'moment'
import { ScheduleComponent, Inject, Day, WorkWeek, Agenda, Month, ViewDirective, ViewsDirective, EventSettingsModel } from '@syncfusion/ej2-react-schedule'
import { Scheduler, Editing } from 'devextreme-react/scheduler';

function Schedule(){
  const [admin, setAdmin]= useState({})

  useEffect(() => {
    fetch('/find/2')
    .then(res => res.json())
    .then(data => setAdmin(data))
  }, [])
  
    
    return(
      <div className="appointments">
        <h1 id="appointment title">Upcoming Appointments:</h1>
        <div className='appointment-container'>
          {admin?.appointments?.map((appointment) => {
            return (
              <div className='appointment-cards'>
                <h2>{appointment.title}</h2>
                <h3>{appointment.notes}</h3>
              </div>
            )
          })}
        </div>
      </div>
             
    )
}

export default Schedule;