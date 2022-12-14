import { Button, DatePicker, Form, Image, Input, Select, Skeleton } from 'antd';
import { address, email, firstname, idcard, lastname, phone } from '../../../../../validate/RegisterForm.validate';
import Label from '../../../../../components/commons/Label/Label.component';
import React from 'react';
import SingleUploadWithPreviewContainer from '../../../../../components/UploadImage/SingleUpload/SingleUploadWithPreview.container';
import moment from 'moment';

const UpdaterForm = (props) => {
  const {
    onFinish,
    handleDatePicker,
    provinces,
    onChangeSex,
    onChangePlaceOfBirth,
    onChangeReligion,
    nation,
    onChangeNation,
    accountInformation,
    setImageUrl,
    isLoading
  } = props;
  const { Option } = Select;
  const dateFormat = 'DD/MM/YYYY';
  function onSearch(val) {
    console.log('search:', val);
  }

  const account = {
    lastName: accountInformation.lastName,
    middleName: accountInformation.middleName,
    firstName: accountInformation.firstName,
    profileImageUrl: accountInformation.profileImageUrl,
    genderId: accountInformation.genderId,
    placeOfBirth: accountInformation.placeOfBirth,
    phoneNumber: accountInformation.phoneNumber,
    address: accountInformation.address,
    religion: accountInformation.religion,
    nationality: accountInformation.nationality,
    idCard: accountInformation.idCard,
    emailContact: accountInformation.emailContact,
    dateOfBirth: moment(moment(accountInformation.dateOfBirth).format(dateFormat), dateFormat)
  };

  return (
    <>
      <Form className='grid grid-rows-1 grid-flow-col gap-4' onFinish={onFinish}>
        <div className='row-span-3'>
          <Skeleton active loading={isLoading}>
            <div className='grid justify-items-center rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6'>
              <div>
                <Label>Ảnh đại diện</Label>
              </div>
              <div>
                <Image width={200} src={account.profileImageUrl} />
              </div>
              <div>
                <Form.Item name='profileImageUrl'>
                  <SingleUploadWithPreviewContainer setImageUrl={setImageUrl} />
                </Form.Item>
              </div>
            </div>
          </Skeleton>
        </div>
        <div className='col-span-2'>
          <Skeleton active loading={isLoading}>
            <div className='rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6'>
              <div className='grid md:grid-cols-3 gap-6 block md:col-span-2'>
                <label className='block'>
                  <Label>Họ</Label>
                  <Form.Item name='lastName' rules={lastname} initialValue={account.lastName}>
                    <Input placeholder='Nguyễn, Trần, Lê,...' type='text' className='mt-1' />
                  </Form.Item>
                </label>
                <label className='block'>
                  <Label>Tên đệm</Label>
                  <Form.Item name='middleName' initialValue={account.middleName}>
                    <Input placeholder='Thị, Văn,...' type='text' className='mt-1' />
                  </Form.Item>
                </label>
                <label className='block'>
                  <Label>Tên</Label>
                  <Form.Item name='firstName' rules={firstname} initialValue={account.firstName}>
                    <Input placeholder='Tín, Đạt, Hào,...' type='text' className='mt-1' />
                  </Form.Item>
                </label>
              </div>
              <div className='grid md:grid-cols-3 '>
                <div className='mt-1'>
                  <Label>Ngày sinh</Label>
                  <Form.Item name='dateOfBirth' initialValue={account.dateOfBirth}>
                    <DatePicker
                      style={{ width: 200 }}
                      format={dateFormat}
                      onChange={handleDatePicker}
                      placeholder='ngày tháng năm sinh'
                    />
                  </Form.Item>
                </div>

                <div>
                  <Label>Giới tính</Label>
                  <div className='mt-1'>
                    <Form.Item name='genderId' hasFeedback initialValue={account.genderId}>
                      <Select placeholder='Giới tính' style={{ width: 200 }} onChange={onChangeSex}>
                        <Option value={1}>Nam</Option>
                        <Option value={2}>Nữ</Option>
                      </Select>
                    </Form.Item>
                  </div>
                </div>

                <div>
                  <label className='block'>
                    <Label>Nơi sinh</Label>
                    <div className='mt-1'>
                      <Form.Item name='placeOfBirth' initialValue={account.placeOfBirth}>
                        <Select
                          showSearch
                          placeholder='Thành Phố Hồ Chí Minh..'
                          optionFilterProp='children'
                          onChange={onChangePlaceOfBirth}
                          onSearch={onSearch}
                          filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }>
                          {provinces?.map((item) => (
                            <Option value={item.name}>{item.name}</Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </div>
                  </label>
                </div>
              </div>

              <label className='block '>
                <div className='grid md:grid-cols-2 gap-6 block md:col-span-2 '>
                  <div className='mt-1'>
                    <label className='block'>
                      <Label>Địa chỉ</Label>
                      <Form.Item name='address' rules={address} initialValue={account.address}>
                        <Input placeholder='Doe' type='text' className='mt-1' />
                      </Form.Item>
                    </label>
                  </div>
                  <div className='mt-1'>
                    <label className='block'>
                      <Label>Số điện thoại</Label>
                      <Form.Item name='phoneNumber' rules={phone} initialValue={account.phoneNumber}>
                        <Input type='text' className='mt-1' />
                      </Form.Item>
                    </label>
                  </div>
                </div>
              </label>
              <label className='block '>
                <div className='grid md:grid-cols-2 gap-6 block md:col-span-2 '>
                  <div className='mt-1'>
                    <label className='block'>
                      <Label>Tôn giáo</Label>
                      <Form.Item name='religion' initialValue={account.religion}>
                        <Select placeholder='Tôn giáo' onChange={onChangeReligion}>
                          <Option value='Phật giáo'>Phật giáo</Option>
                          <Option value='Thiên Chúa Giáo'>Thiên chúa giáo</Option>
                          <Option value='không'>Không</Option>
                          <Option value='Khác'>Khác</Option>
                        </Select>
                      </Form.Item>
                    </label>
                  </div>
                  <div className='mt-1'>
                    <label className='block'>
                      <Label>Quốc tịch</Label>
                      <Form.Item name='nationality' initialValue={account.nationality}>
                        <Select
                          showSearch
                          placeholder='Quốc tịch'
                          optionFilterProp='children'
                          onChange={onChangeNation}
                          onSearch={onSearch}
                          filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }>
                          {nation?.map((item) => (
                            <Option value={item.name}>{item.name}</Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </label>
                  </div>
                </div>
              </label>
              <label className='block '>
                <div className='mt-1'>
                  <div className='grid md:grid-cols-2 gap-6 block md:col-span-2 '>
                    <label className='block'>
                      <Label>CMND/CCCD</Label>
                      <Form.Item name='idCard' rules={idcard} initialValue={account.idCard}>
                        <Input type='text' />
                      </Form.Item>
                    </label>
                    <label className='block'>
                      <Label>Email liên hệ</Label>
                      <Form.Item name='emailContact' rules={email} initialValue={account.emailContact}>
                        <Input type='text' className='mt-1' placeholder='abc@gmail.com' />
                      </Form.Item>
                    </label>
                  </div>
                </div>
              </label>
            </div>
          </Skeleton>
        </div>
        <Skeleton active loading={isLoading}>
          <Button className='md:col-span-2' htmlType='submit' type='primary' style={{ borderRadius: 10 }}>
            Cập Nhật
          </Button>
        </Skeleton>
      </Form>
    </>
  );
};
export default UpdaterForm;
