import { Avatar, Divider, Layout, Pagination, Space, Table, Tooltip } from 'antd';
import { PATH_UNIVERSITY_MANAGER } from '../../../../constants/Paths/Path';
import { getListDistrictByProvince } from '../../../../services/DistrictService';
import { getListHighSchool } from '../../../../services/HighSchoolService';
import { getListProvinces } from '../../../../services/ProvinceService';
import { handleFailNotification, handleSuccessNotification } from '../../../../notification/CreateEventNotification';
import { setSelectedHighSchool } from '../../../../redux-flow/selectedHighSchool/selectedHighSchool-action';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import SearchBarComponent from './SearchBar.component';
import TitlePageComponent from '../../../../components/decorator/TitlePage.component';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HistoryIcon from '@mui/icons-material/History';
import { COLOR_ICON } from '../../../../constants/Color';
const SelectHighSchoolContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isDisableDistrict, setIsDisableDistrict] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [listHighSchool, setListHighSchool] = useState();
  const [provinces, setProvinces] = useState();
  const [districts, setDistricts] = useState();
  const [dataSearch, setDataSearch] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    status: '1',
    district: '',
    page: 1,
    limit: 10
  });
  const column = [
    {
      title: 'Ảnh nền',
      dataIndex: 'thumbnailUrl',
      render: (name) => <Avatar shape='square' size='large' src={name} />,
      width: '10%'
    },
    {
      title: 'Tên trường',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      render: (name) => `${name}`,
      width: '20%'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (status, data) =>
        status === 1 ? (
          <span className='px-2 inline-flex text-xs leading-5 font-medium rounded-full bg-teal-100 text-teal-900 lg:text-sm'>
            Đã Kích Hoạt
          </span>
        ) : (
          <span className='px-2 inline-flex text-xs leading-5 font-medium rounded-full bg-red-100 text-teal-900 lg:text-sm'>
            Đang Bị Đóng
          </span>
        ),
      width: '10%'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.name.length - b.name.length,
      render: (name) => `${name}`,
      width: '20%'
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      render: (name) => `${name}`,
      width: '10%'
    },
    {
      title: 'Hành động',
      render: (id, data) => (
        <Space Space direction='horizontal' style={{ width: '100%', justifyContent: 'center' }}>
          <Tooltip title='Chọn trường'>
            <ArrowForwardIosIcon
              onClick={() => handleBookHighSchool(data)}
              style={{ cursor: 'pointer', color: COLOR_ICON }}
              className={`hover:fill-neutral-100`}
            />
          </Tooltip>
        </Space>
      ),
      width: '10%'
    }
  ];
  const handleBookHighSchool = (data) => {
    dispatch(setSelectedHighSchool(data));
    history.push(PATH_UNIVERSITY_MANAGER.BOOKING_EVENT);
  };
  const geAllProvince = () => {
    getListProvinces()
      .then((result) => {
        setProvinces(result.data.data.list);
        setIsDisableDistrict(false);
      })
      .catch((err) => {
        handleFailNotification('Lỗi Khi lấy danh sách tỉnh/thành');
      });
  };
  useEffect(() => {
    getListHSchool(dataSearch);
    geAllProvince();
  }, [dataSearch]);

  const getListHSchool = (data) => {
    getListHighSchool(data)
      .then((res) => {
        setListHighSchool(res.data.data);
        setIsLoading(false);
        handleSuccessNotification('Danh sách các trường cấp 3');
      })
      .catch((err) => {
        handleFailNotification('Lỗi khi lấy danh sách');
      });
  };
  function onChangeProvince(value) {
    getListDistrictByProvince(value)
      .then((result) => {
        setDistricts(result.data.data.list);
      })
      .catch((err) => {
        handleFailNotification('Lỗi Khi lấy danh sách quận');
      });
  }
  const onShowSizeChange = (page, PageSize) => {
    setDataSearch({ ...dataSearch, page, limit: PageSize });
  };
  return (
    <Layout>
      <TitlePageComponent title={'Đăng ký sự kiện'} subTitle={'Bạn có thể đăng ký sự kiện với một trường cấp 3'} />
      <div className='flex flex-col space-y-8 xl:space-y-0 xl:flex-row'>
        <div className='flex-shrink-0 max-w-xl xl:w-80 xl:pr-8'>
          <SearchBarComponent
            setDataSearch={setDataSearch}
            provinces={provinces}
            districts={districts}
            isDisableDistrict={isDisableDistrict}
            onChange={onChangeProvince}
          />
        </div>
        <Space direction={'vertical'}>
          <Table
            columns={column}
            dataSource={listHighSchool?.list}
            bordered={true}
            size='small'
            style={{ width: '65vw' }}
            breakpoints={'450px'}
            pagination={false}
            loading={isLoading}
            scroll={{ y: 700 }}
          />
          <Pagination showSizeChanger onChange={onShowSizeChange} total={listHighSchool?.total} />
        </Space>
      </div>
    </Layout>
  );
};
export default SelectHighSchoolContainer;
