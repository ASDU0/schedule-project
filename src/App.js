
import { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar'
import { Schedule } from 'me-schedule-days'

const data = [
  {
    id: '01',
    name: 'Procesamiento de Lenguaje Natural',
    days: {
      monday: ['07-11', '09-10'],
      tuesday: [],
      wednesday: ['07-08', '08-09'],
      thursday: ['07-09'],
      friday: [],
      saturday: ['12-16'],
    },
    color: 'red',
  },
  {
    id: '02',
    name: 'Programación II',
    days: {
      monday: ['14-16'],
      tuesday: ['20-21'],
      wednesday: ['14-16'],
      thursday: [],
      friday: [],
      saturday: ['16-20'],
    },
    color: 'black',
  },
]
const API_URL = 'http://localhost:4000/api'
function App() {

  return (
    <div className="App">
      <div style={{ display: 'flex' }}>
        <div style={{ flexShrink: 0 }}>
          <Sidebar
          />
        </div>

        <Schedule
          courses={data}
          borderRightSchedule
          borderBottomSchedule
          backgroundColorSchedule="white"
          onClickId={() => null}
        />
      </div>
    </div>
  );
}

export default App;
