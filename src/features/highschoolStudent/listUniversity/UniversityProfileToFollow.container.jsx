import { FollowSuccessNotification, UnFollowSuccessNotification } from '../../../notification/FollowNotification';
import { FollowUniversity, Following } from '../../../services/FollowUniversityService';
import { UniversityDetail } from '../../../services/UniversityDetail';
import React, { useEffect, useState } from 'react';
import UniversityProfileComponent from '../../../features/public/universityProfile/components/UniversityProfile.component';

const UniversityProfileToFollowContainer = (props) => {
  const { universityID } = props;
  const [universityDetail, setUniversityDetail] = useState('');
  const [followed, setFollowed] = useState('');

  const reload = () => {
    window.location.reload();
  };

  //Follow Button
  const handleFollowButton = (value) => {
    FollowUniversity({
      universityId: value.id
    })
      .then((result) => {
        FollowSuccessNotification('success', result.data.msg);
        setTimeout(reload, 1000);
      })
      .catch((error) => {
        FollowSuccessNotification('error', error.response.data.msg);
      });
  };

  //Unfollow Button
  const handleUnFollowButton = (value) => {
    FollowUniversity({
      universityId: value.id
    })
      .then((result) => {
        UnFollowSuccessNotification('success', result.data.msg);
        setTimeout(reload, 1000);
      })
      .catch((error) => {
        UnFollowSuccessNotification('error', error.response.data.msg);
      });
  };

  const checkFollowed = (universityID) => {
    Following(universityID).then((result) => {
      setFollowed(result.data.data);
    });
  };

  useEffect(() => {
    checkFollowed(universityID);
  }, [universityID]);

  useEffect(() => {
    uniDetail(universityID);
  }, [universityID]);

  const uniDetail = (universityID) => {
    UniversityDetail(universityID).then((result) => {
      setUniversityDetail(result.data.data);
    });
  };
  return (
    <>
      <UniversityProfileComponent
        universityDetail={universityDetail}
        followed={followed}
        handleFollowButton={handleFollowButton}
        handleUnFollowButton={handleUnFollowButton}
      />
    </>
  );
};

export default UniversityProfileToFollowContainer;
