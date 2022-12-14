import { Pagination, Spin } from 'antd';
import CardMajor from './Card/CardMajor.component';
import NcImage from '../../../../components/commons/NcImage/NcImage.component';
import React from 'react';

const ListMajorComponent = (props) => {
  const { data, loading, totalPage, onChangePage, dataSearch } = props;
  return (
    <div className={`nc-PageArchive overflow-hidden `} data-nc-id='PageArchive'>
      <Spin tip='Đang tải...' spinning={loading}>
        <div className='w-full px-2 xl:max-w-screen-2xl mx-auto'>
          <div className='rounded-3xl md:rounded-[40px] relative aspect-w-16 aspect-h-13 sm:aspect-h-9 lg:aspect-h-8 xl:aspect-h-5 overflow-hidden '>
            <NcImage
              containerClassName='absolute inset-0'
              src='https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
              className='object-cover w-full h-full'
            />
            <div className='absolute inset-0 bg-black text-white bg-opacity-30 flex flex-col items-center justify-center'>
              <h2 className='inline-block align-middle text-5xl font-semibold md:text-7xl text-white'>
                Nhóm Ngành Đào Tạo
              </h2>
            </div>
          </div>
        </div>
        <div className='container py-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28'>
          <div>
            <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-8 lg:mt-10'>
              {data?.map((item) => (
                <CardMajor key={item.id} post={item} />
              ))}
            </div>
            <div className='flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center'>
              <Pagination total={totalPage} onChange={onChangePage} pageSize={dataSearch.limit} />
            </div>
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default ListMajorComponent;
