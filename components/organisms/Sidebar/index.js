/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useState } from 'react';
import Menu from '../../molecules/Menu';

import Auth from './auth';

export default function SideBar(props) {
  const { activeMenu } = props;
  const [checked, setChecked] = useState(true);

  return (
    <div className={`sidebar ${checked ? 'open' : ''}`}>
      <div className='logo-details'>
        <i className='bx bxl-c-plus-plus icon-logo' />
        <div className='logo_name'>MERN</div>
        <i
          className='bx bx-menu'
          id='btn-toggle'
          onClick={() => {
            setChecked(!checked);
          }}
        />
      </div>
      <ul className='nav-list'>
        <Menu icon='/icons/class.svg' title='Home' href='/admin' active={activeMenu === 'home'} />
        <Menu
          icon='/icons/statistics.svg'
          title='Log aktivitas'
          href='/admin/LogActivity'
          active={activeMenu === 'logActivity'}
        />

        <Auth />
      </ul>
    </div>
  );
}
