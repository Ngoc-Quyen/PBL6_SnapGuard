import React from 'react';
import NavbarUser from '../../components/NavbarUser';
import Sidebar from '../../components/Sidebar';
import PeopleMyLike from '../../components/PeopleMyLike';

const Dashboard = () => {
    return (
        <div>
            <NavbarUser></NavbarUser>
            <div className="dash-board">
                <Sidebar></Sidebar>
                <PeopleMyLike></PeopleMyLike>
            </div>
        </div>
    );
};

export default Dashboard;
