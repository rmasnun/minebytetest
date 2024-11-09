// Layout.js
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './Layout.css'; // Styling the layout

const Layout = ({ children }) => (
  <div className="layout">
    <Header />
    <main className="main-content">{children}</main>
    <Footer />
  </div>
);

export default Layout;
