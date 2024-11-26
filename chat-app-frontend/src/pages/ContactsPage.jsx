import React from 'react';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';

const ContactsPage = () => {
  return (
    <div className="layout">
      <Header />
      <Sidebar />
      <main>
        <h2>Contacts Page</h2>
        {/* Contacts content will go here */}
      </main>
    </div>
  );
};

export default ContactsPage;
