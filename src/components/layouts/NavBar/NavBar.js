import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Menu, Button, Icon } from 'semantic-ui-react';
import { logout } from '../../../actions';
import { history } from '../../App';

const menuItems = [
  { content: 'الرئيسية', name: 'home' },
  { content: 'الطلبات', name: 'orders' },
  { content: 'العملاء', name: 'clients' },
  { content: 'الشركاء', name: 'partners' }
];

const renderMenuItems = (activeItem, setActiveItem) =>
  menuItems.map(({ content, name }, index) => (
    <Menu.Item
      style={{ fontSize: '16px' }}
      as={NavLink}
      to={`/${name}`}
      key={index}
      content={content}
      name={name}
      active={activeItem === name}
      onClick={() => setActiveItem(name)}
    />
  ));

const Header = ({ name, logout }) => {
  const [activeItem, setActiveItem] = useState(null);

  const handleLogout = async () => {
    try {
      await logout();
      history.push('/');
    } catch (e) {}
  };

  return (
    <Menu size="small" inverted>
      <Menu.Item className="text-center">
        <Menu.Header content={name} />
      </Menu.Item>

      {renderMenuItems(activeItem, setActiveItem)}

      <Menu.Menu position="right">
        <Menu.Item>
          <Button icon negative labelPosition="left" onClick={handleLogout}>
            <Icon name="user outline" />
            تسجيل الخروج
          </Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

const mapStateToProps = ({ auth }) => ({
  name: auth.username
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
