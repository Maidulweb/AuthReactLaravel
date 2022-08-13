import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const MasterLayout = () => {
    return (
        <div>
            <Header />
            <Outlet />
            
        </div>
    );
};

export default MasterLayout;