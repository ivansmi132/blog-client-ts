import {Avatar, Dropdown, MenuProps} from "antd";
import React from "react";
import {useAuthContext} from "../../hooks/useAuthContext";
import {useNavigate} from "react-router-dom";
import {User} from "../../models/User";

export function UserProfileMenu({user} : {user: User}) {

    const authContext = useAuthContext();
    const navigate = useNavigate();

    const items: MenuProps['items'] = [
        {
            label: 'Create Post',
            key: '1'
        },
        {
            label: 'Logout',
            key: '2',
        }
    ];

    const onClick: MenuProps['onClick'] = ({ key }) => {
        switch (key) {
            case '1':
                navigate('/create_post');
                break;
            case "2":
                authContext.logOut();
                break;
        }
    }

    return (
        <div className="navbar-user-profile-container">

            <Dropdown menu={{items, onClick}} trigger={['click']}>

                <a onClick={(e) =>
                    e.preventDefault()}>
                    Welcome, {user.name}
                </a>

            </Dropdown>

            <Avatar size={50} src={user.picture}/>
        </div>
    )
}