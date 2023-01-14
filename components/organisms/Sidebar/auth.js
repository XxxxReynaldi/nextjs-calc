/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

// import { getDataUser } from '../../../services/user';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(false);
  const [dataUser, setDataUser] = useState({ namaLengkap: '', role: '' });

  const router = useRouter();

  const onLogout = () => {
    Cookies.remove('token');
    router.push('/');
    setIsLogin(false);
  };

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      const jwtToken = atob(token);
      const payload = jwtDecode(jwtToken);
      const userFromPayload = payload.user;
      setIsLogin(true);
      setDataUser(userFromPayload);
    }
  }, []);

  if (isLogin) {
    return (
      <li className='profile'>
        <div className='profile-details'>
          <div className='name_job'>
            <div className='name'>{dataUser.namaLengkap}</div>
            <div className='job'>{dataUser.role}</div>
          </div>
        </div>
        <a onClick={onLogout} style={{ cursor: 'pointer' }}>
          <i className='bx bx-log-out' id='log_out' />
        </a>
      </li>
    );
  }
  return (
    <li className='profile'>
      <div className='profile-details'>
        {/* <img className='profile-img' src='/img/profile.jpg' alt='profileImg' /> */}
        <div className='name_job'>
          <div className='name'>user</div>
          <div className='job'>role</div>
        </div>
      </div>
      <Link href='/' style={{ cursor: 'pointer' }}>
        <i className='bx bx-log-out' id='log_out' />
      </Link>
    </li>
  );
}
