import { Helmet } from 'react-helmet';
import React from 'react';
import ListNewDashboard from './ListNewDashboard';
import WelcomeComponent from './Welcome.component';
import { Divider, Typography } from 'antd';
import BackgroundSection from '../../../../components/commons/BackgroundSection/BackgroundSection.component';
import SectionSliderPostsComponent from '../../../../components/commons/SectionSliderPosts/SectionSliderPosts.component';

const HomePageComponent = (props) => {
  const { Text, Title } = Typography;
  return (
    <div className='container relative'>
      <div className='nc-PageHome relative'>
        <Helmet>
          <title>Dashboard || UniFlatForm</title>
        </Helmet>
        <WelcomeComponent />
      </div>
      <ListNewDashboard />
      <Divider>
        <Title level={2}> 🎉Tin tức mới nhất</Title>
      </Divider>
      <div className='relative py-16'>
        <BackgroundSection />
        {/*<SectionSliderPostsComponent posts={POSTS.filter((_, i) => i < 8)} />*/}
      </div>
      {/*<FeaturedEvent events={events} />*/}
    </div>
  );
};
export default HomePageComponent;
