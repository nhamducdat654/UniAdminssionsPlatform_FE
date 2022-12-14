import { Button, Divider, Space, Steps, Typography, notification } from 'antd';
import { CancelSelectedHighSchool } from '../../../redux-flow/selectedHighSchool/selectedHighSchool-action';
import { LoadingOutlined } from '@ant-design/icons';
import { PATH_UNIVERSITY_MANAGER } from '../../../constants/Paths/Path';
import { bookASlotInAdminUniversity } from '../../../services/AdminUniversityService/AdminUniversitySlotServices';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ConfirmBookingComponent from './confirmBooking/ConfirmBooking.component';
import HighSchoolInforComponent from './components/HighSchoolInfor.component';
import Layout from '../../../components/Layout';
import React, { useEffect, useState } from 'react';
import SelectEventContainer from './selectEvent/SelectEvent.container';
import SelectSlotContainer from './selectSlot/SelectSlot.container';

const BookingFlowContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { Title, Text } = Typography;
  const { Step } = Steps;
  const { highSchool } = useSelector((state) => state.selectedHighSchool);
  if (highSchool === null || highSchool === undefined) history.push(PATH_UNIVERSITY_MANAGER.REGIS_EVENT);
  const [currentStep, setCurrentStep] = useState(1);
  const [currenSlotSelected, setCurrentSlotSelected] = useState();
  const [currentEventSelected, setCurrentEventSelected] = useState();
  const onChangeStatus = (status) => {
    if (status < currentStep) setCurrentStep(status);
    if (status === 0) {
      dispatch(CancelSelectedHighSchool());
      history.push(PATH_UNIVERSITY_MANAGER.REGIS_EVENT);
    }
  };
  useEffect(() => {
    if (currentStep === 1 && currenSlotSelected !== undefined) setCurrentStep(2);
  }, [currenSlotSelected]);
  useEffect(() => {
    if (currentStep === 2 && currentEventSelected !== undefined) setCurrentStep(3);
  }, [currentEventSelected]);

  const handleSubmit = () => {
    const bookingObject = {
      eventId: currentEventSelected?.id,
      slotId: currenSlotSelected?.id
    };
    bookASlotInAdminUniversity(bookingObject)
      .then((res) => {
        notification.success({
          message: res,
          description: `????ng k?? th??nh c??ng!`
        });
        setCurrentStep(4);
      })
      .catch((err) => {
        notification.error({
          message: err,
          description: `????ng k?? th???t b???i !`
        });
      });
  };
  const handleFinish = () => {
    history.push(PATH_UNIVERSITY_MANAGER.MANAGE_EVENT);
  };
  return (
    <Layout>
      <div className='flex flex-col space-y-8 xl:space-y-0 xl:flex-row'>
        <div className='flex-shrink-0 max-w-xl xl:w-80 xl:pr-8'>
          <HighSchoolInforComponent highSchool={highSchool} />
          <Divider>Tr???ng th??i</Divider>
          <Steps current={currentStep} onChange={onChangeStatus} direction='vertical'>
            <Step title='B?????c 1' description='????ng k?? tr?????ng c???p 3' />
            <Step title='B?????c 2' description='????ng k?? slot' />
            <Step title='B?????c 3' description='L???a ch???n event mu???n ????ng k??' />
            <Step title='B?????c 4' description='X??c nh???n' />
            {currentStep === 4 ? <Step status='process' title='??ang ch??? x??c nh???n' icon={<LoadingOutlined />} /> : null}
          </Steps>
        </div>
        {currentStep === 1 ? (
          <SelectSlotContainer setCurrentSlotSelected={setCurrentSlotSelected} />
        ) : currentStep === 2 ? (
          <SelectEventContainer setCurrentEventSelected={setCurrentEventSelected} />
        ) : currentStep === 3 ? (
          <ConfirmBookingComponent
            currenSlotSelected={currenSlotSelected}
            currentEventSelected={currentEventSelected}
            handleSubmit={handleSubmit}
          />
        ) : (
          <Space direction={'vertical'}>
            <Title title={1}>????ng k?? ho??n t???t</Title>
            <Text strong>C???n m???t l?????ng th???i gian ????? tr?????ng ?????i h???c ????nh gi?? v?? x??c nh???n th??ng tin event!</Text>
            <Button onClick={handleFinish} type='primary'>
              Ho??n t???t
            </Button>
          </Space>
        )}
      </div>
    </Layout>
  );
};
export default BookingFlowContainer;
