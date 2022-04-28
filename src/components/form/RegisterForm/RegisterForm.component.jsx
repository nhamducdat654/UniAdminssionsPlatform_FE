import { DatePicker, Input, Select } from 'antd';
import { getHighSchoolByCode } from '../../../services/HighSchoolService';
import { getUniversityByCode } from '../../../services/UniversityService';
import { handleNotification } from '../../../notification/LoginNotification';
import { useDebouncedCallback } from 'use-debounce';
import ButtonPrimary from '../../field/ButtonPrimary/ButtonPrimary.component';
import Label from '../../commons/Label/Label.component';
import React, { useState } from 'react';
import moment from 'moment';

const RegisterForm = (props) => {
  const { role } = props;
  const { Option } = Select;
  const dateFormat = 'YYYY/MM/DD';
  const weekFormat = 'MM/DD';
  const monthFormat = 'YYYY/MM';
  const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
  const customFormat = (value) => `custom format: ${value.format(dateFormat)}`;
  const customWeekStartEndFormat = (value) =>
    `${moment(value).startOf('week').format(weekFormat)} ~ ${moment(value).endOf('week').format(weekFormat)}`;

  const [value, setValue] = useState('');

  const debounced = useDebouncedCallback(
    // function
    (value) => {
      if (role === 'hs') {
        getHighSchoolByCode(value)
          .then((result) => {
            setValue(result.data.data.name);
          })
          .catch((err) => {
            setValue(<font color='red'>Không tìm thấy !</font>);
          });
      }
      if (role === 'uni') {
        getUniversityByCode(value)
          .then((result) => {
            setValue(result.data.data.name);
          })
          .catch((err) => {
            setValue(<font color='red'>Không tìm thấy !</font>);
          });
      }
    },
    // delay in ms
    1000
  );
  return (
    <div className='rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6'>
      <form className='grid md:grid-cols-2 gap-6' action='#' method='post'>
        <div className='grid md:grid-cols-3 gap-6 block md:col-span-2'>
          <label className='block'>
            <Label>First name</Label>
            <Input placeholder='Example Doe' type='text' className='mt-1' />
          </label>
          <label className='block'>
            <Label>Middle name</Label>
            <Input placeholder='Doe' type='text' className='mt-1' />
          </label>
          <label className='block'>
            <Label>Last name</Label>
            <Input placeholder='Doe' type='text' className='mt-1' />
          </label>
        </div>
        <label className='block '>
          <div className='grid md:grid-cols-3 '>
            <div>
              <Label>Date of birth</Label>
              <div className='mt-1'>
                <DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} />
              </div>
            </div>
            <div>
              <Label>Gender</Label>
              <div className='mt-1'>
                <Select defaultValue='Male' style={{ width: 150 }}>
                  <Option value='Male'>Male</Option>
                  <Option value='Female'>Female</Option>
                  <Option value='Other'>Male</Option>
                </Select>
              </div>
            </div>
            <div>
              <label className='block'>
                <Label>Place of birth</Label>
                <div className='mt-1'>
                  <Select defaultValue='Male' style={{ width: 150 }}>
                    <Option value='Male'>Dak lak</Option>
                    <Option value='Female'>Female</Option>
                    <Option value='Other'>Male</Option>
                  </Select>
                </div>
              </label>
            </div>
          </div>
        </label>
        <label className='block'>
          <Label>Phone number</Label>
          <Input type='password' className='mt-1' />
        </label>
        <label className='block'>
          <Label>Address</Label>
          <Input placeholder='Doe' type='text' className='mt-1' />
        </label>

        <label className='block'>
          <Label>Religion</Label>
          <Input placeholder='Doe' type='text' className='mt-1' />
        </label>
        <label className='block'>
          <Label>ID Card</Label>
          <Input type='password' className='mt-1' />
        </label>
        <label className='block'>
          <Label>Code</Label>
          <Input type='text' className='mt-1' defaultValue='' onChange={(e) => debounced(e.target.value)} />
          {value}
        </label>

        <ButtonPrimary className='md:col-span-2' type='submit'>
          Update profile
        </ButtonPrimary>
      </form>
    </div>
  );
};
export default RegisterForm;
