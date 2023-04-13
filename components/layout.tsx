import React, { ReactNode } from 'react';
import Nav from './navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <>
    <Nav />
    {children}
  </>
);

export default Layout;

