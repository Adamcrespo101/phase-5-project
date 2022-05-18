import * as React from 'react';
import { useState } from 'react'
import moment from 'moment'
import { ScheduleComponent, Inject, Day, WorkWeek, Agenda, Month, ViewDirective, ViewsDirective } from '@syncfusion/ej2-react-schedule'
import { Scheduler, Editing } from 'devextreme-react/scheduler';

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

   function onAppointmentFormOpening(e) {
        e.popup.option('showTitle', true);
        e.popup.option('title', e.appointmentData.text ? 
            e.appointmentData.text : 
            'Create a new appointment');
 
        const form = e.form;
        let mainGroupItems = form.itemOption('mainGroup').items;
        if (!mainGroupItems.find(function(i) { return i.dataField === "location" })) {
            mainGroupItems.push({
                colSpan: 1, 
                label: { text: "Location" },
                editorType: "dxTextBox",
                
            });
            form.itemOption('mainGroup', 'items', mainGroupItems);
        }
    }

    return(
        <div className="appointments">
        <h1 id="appointment title">Upcoming Appointments:</h1>
      {/*}
        <Scheduler id="scheduler" defaultCurrentView="week" onAppointmentFormOpening={onAppointmentFormOpening}>
        <View type="day" startDayHour={9} endDayHour={18} />
            <View type="week" startDayHour={9} endDayHour={18}/>
            <Editing allowDragging={false}/>
    </Scheduler>*/}
    <ScheduleComponent currentView='WorkWeek' startHour='8:00' endHour="18:00">
      <Inject services={[WorkWeek, Month, Day, Agenda]}/>
      <ViewsDirective>
        <ViewDirective option="WorkWeek"></ViewDirective>
        <ViewDirective option="Day"></ViewDirective>
        <ViewDirective option="Agenda"></ViewDirective>
        <ViewDirective option="Month" showWeekend={false}></ViewDirective>
      </ViewsDirective>
    </ScheduleComponent>
    </div>
             
    )
}

export default Schedule;