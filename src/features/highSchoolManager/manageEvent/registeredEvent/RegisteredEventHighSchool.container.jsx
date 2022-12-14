import {
  Button,
  Form,
  Modal,
  Pagination,
  Space,
  Table,
  Tag,
  Typography,
  notification,
  Layout,
  Divider,
  Tooltip,
  Popover
} from 'antd';
import { EVENT_CHECK } from '../../../../constants/AppConst';
import {
  approveAEventService,
  getListEventCheckService,
  rejectAEventService
} from '../../../../services/AdminHighSchoolService/AdminHighSchoolEventCheck';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { refactorDataSlotEventCheckID } from '../../../../utils/common';
import DetailEventComponent from '../../../../components/detailEvent/DetailEvent.component';
import React, { useEffect, useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import TitlePageComponent from '../../../../components/decorator/TitlePage.component';
import moment from 'moment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import PreviewIcon from '@mui/icons-material/Preview';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import { COLOR_ICON, COLOR_ICON_REJECT } from '../../../../constants/Color';
import SingleEventContainer from '../../../public/singleEventFeature/SingleEvent.container';
const RegisteredEventHighSchoolContainer = () => {
  const [requestPayload, setRequestPayload] = useState();
  const [forceLoad, setForceLoad] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSecondModalVisible, setIsSecondModalVisible] = useState(false);
  const [currentSelectedEvent, setCurrentSelectedEvent] = useState({});
  const [idEventCheck, setIdEventCheck] = useState();
  const [data, setData] = useState();
  const payload = {
    page: requestPayload?.page ? requestPayload.page : 1,
    limit: requestPayload?.limit ? requestPayload.limit : 10,
    status: ''
  };
  const getListEventCheckRegistered = () => {
    getListEventCheckService(payload)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {});
  };
  const handleOpenModal = (data, value) => {
    setIsModalVisible(true);
    setIdEventCheck(data.eventCheckId);
  };
  const handleApproveEvent = (data) => {
    approveAEventService(data.eventCheckId)
      .then((res) => {
        notification.success({
          message: 'Th??nh c??ng',
          description: 'Ch???p nh???n s??? ki???n th??nh c??ng'
        });
        setForceLoad(Math.random());
      })
      .catch((err) =>
        notification.error({
          message: 'Th???t b???i',
          description: `Ch???p nh???n s??? ki???n th???t b???i${err}`
        })
      );
  };
  const confirmApproveEvent = (value) => {
    Modal.confirm({
      title: 'X??c th???c',
      icon: <ExclamationCircleOutlined />,
      content: 'Ch???p nh???n s??? ki???n n??y ?',
      okText: 'C??',
      cancelText: 'Kh??ng',
      onOk() {
        handleApproveEvent(value);
      },
      onCancel() {}
    });
  };
  const handleViewDetailEvent = (data) => {
    setCurrentSelectedEvent(data);
    setIsSecondModalVisible(true);
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
      width: '15%'
    },
    {
      title: 'Th???i gian ????ng k??',
      dataIndex: 'eventCreateAt',
      render: (eventCreateAt) => `${eventCreateAt ? moment(eventCreateAt).format('LLL') : ''}`,
      width: '10%'
    },
    {
      title: 'Th???i gian b???t ?????u',
      dataIndex: 'startTime',
      render: (startTime) => `${startTime ? moment(startTime).format('LLL') : ''}`,
      width: '10%'
    },
    {
      title: 'Th???i gian k???t th??c',
      dataIndex: 'endTime',
      render: (endTime) => `${endTime ? moment(endTime).format('LLL') : ''}`,
      width: '10%'
    },
    {
      title: 'Tr???ng th??i',
      dataIndex: 'eventCheckStatus',
      render: (type) => {
        if (type === EVENT_CHECK.Approved) return <Tag color='green'>S??? ki???n ???? ch???p nh???n</Tag>;
        if (type === EVENT_CHECK.PENDING) return <Tag color='cyan'>S??? ki???n ??ang ch??? duy???t</Tag>;
        if (type === EVENT_CHECK.REJECT) return <Tag color='purple'>S??? ki???n ???? t??? ch???i</Tag>;
      },
      width: '10%'
    },
    {
      title: 'H??nh ?????ng',
      dataIndex: 'status',
      render: (eventCheckStatus, data) => (
        <Space direction='horizontal' style={{ width: '100%', justifyContent: 'center' }}>
          <Tooltip title='Xem chi ti???t s??? ki???n'>
            <PreviewIcon
              onClick={() => handleViewDetailEvent(data)}
              style={{ fontSize: '2rem', cursor: 'pointer', color: COLOR_ICON }}
            />
          </Tooltip>

          <Divider type={'vertical'} />
          {data.eventCheckStatus === EVENT_CHECK.Approved ? (
            <Tooltip title='S??? ki???n ???? ???????c ch???p thu???n'>
              <ThumbUpIcon style={{ fontSize: '2rem', cursor: 'pointer', color: COLOR_ICON }} />
              <Divider type={'vertical'} />
              <Text type={'secondary'}>S??? ki???n ???? ch???p nh???n</Text>
            </Tooltip>
          ) : null}
          {data.eventCheckStatus === EVENT_CHECK.REJECT ? (
            <Popover content={data.reason} title='L?? do t??? ch???i' trigger='click'>
              <Tooltip title='Nh???p v??o ????? xem l?? do t??? ch???i'>
                <ThumbDownIcon style={{ fontSize: '2rem', cursor: 'pointer', color: COLOR_ICON_REJECT }} />
                <Divider type={'vertical'} />
                <Text type={'secondary'}>S??? ki???n ???? t??? ch???i</Text>
              </Tooltip>
            </Popover>
          ) : null}
          {data.eventCheckStatus === EVENT_CHECK.PENDING ? (
            <>
              <Tooltip title='Ch???p thu???n s??? ki???n'>
                <CheckCircleIcon
                  onClick={() => confirmApproveEvent(data)}
                  style={{ fontSize: '2rem', cursor: 'pointer', color: COLOR_ICON }}
                />
              </Tooltip>

              <Divider type={'vertical'} />
              <Tooltip title='T??? ch???i s??? ki???n'>
                <UnpublishedIcon
                  danger
                  onClick={() => handleOpenModal(data)}
                  style={{ fontSize: '2rem', cursor: 'pointer', color: COLOR_ICON_REJECT }}
                />
              </Tooltip>
            </>
          ) : null}
        </Space>
      ),
      width: '15%'
    }
  ];
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleOkSecondModal = () => {
    setIsSecondModalVisible(false);
  };
  const handleCancelSecondModal = () => {
    setIsSecondModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  useEffect(() => getListEventCheckRegistered(), [requestPayload, forceLoad]);
  const onShowSizeChange = (page, limit) => {
    setRequestPayload({
      ...requestPayload,
      page,
      limit
    });
  };
  const { Title, Text } = Typography;
  const onFinish = (data) => {
    const payload = {
      id: idEventCheck,
      reason: data.reason
    };
    rejectAEventService(payload)
      .then((res) => {
        notification.success({
          message: 'Th??nh c??ng',
          description: 'T??? ch???i s??? ki???n th??nh c??ng'
        });
        setForceLoad(Math.random());
      })
      .catch((err) =>
        notification.error({
          message: 'Th???t b???i',
          description: `T??? ch???i s??? ki???n th???t b???i${err}`
        })
      );
  };
  return (
    <Layout>
      <Modal
        title='Th??n tin chi ti???t s??? ki???n'
        visible={isSecondModalVisible}
        onOk={handleOkSecondModal}
        onCancel={handleCancelSecondModal}
        footer={null}
        width={'80vw'}>
        <SingleEventContainer eventId={currentSelectedEvent.id} loading={false} />
      </Modal>
      <Modal
        title='T??? ch???i t??? ch???c s??? ki???n'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}>
        <Title level={4}>G???i g??p ?? s???a ?????i n???i dung</Title>
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 24 }} layout='horizontal' onFinish={onFinish}>
          <Form.Item name={'reason'} rules={[{ required: true, message: 'Vui l??ng ??i???n v??o' }]}>
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 16 }}>
            <Button type='primary' htmlType='submit'>
              G???i
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Space direction={'vertical'}>
        <TitlePageComponent
          title={'X??t duy???t s??? ki???n'}
          subTitle={
            'B???n c?? th??? t??m ki???m s??? ki???n c???n ???????c x??t duy???t b???ng t??n. Th???c hi???n thao t??c x??t duy???t trong panel d?????i ????y'
          }
        />
        <Table
          columns={column}
          dataSource={refactorDataSlotEventCheckID(data)}
          bordered={true}
          size='middle'
          style={{ width: '100rem' }}
          pagination={false}
          loading={isLoading}
          scroll={{ y: 600 }}
        />
        {data?.total > 10 ? <Pagination showSizeChanger onChange={onShowSizeChange} total={data?.total} /> : null}
      </Space>
    </Layout>
  );
};

export default RegisteredEventHighSchoolContainer;
