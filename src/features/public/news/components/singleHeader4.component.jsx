import NcImage from '../../../../components/commons/NcImage/NcImage.component';
import React from 'react';
import SingleTitle from './singleTitle.component';
import { Divider } from 'antd';
import CategoryBadgeList from '../../../../components/commons/CategoryBadgeList/CategoryBadgeList.component';

const SingleHeader4 = (props) => {
  const { newDetail } = props;
  return (
    <>
      <div className={`nc-SingleHeader4 `}>
        <div className='max-w-5xl mx-auto space-y-5 dark'>
          <SingleTitle
            mainClass='text-neutral-900 font-bold text-3xl md:text-4xl md:!leading-[120%] lg:text-5xl 2xl:text-6xl dark:text-neutral-100'
            title={newDetail?.title}
          />
          <Divider orientation='left' style={{ color: 'white' }}>
            CÁC THẺ BÀI VIẾT
          </Divider>
          <div>
            <CategoryBadgeList tagList={newDetail.tagList} />
          </div>
          <span className='block text-base text-neutral-500 md:text-lg dark:text-neutral-400 pb-1'>
            {newDetail?.shortDescription}
          </span>
        </div>

        {/* FEATURED IMAGE */}
        <NcImage
          containerClassName=' my-10'
          className='object-cover w-full h-full rounded-lg shadow-xl'
          src={newDetail?.thumbnailUrl}
        />

        <div className=' space-y-10'>
          <div className='w-full border-b border-neutral-100 dark:border-neutral-800'></div>
        </div>
      </div>
    </>
  );
};

export default SingleHeader4;
