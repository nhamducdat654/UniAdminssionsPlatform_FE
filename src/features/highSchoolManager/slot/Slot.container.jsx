import { Layout, Spin } from 'antd';
import {
  createNewSlotService,
  getListSlotHighSchoolService
} from '../../../services/AdminHighSchoolService/AdminHighSchoolSlotsService';
import { handleCreateNotification, handleQueryNotification } from '../../../notification/CreateSlotNotification';
import LeftBarComponent from './components/LeftBar.component';
import React, { useEffect, useState } from 'react';
import ScheduleHighSchoolComponent from './components/ScheduleHighSchool.component';
import TitlePageComponent from '../../../components/decorator/TitlePage.component';

const SlotContainer = () => {
  const [isButtonCreateSlotClicked, setIsButtonCreateSlotClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useState(false);
  const [dataSearch, setDataSearch] = useState();
  const [listSlot, setListSlot] = useState();
  const [listAddingSlot, setListAddingSlot] = useState([]);
  const getListSlot = () => {
    setIsLoading(true);
    getListSlotHighSchoolService(dataSearch)
      .then((res) => {
        setReloadTrigger(false);
        setIsLoading(false);
        setListSlot(res?.data.data.list);
      })
      .catch((err) => {
        handleQueryNotification('error');
      });
  };
  useEffect(() => {
    getListSlot();
  }, [reloadTrigger, dataSearch]);
  useEffect(() => {
    createListSLotEvent(listAddingSlot);
  }, [listAddingSlot]);
  const createListSLotEvent = (listSlot) => {
    if (listSlot !== undefined && listSlot.length > 0) {
      setReloadTrigger(false);
      createNewSlotService(listSlot)
        .then((res) => {
          setIsButtonCreateSlotClicked(false);
          handleCreateNotification('success', res);
          setReloadTrigger(true);
        })
        .catch((error) => {
          handleCreateNotification('error', error.response.data.msg);
        });
    }
  };
  console.log(listSlot);
  return (
    <Layout>
      <TitlePageComponent title={'Tạo slot đăng ký'} subTitle={'Bạn có thể tạo slot đăng ký tại đây'} />
      <div className='flex flex-col space-y-8 xl:space-y-0 xl:flex-row'>
        <div className='flex-shrink-0 max-w-xl xl:w-80 xl:pr-8'>
          <LeftBarComponent
            setListAddingSlot={setListAddingSlot}
            isButtonCreateSlotClicked={isButtonCreateSlotClicked}
            setIsButtonCreateSlotClicked={setIsButtonCreateSlotClicked}
            setDataSearch={setDataSearch}
          />
        </div>
        {isLoading ? (
          <Spin />
        ) : (
          <ScheduleHighSchoolComponent
            listSlot={listSlot}
            setListSlot={setListSlot}
            setListAddingSlot={setListAddingSlot}
            setReloadTrigger={setReloadTrigger}
          />
        )}
      </div>
    </Layout>
  );
};
export default SlotContainer;
