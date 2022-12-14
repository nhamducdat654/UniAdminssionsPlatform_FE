import {
  Button,
  Input,
  Modal,
  Pagination,
  Select,
  Space,
  Table,
  Tag,
  notification,
  Divider,
  Skeleton,
  Drawer,
  Tooltip
} from 'antd';
import { EVENT, EVENT_HS, EVENT_ONLINE, EVENT_ORG, EVENT_UNI } from '../../../constants/AppConst';
import { getListEventForUniversity } from '../../../services/GetListEventForUniversity';
import { refactorData } from '../../../utils/common';
import { useSelector } from 'react-redux';
import { useStateWithCallback } from '../../../components/CustomHOOK/SyncUseState';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { COLOR_ICON } from '../../../constants/Color';
import { ENDPOINT_REPORT_GET_STUDENT_RECORD_SETTING } from '../../../constants/Endpoints/ReportEndpoint';
import SingleEventContainer from '../../public/singleEventFeature/SingleEvent.container';
import SingleFlexMonsterComponent from '../flexMonsterData/SingleFlexMonster.component';
import UpdateEventContainer from './UpdateEvent.container';
import { ExclamationCircleTwoTone } from '@ant-design/icons';
const ListEventCreatedContainer = (props) => {
  const [listEventRegister, setListEventRegister] = useState();
  const [currentSelectedEvent, setCurrentSelectedEvent] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state) => state.authentication);
  const [forceReload, setForceReload] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [eventId, setEventId] = useState('');
  const showModal = () => {
    setIsModalVisible(true);
  };
  const showModal2 = () => {
    setIsModalVisible2(true);
  };
  const handleOk = () => {
    setForceReload(true);
    setCurrentSelectedEvent({});
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setForceReload(true);
    setCurrentSelectedEvent({});
    setIsModalVisible(false);
  };
  const { Search } = Input;
  const { Option } = Select;
  const [dataSearch, setDataSearch] = useStateWithCallback({
    name: '',
    hostname: '',
    eventType: '',
    status: '',
    universityID: user?.universityId,
    page: 1,
    limit: 10,
    sort: 'CreatedAt%20desc'
  });
  const handleChangeEvent = (data) => {
    if (data !== undefined && data !== 0) setDataSearch({ ...dataSearch, eventType: data });
    else setDataSearch({ ...dataSearch, eventType: '' });
  };
  const handleChangeEventName = (data) => {
    if (data !== undefined) setDataSearch({ ...dataSearch, name: data });
    else setDataSearch({ ...dataSearch, name: '' });
  };
  const handleChangeEventHost = (data) => {
    if (data !== undefined) setDataSearch({ ...dataSearch, hostname: data });
    else setDataSearch({ ...dataSearch, hostname: '' });
  };
  useEffect(() => {
    getEventForUniversity(dataSearch);
  }, [dataSearch]);
  const showDrawer = () => {
    setIsDrawerVisible(true);
  };
  const onCloseDrawer = () => {
    setIsDrawerVisible(false);
  };
  const notifyNotEditable = () => {
    Modal.confirm({
      title: 'C???nh b??o',
      icon: (
        <ExclamationCircleTwoTone
          twoToneColor='#ff9d52'
          style={{
            fontSize: '32px'
          }}
        />
      ),
      content: `B???n kh??ng th??? ch???nh s???a s??? ki???n n??y!`,
      okText: 'ok',
      cancelText: '????ng',
      onOk() {},
      onCancel() {}
    });
  };
  const getEventForUniversity = (data) => {
    getListEventForUniversity(data)
      .then((result) => {
        setListEventRegister(result.data.data);
        setIsLoading(false);
        notification.success({
          message: 'L???y danh s??ch th??nh c??ng',
          description: `Tr???ng th??i truy v???n: Th??nh c??ng!`
        });
      })
      .catch((err) => {
        notification.error({
          message: 'L???y danh s??ch th???t b???i',
          description: `L???i: ${err.message}`
        });
      });
  };
  const column = [
    {
      title: 'T??n S??? ki???n',
      dataIndex: 'name',
      render: (name) => `${name}`,
      width: '20%'
    },
    {
      title: 'Di???n gi???',
      dataIndex: 'hostName',
      render: (name) => `${name}`,
      width: '10%'
    },
    {
      title: 'Lo???i s??? ki???n',
      dataIndex: 'eventTypeId',
      render: (type) => {
        if (type === EVENT_ONLINE) return <Tag color='#f50'>S??? ki???n online</Tag>;
        if (type === EVENT_HS) return <Tag color='#2db7f5'>S??? ki???n t??? ch???c t???i tr?????ng c???p 3</Tag>;
        if (type === EVENT_UNI) return <Tag color='#87d068'>S??? ki???n t??? ch???c t???i tr?????ng ?????i h???c</Tag>;
        if (type === EVENT_ORG) return <Tag color='#108ee9'>S??? ki???n t??? ch???c t???i doanh nghi???p</Tag>;
      },
      width: '15%'
    },
    {
      title: 'Tr???ng th??i',
      dataIndex: 'status',
      render: (type) => {
        if (type === EVENT.INIT) return <Tag color='green'>S??? ki???n ???????c kh???i t???o</Tag>;
        if (type === EVENT.ON_GOING) return <Tag color='cyan'>S??? ki???n s???p di???n ra</Tag>;
        if (type === EVENT.DONE) return <Tag color='purple'>S??? ki???n ???? k???t th??c</Tag>;
        if (type === EVENT.CANCEL) return <Tag color='orange'>S??? ki???n b??? h???y</Tag>;
      },
      width: '10%'
    },
    {
      title: 'Th???i gian b???t ?????u',
      dataIndex: 'startTime',
      render: (startTime) => `${startTime ? moment(startTime).locale('vi').format('LLL') : ''}`,
      width: '10%'
    },
    {
      title: 'Th???i gian k???t th??c',
      dataIndex: 'endTime',
      render: (endTime) => `${endTime ? moment(endTime).locale('vi').format('LLL') : ''}`,
      width: '10%'
    },
    {
      title: 'H??nh ?????ng',
      render: (status, data) => (
        <Space direction='horizontal' style={{ width: '100%', justifyContent: 'center' }}>
          <Tooltip title='Chi ti???t s??? ki???n'>
            <PreviewIcon
              onClick={() => {
                setForceReload(false);
                setCurrentSelectedEvent(data);
                showModal();
              }}
              style={{ cursor: 'pointer', color: COLOR_ICON }}
              className={`hover:fill-neutral-100`}
            />
          </Tooltip>
          <Divider type={'vertical'} />
          <Tooltip title='Ch???nh s???a s??? ki???n'>
            {data.status === EVENT.INIT ? (
              <EditIcon
                onClick={() => {
                  showDrawer();
                  setEventId(data);
                }}
                style={{ cursor: 'pointer', color: COLOR_ICON }}
                className={`hover:fill-neutral-100`}
              />
            ) : (
              <EditIcon
                onClick={() => notifyNotEditable(data)}
                style={{ cursor: 'pointer', color: COLOR_ICON }}
                className={`hover:fill-red-500`}
              />
            )}
          </Tooltip>
          <Divider type={'vertical'} />
          <Tooltip title='Th???ng k?? s??? ki???n'>
            <AssessmentIcon
              style={{ cursor: 'pointer', color: COLOR_ICON }}
              className={`hover:fill-neutral-100`}
              onClick={() => {
                setForceReload(false);
                setCurrentSelectedEvent(data);
                showModal2();
              }}
            />
          </Tooltip>
        </Space>
      ),
      width: '10%'
    }
  ];
  useEffect(() => console.log(currentSelectedEvent), [currentSelectedEvent]);
  const onShowSizeChange = (page, PageSize) => {
    setDataSearch({ ...dataSearch, page, limit: PageSize });
  };
  const handleOk2 = () => {
    setForceReload(true);
    setCurrentSelectedEvent({});
    setIsModalVisible2(false);
  };
  const handleCancel2 = () => {
    setForceReload(true);
    setCurrentSelectedEvent({});
    setIsModalVisible2(false);
  };
  return (
    <div>
      <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={'80vw'} forceRender={true}>
        {!forceReload ? <SingleEventContainer eventId={currentSelectedEvent?.id} /> : null}
      </Modal>
      <Modal visible={isModalVisible2} onOk={handleOk2} onCancel={handleCancel2} width={'80vw'} forceRender={true}>
        <SingleFlexMonsterComponent
          isReload={forceReload}
          requestData={`${process.env.REACT_APP_API_URL}${ENDPOINT_REPORT_GET_STUDENT_RECORD_SETTING}?event-id=${currentSelectedEvent?.id}&token=${user.token}`}
        />
      </Modal>
      <Drawer
        title='Ch???nh s???a s??? ki???n'
        placement='right'
        size='large'
        onClose={onCloseDrawer}
        visible={isDrawerVisible}>
        <UpdateEventContainer eventId={eventId} />
      </Drawer>
      <Space>
        <Search placeholder='Nh???p t??n s??? ki???n' style={{ width: 300 }} onSearch={handleChangeEventName} />
        <Search placeholder='Nh???p t??n di???n gi???' style={{ width: 300 }} onSearch={handleChangeEventHost} />
        <Select defaultValue={0} onChange={handleChangeEvent} style={{ width: 200 }}>
          <Option value={0}>Ch???n lo???i s??? ki???n</Option>
          <Option value={1}>Online</Option>
          <Option value={2}>T???? ch????c ta??i tr??????ng</Option>
          <Option value={3}>T???? ch????c ta??i ??a??i Ho??c</Option>
          <Option value={4}>T??? ch???c t???i doanh nghi???p</Option>
        </Select>
      </Space>
      <Space direction={'vertical'}>
        <Table
          size={'small'}
          columns={column}
          dataSource={refactorData(listEventRegister?.list)}
          bordered={true}
          pagination={false}
          loading={isLoading}
          style={{ width: '85vw' }}
          scroll={{ x: 700, y: 544 }}
        />
        {listEventRegister?.total > 10 ? (
          <Pagination showSizeChanger onChange={onShowSizeChange} total={listEventRegister?.total} />
        ) : null}
      </Space>
    </div>
  );
};
export default ListEventCreatedContainer;
