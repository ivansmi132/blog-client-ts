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
            <Dropdown className="navbar-user-profile-container"
                      menu={{items, onClick}}
                      trigger={['click']} arrow>

                <div>
                    <a className="user-profile-name-and-arrow"
                       onClick={(e) =>
                        e.preventDefault()}>

                        <span className="user-profile-name">
                            Welcome, {user.name}
                        </span>

                        <DownOutlined className="user-profile-arrow" />
                    </a>

                    <Avatar size={50} src={user.picture}/>
                </div>

            </Dropdown>
    )
}