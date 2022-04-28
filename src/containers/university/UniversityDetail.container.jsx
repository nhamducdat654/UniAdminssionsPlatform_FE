import UniversityDetailComponent from '../../components/university/UniversityDetail.component';
import { UniversityDetail } from '../../services/university/UniversityDetail/UniversityDetail';
import React, { useEffect, useState } from 'react';

const UniversityDetailContainer = () => {
  const [universitydetail, setuniversitydetail] = useState('');

  useEffect(() => {
    uniDetail(1);
  }, []);

  const uniDetail = (universityID) => {
    UniversityDetail(universityID).then((result) => {
      setuniversitydetail(result.data.data);
    });
  };
  return (
    <>
      <UniversityDetailComponent universitydetail={universitydetail} />
    </>
  );
};

export default UniversityDetailContainer;