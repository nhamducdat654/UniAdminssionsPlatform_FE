import { SINGLE } from '../../../../../data/single';
import DetailEventContent from './DetailEventContent.component';
import DetailEventRelatedPosts from './DetailEventRelatedPosts.component';
import React from 'react';

const DetailEventComponent = (props, { className = '' }) => {
  const { event } = props;
  return (
    <>
      <div className={`nc-PageSingleTemplate3 ${className}`} data-nc-id='PageSingleTemplate3'>
        <header className='relative pt-16 z-10 md:py-20 lg:py-28 bg-neutral-900 dark:bg-black'>
          {/* SINGLE HEADER */}
          <div className='dark container relative z-10'>
            <div className='max-w-screen-md'>
              {/*<DetailEventHeader hiddenDesc metaActionStyle='style2' pageData={event} />*/}
            </div>
          </div>

          {/* FEATURED IMAGE */}
          <div className='mt-8 md:mt-0 md:absolute md:top-0 md:right-0 md:bottom-0 md:w-1/2 lg:w-2/5 2xl:w-1/3'>
            <div className='hidden md:block absolute top-0 left-0 bottom-0 w-1/5 from-neutral-900 dark:from-black bg-gradient-to-r'></div>
            <img
              className='block w-full h-full object-cover'
              src='https://images.unsplash.com/photo-1554941068-a252680d25d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80'
              alt=''
            />
          </div>
        </header>

        {/* SINGLE MAIN CONTENT */}
        <div className='container mt-10'>
          <DetailEventContent data={SINGLE} />
        </div>

        {/* RELATED POSTS */}
        <DetailEventRelatedPosts />
      </div>
    </>
  );
};

export default DetailEventComponent;
