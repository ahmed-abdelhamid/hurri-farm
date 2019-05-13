import React, { useState } from 'react';
import { Segment, Header, List, Button, Icon } from 'semantic-ui-react';

import EditProfileForm from './EditProfileForm/EditProfileForm';

const ProfileSettings = ({ adminData }) => {
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <React.Fragment>
      <EditProfileForm
        open={modalOpened}
        onClose={() => setModalOpened(false)}
        adminData={adminData}
      />

      <Segment>
        <Header content="البيانات الشخصية" style={{ fontSize: '30px' }} />
        <List size="huge">
          <List.Item>
            <List.Content>
              <List.Icon name="user" color="grey" />
              اسم المستخدم: {`${adminData.username}`}
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Icon name="mobile" color="grey" />
              رقم الجوال: {adminData.mobile}
            </List.Content>
          </List.Item>
        </List>
        <Button
          primary
          icon
          labelPosition="left"
          onClick={() => setModalOpened(true)}
        >
          <Icon name="edit" /> إعدادات الحساب
        </Button>
      </Segment>
    </React.Fragment>
  );
};

export default ProfileSettings;
