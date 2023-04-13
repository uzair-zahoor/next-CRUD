import React from 'react';
import CustomizedMenus from './button';

const Nav: React.FC = () => {
  return (
    <nav className='nav'>
      <CustomizedMenus name='Student' addLink='student' />
      {/* <CustomizedMenus name="User" addLink="user"/> */}
    </nav>
  );
};

export default Nav;
