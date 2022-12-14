import { Collapse, Divider, Input, Select, Typography } from 'antd';
import { useDebouncedCallback } from 'use-debounce';
import React, { useState } from 'react';
const SearchBarComponent = (props) => {
  const { Option } = Select;
  const { Title, Text } = Typography;
  const { setDataSearch, provinces, onChange, districts } = props;
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [district, setDistrict] = useState('');
  const [status, setStatus] = useState('');
  const [phone, setPhone] = useState('');
  const { Panel } = Collapse;
  const debounced = useDebouncedCallback(() => {
    setDataSearch({
      name,
      address,
      email,
      phone,
      status,
      district
    });
  }, 1000);
  function onChangeDistrict(value) {
    setDistrict(value);
    debounced();
  }
  function onChangeStatus(value) {
    setStatus(value);
    debounced();
  }
  return (
    <>
      <Collapse defaultActiveKey={['1']}>
        <Panel header='Thông tin cơ bản' key='1'>
          <Text strong>Tên trường cấp 3</Text>
          <Input
            placeholder='Tên trường...'
            type='text'
            onChange={(e) => {
              setName(e.target.value);
              debounced();
            }}
          />
          <Text strong>Địa chỉ</Text>
          <Input
            placeholder='Địa chỉ..'
            type='text'
            onChange={(e) => {
              setAddress(e.target.value);
              debounced();
            }}
          />
          <Text strong>Email</Text>
          <Input
            placeholder='Email...'
            type='text'
            onChange={(e) => {
              setEmail(e.target.value);
              debounced();
            }}
          />
          <Text strong>Số điện thoại</Text>
          <Input
            placeholder='số điện thoại...'
            type='text'
            onChange={(e) => {
              setPhone(e.target.value);
              debounced();
            }}
          />
        </Panel>
        <Panel key='2' header='Thông tin thành phố'>
          <Text strong>Thành phố</Text>
          <Select
            showSearch
            placeholder='Tỉnh/Thành phố'
            optionFilterProp='children'
            onChange={onChange}
            filterOption={(input, option) => option.children.indexOf(input) >= 0}
            style={{ width: '200px' }}>
            {provinces?.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
          <br />
          <Text strong>Quận huyện</Text>
          <Select
            showSearch
            placeholder='Quận/Huyện'
            optionFilterProp='children'
            onChange={onChangeDistrict}
            filterOption={(input, option) => option.children.indexOf(input) >= 0}
            style={{ width: '200px' }}>
            {districts?.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
          <br />
          <Text strong>Trạng thái</Text>
          <Select placeholder='Trạng thái' onChange={onChangeStatus} style={{ width: '200px' }}>
            <Option value={1}>Đã kích hoạt</Option>
            <Option value={0}>Đang bị đóng</Option>
          </Select>
        </Panel>
      </Collapse>
    </>
  );
};
export default SearchBarComponent;
