import * as React from 'react';
import { useState, useEffect } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import moment from 'moment'
import { ScheduleComponent, Inject, Day, WorkWeek, Agenda, Month, ViewDirective, ViewsDirective, EventSettingsModel } from '@syncfusion/ej2-react-schedule'
import { Scheduler, Editing } from 'devextreme-react/scheduler';

function Schedule({admin}){
 

 
  
  // want to be able to sort all of the appointment by date and time***
    
    return(
      <div className="appointments">
        <h1 id="appointment title">Upcoming Appointments:</h1>
        <div className='appointment-container'>
          {admin?.appointments?.map((appointment) => {
            return (
              <div className='appointment-cards'>
                <h2>{appointment.title}</h2>
                <h3>{appointment.notes}</h3>
                <div className='icons'>
                <EditIcon/>
                <RemoveCircleOutlineIcon/>
                </div>
              </div>
            )
          })}
        </div>
      </div>
             
    )
}

export default Schedule;