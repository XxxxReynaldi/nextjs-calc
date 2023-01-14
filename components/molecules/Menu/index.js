/* eslint-disable jsx-a11y/alt-text */

import Link from 'next/link';
import cx from 'classnames';

export default function Menu(props) {
  const { icon, title, active, href = '/#' } = props;
  const classTitle = cx({ active });

  return (
    <li className={classTitle}>
      <Link href={href}>
        <div className='icon'>
          <img src={icon} />
        </div>
        <span className='links_name'>{title}</span>
      </Link>
      <span className='tooltip'>{title}</span>
    </li>
  );
}
