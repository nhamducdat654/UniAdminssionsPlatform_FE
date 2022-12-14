import { Layout, Space, Tabs, Typography } from 'antd';
import React, { useState } from 'react';
import CreateEventContainer from '../../../features/universityManager/manageEvent/CreateEvent.container';
import EventCheckContainer from '../../../features/universityManager/eventCheck/eventCheck.container';
import ListEventCreatedContainer from '../../../features/universityManager/manageEvent/ListEventCreated.container';
import PublicEventContainer from '../../../features/universityManager/publicEvent/publicEvent.container';
import UnPublicEventContainer from '../../../features/universityManager/publicEvent/unpublicEvent.container';
import TitlePageComponent from '../../../components/decorator/TitlePage.component';
import { Helmet } from 'react-helmet';
import './ManageEvent.module.css';
import { COLOR_EVENT_ON_GOING } from '../../../constants/Color';
import AddBoxIcon from '@mui/icons-material/AddBox';
const ManageEventPage = () => {
  const { TabPane } = Tabs;
  const { Text } = Typography;
  const [currentTab, setCurrentTab] = useState('1');
  const handleChangeActiveKey = (data) => {
    setCurrentTab(data ? data : '1');
  };
  return (
    <Layout>
      <Helmet>
        <title>Trang quản lý sự kiện</title>
      </Helmet>
      <TitlePageComponent
        title={'Quản lý sự kiện'}
        subTitle={
          'Trong mục quản lý sự kiện, bạn có thể xem, tạo mới và chỉnh sửa các sự kiện đã tạo. Bạn có thể thay đổi một sự\n' +
          'kiện truyền thông hay đóng một sự kiện'
        }
      />
      <Tabs
        defaultActiveKey='1'
        type='card'
        forceRender={true}
        destroyInactiveTabPane={true}
        activeKey={currentTab}
        onChange={handleChangeActiveKey}>
        <TabPane tab='Tất cả sự kiện' key='1'>
          <ListEventCreatedContainer />
        </TabPane>
        <TabPane tab='Công khai sự kiện' key='2'>
          <PublicEventContainer handleChangeActiveKey={handleChangeActiveKey} />
        </TabPane>
        <TabPane tab='Sự kiện đang đăng ký' key='5'>
          <EventCheckContainer />
        </TabPane>
        <TabPane tab='Sự kiện sắp diễn ra' key='3'>
          <UnPublicEventContainer />
        </TabPane>
        <TabPane
          tab={
            <Space style={{ color: COLOR_EVENT_ON_GOING }}>
              <AddBoxIcon />
              <Text strong style={{ color: COLOR_EVENT_ON_GOING }}>
                Tạo sự kiện
              </Text>
            </Space>
          }
          key='4'>
          <CreateEventContainer handleChangeActiveKey={handleChangeActiveKey} />
        </TabPane>
      </Tabs>
    </Layout>
  );
};
export default ManageEventPage;
