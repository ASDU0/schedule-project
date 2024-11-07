
import { useState } from 'react';
import Sidebar from './components/Sidebar'
import './index.css'
import SidebarConIa from './components/SidebarConIA/SidebarConIA';

function App() {
  const [router, setRouter] = useState('manual');

  const onClick = (route) => {
    setRouter(route);
  }
  return (
    <div className="App">
      <div className='navbar'>
        <h1>Schedule</h1>
        <p
          class={`
            ${router === 'manual' ? 'active-link' : ''}
            cursor-pointer 
            `}
          onClick={() => onClick('manual')}
        >Manual</p>
        <p
          class={
            `
            ${router === 'ia' ? 'active-link' : ''}
            cursor-pointer 
            `
          }
          onClick={() => onClick('ia')}
        >
          Con IA
        </p>
      </div>
      {router === 'manual' && <Sidebar />}
      {router === 'ia' && <SidebarConIa />}

    </div>
  );
}

export default App;
