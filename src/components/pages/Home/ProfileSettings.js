import React, { useState } from 'react';
import {
  Segment,
  Header,
  List,
  Button,
  Icon,
  Message
} from 'semantic-ui-react';

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
              اسم المستخدم: {`${adminData.displayName || 'غير معروف'}`}
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Icon name="mobile" color="grey" />
              رقم الجوال: {adminData.phoneNumber || 'غير معروف'}
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Icon name="mail" color="grey" />
              البريد الإلكترونى: {adminData.email || 'غير معروف'}
            </List.Content>
          </List.Item>
        </List>
        {(!adminData.phoneNumber || !adminData.displayName) && <Message content="بياناتك الشخصية غير مكتملة ،يرجى تحديث بياناتك الشخصية وذلك بالضغط على إعدادات الحساب" /> }
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
