import { Input, Modal, Pagination, Space, Table, Tag, Tooltip } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { EVENT, EVENT_HS, EVENT_ONLINE, EVENT_ORG, EVENT_UNI } from '../../../../constants/AppConst';
import { refactorData } from '../../../../utils/common';
import React from 'react';
import moment from 'moment';
import CancelIcon from '@mui/icons-material/Cancel';
import { COLOR_ICON } from '../../../../constants/Color';
const UnPublicEventComponent = (props) => {
  const { event2, onChange, handleChangeEventName, handlePublicButton, handleChangeEventHost } = props;
  const { Search } = Input;

  const confirm = (value) => {
    Modal.confirm({
      title: 'Xác nhận',
      icon: <ExclamationCircleOutlined />,
      content: `Xác nhận hủy công khai sự kiện ${value.name}`,
      okText: 'Có',
      cancelText: 'Không',
      onOk() {
        handlePublicButton(value);
      },
      onCancel() {}
    });
  };

  const columns = [
    {
      title: 'Tên Sự Kiện',
      dataIndex: 'name',
      key: 'name',
      width: '10%'
    },
    {
      title: 'Địa Chỉ',
      dataIndex: 'address',
      key: 'address',
      width: '10%'
    },
    {
      title: 'Tên Diễn Giả',
      dataIndex: 'hostName',
      key: 'hostName',
      width: '15%'
    },
    {
      title: 'Loại sự kiện',
      dataIndex: 'eventTypeId',
      render: (type) => {
        if (type === EVENT_ONLINE) return <Tag color='#f50'>Sự kiện onlne</Tag>;
        if (type === EVENT_HS) return <Tag color='#2db7f5'>Sự kiện tổ chức tại trường cấp 3</Tag>;
        if (type === EVENT_UNI) return <Tag color='#87d068'>Sự kiện tổ chức tại trường đại học</Tag>;
        if (type === EVENT_ORG) return <Tag color='#108ee9'>Sự kiện tổ chức tại doanh nghiệp</Tag>;
      },
      width: '15%'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (type) => {
        if (type === EVENT.INIT) return <Tag color='green'>Sự kiện được khởi tạo</Tag>;
        if (type === EVENT.ON_GOING) return <Tag color='#2db7f5'>Sự kiện sắp diễn ra</Tag>;
        if (type === EVENT.DONE) return <Tag color='#87d068'>Sự kiện đã kết thúc</Tag>;
        if (type === EVENT.CANCEL) return <Tag color='#108ee9'>Sự kiện bị hủy</Tag>;
      },
      width: '10%'
    },
    {
      title: 'Thời gian bắt đầu',
      dataIndex: 'startTime',
      render: (time) => `${time ? moment(time).format('LLL') : ''}`,
      width: '10%'
    },
    {
      title: 'Thời gian kết thúc',
      dataIndex: 'endTime',
      render: (time) => `${time ? moment(time).format('LLL') : ''}`,
      width: '10%'
    },
    {
      title: 'Thao Tác',
      render: (record) => (
        <Space direction='horizontal' style={{ width: '100%', justifyContent: 'center' }}>
          <Tooltip title='Hủy sự kiện'>
            <CancelIcon
              onClick={() => {
                confirm(record);
              }}
              style={{ cursor: 'pointer', color: COLOR_ICON, fontSize: '2vw' }}
              className={`hover:fill-neutral-100`}
            />
          </Tooltip>
        </Space>
      ),
      width: '7%'
    }
  ];
  return (
    <div>
      <Space>
        <Search placeholder='Nhập tên sự kiện' style={{ width: 300 }} onSearch={handleChangeEventName} />
        <Search placeholder='Nhập tên diễn giả' style={{ width: 300 }} onSearch={handleChangeEventHost} />
      </Space>
      <Space direction={'vertical'}>
        <Table
          columns={columns}
          dataSource={refactorData(event2?.list)}
          pagination={false}
          style={{ width: '85vw' }}
          scroll={{ x: 700, y: 450 }}
        />
        <Pagination showSizeChanger onChange={onChange} total={event2?.total} bordered={true} />
      </Space>
    </div>
  );
};

export default UnPublicEventComponent;
