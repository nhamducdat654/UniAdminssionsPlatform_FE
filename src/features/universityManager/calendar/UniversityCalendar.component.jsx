import { Button, Select, Skeleton, Space, Tag, Typography } from 'antd';
import { PATH_UNIVERSITY_MANAGER } from '../../../constants/Paths/Path';
import { useHistory } from 'react-router-dom';
import React from 'react';
import ScheduleEventComponent from '../../../components/schedule/ScheduleEvent.component';
import { COLOR_EVENT_CANCEL, COLOR_EVENT_ON_GOING } from '../../../constants/Color';

const UniversityCalendarComponent = (props) => {
  const { listSlot, handleChangeSelection, isLoading } = props;
  const { Title, Text } = Typography;
  const history = useHistory();
  const handleRedirect = () => {
    history.push(PATH_UNIVERSITY_MANAGER.REGIS_EVENT);
  };
  return (
    <>
      <div className='flex flex-col space-y-8 xl:space-y-0 xl:flex-row'>
        <div className='flex-shrink-0 max-w-xl xl:w-80 xl:pr-8'>
          <Space direction='vertical' size='small' style={{ display: 'flex' }}>
            <Title level={3} strong>
              Lịch sự kiện
            </Title>
            <Button type='primary' size={'large'} style={{ width: '15rem' }} onClick={handleRedirect}>
              Đăng ký sự kiện
            </Button>
            <Text secondary>Nhấp chuột vào một ngày bất kỳ để xem chi tiết sự kiện đã apply!</Text>
            <Tag
              color='#2db7f5'
              style={{
                width: '15rem',
                height: '3rem',
                textAlign: 'center',
                alignContent: 'center',
                padding: '0.8rem 0'
              }}>
              <Text strong style={{ color: 'white', fontSize: '0.8rem' }}>
                Sự kiện đã diễn ra
              </Text>
            </Tag>
            <Tag
              color={COLOR_EVENT_ON_GOING}
              style={{
                width: '15rem',
                height: '3rem',
                textAlign: 'center',
                alignContent: 'center',
                padding: '0.8rem 0'
              }}>
              <Text strong style={{ color: 'white', fontSize: '0.8rem' }}>
                Sự kiện sắp diễn ra
              </Text>
            </Tag>
            <Tag
              color={COLOR_EVENT_CANCEL}
              style={{
                width: '15rem',
                height: '3rem',
                textAlign: 'center',
                alignContent: 'center',
                padding: '0.8rem 0'
              }}>
              <Text strong style={{ color: 'white', fontSize: '0.8rem' }}>
                Sự kiện đã hủy
              </Text>
            </Tag>
            {/*<Text strong>Bộ lọc sự kiện</Text>*/}
            {/*<Select defaultValue='1' style={{ width: 200 }} onChange={handleChangeSelection}>*/}
            {/*  <Select.Option value='1'>Sự kiện sắp diễn ra</Select.Option>*/}
            {/*  <Select.Option value='2'>Sự kiện đã diễn ra </Select.Option>*/}
            {/*</Select>*/}
          </Space>
        </div>
        <div className='flex-grow'>
          {isLoading ? <Skeleton active /> : <ScheduleEventComponent listSlot={listSlot} />}
        </div>
      </div>
    </>
  );
};
export default UniversityCalendarComponent;
