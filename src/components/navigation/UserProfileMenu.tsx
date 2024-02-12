import {Avatar, Dropdown, MenuProps} from "antd";
import React from "react";
import {useAuthContext} from "../../hooks/useAuthContext";
import {useNavigate} from "react-router-dom";
import {User} from "../../models/User";
import {DownOutlined, EditOutlined, LogoutOutlined} from '@ant-design/icons';

export function UserProfileMenu({user} : {user: User}) {

    const authContext = useAuthContext();
    const navigate = useNavigate();

    const items: MenuProps['items'] = [
        {
            label: 'Create Post',
            key: '1',
            icon: React.createElement(EditOutlined)
        },
        {
            type: "divider"
        },
        {
            label: 'Logout',
            key: '2',
            icon: React.createElement(LogoutOutlined)
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

            <Dropdown menu={{items, onClick}} trigger={['click']} arrow>

                <a onClick={(e) =>
                    e.preventDefault()}>
                    Welcome, {user.name}
                    <DownOutlined style={{marginLeft: "5px"}} />
                </a>

            </Dropdown>

            <Avatar size={50} src={user.picture}/>
        </div>
    )
}