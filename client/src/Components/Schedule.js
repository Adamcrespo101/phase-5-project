import * as React from 'react';
import Paper from '@mui/material/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import { Scheduler, Appointments, WeekView, AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import { useState } from 'react'
import moment from 'moment'

function Schedule(){

  const [appointmentForm, setAppointmentForm]= useState({
    title: '',
    notes: '',
    startDate: '',
    endDate: '',
    allDay: false
  })

    const currentDate = '2022-05-17';
const schedulerData = [
  { startDate: '2022-05-17T09:45', endDate: '2022-05-17T11:00', title: 'Meeting' },
  { startDate: '2022-05-17T12:00', endDate: '2022-05-17T13:30', title: 'Go to a gym' },
];
   function saveAppointment(data){
     setAppointmentForm({
       title: data?.added?.title,
       notes: data?.added?.notes,
       startDate: data?.added?.startDate,
       endDate: data?.added?.endDate,
       allDay: false
     })
   }
   console.log(appointmentForm)
    return(
        <div className="appointments">
        <h1 id="appointment title">Select an opening to book:</h1>
        
        <Paper>
          <Scheduler data={schedulerData}>
            <ViewState currentDate={currentDate}/>
              <EditingState onCommitChanges={saveAppointment}/>
              <IntegratedEditing />
              <WeekView excludedDays={[0,6]} startDayHour={8} endDayHour={18} intervalCount={1}/>
              <Appointments />
              <AppointmentForm/> 
          </Scheduler>
        </Paper>
    </div>
             
    )
}

export default Schedule;