import { AlertOutlined } from '@ant-design/icons';
import { Form, Modal, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CertificationComponent from '../../components/certification/certification.component';
import {
  handleCreateFailNotification,
  handleCreateSuccessNotification
} from '../../notification/CreateCertificationNotification';
import {
  handleDeleteFailNotification,
  handleDeleteSuccessNotification
} from '../../notification/DeleteCertificationNotification';
import { handleNotification } from '../../notification/UpdateAccountNotification';
import {
  getListCertification,
  getCertification,
  updateCertification,
  getCertificationName,
  createCertification,
  deleteCertification
} from '../../services/CertificationService';

const CertificationContainer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [certificates, setCertificates] = useState();
  const [certificateDetail, setCertificateDetail] = useState('');
  const [certificateAdmin, setCertificateAdmin] = useState('');
  const [certificateAdminId, setCertificateAdminId] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { user } = useSelector((state) => state.authentication);
  const handleChange = (value) => {
    setCertificateAdminId(value);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {};

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //DELETE CERTIFICATE
  // const confirm = (e) => {
  //   console.log(e);
  //   message.success('Click on Yes');
  // };

  // const cancel = (e) => {
  //   console.log(e);
  //   message.error('Click on No');
  // };

  const handleConfirmDelete = (value) => {
    Modal.confirm({
      onOk() {
        handleDelete(value);
      },
      onCancel() {
        handleCancel();
      },
      title: 'Xác nhận',
      icon: <AlertOutlined />,
      content: 'Bạn có chắc muốn xóa chứng chỉ này ?',
      okText: 'Đồng ý',
      cancelText: 'Không'
    });
  };

  const handleDelete = (value) => {
    deleteCertification(user.userId, value)
      .then((result) => {
        handleDeleteSuccessNotification('success');
        getListCertificate(user.userId);
        setIsModalVisible(false);
      })
      .catch((error) => {
        handleDeleteFailNotification('error');
      });
  };

  //CREATE CERTIFICATE
  const handleCreate = (values) => {
    values.certificationId = certificateAdminId;
    form.resetFields();

    createCertification(values)
      .then((result) => {
        handleCreateSuccessNotification('success');
        getListCertificate(user.userId);
        setIsModalVisible(false);
      })
      .catch((error) => {
        handleCreateFailNotification('error');
      });
  };

  // UPDATE CERTIFICATE
  const handleOnClick = (value) => {
    getCertificate(value);
  };

  const onFinish = (values) => {
    values.studentid = user.userId;
    values.certificationid = certificateDetail.certificationId;
    updateCertification(values)
      .then((result) => {
        handleNotification('success');
      })
      .catch((error) => {
        handleNotification('error');
      });
  };

  // GET LIST CERTIFICATE FOR STUDENT ID
  useEffect(() => {
    getCertificateAdmin();
    getListCertificate(user.userId);
  }, [user.userId]);

  const getListCertificate = (accountId) => {
    getListCertification(accountId).then((result) => {
      setCertificates(result.data.data.list);
      setIsLoading(false);
    });
  };

  const getCertificate = (certificateID) => {
    getCertification(certificateID).then((result) => {
      setCertificateDetail(result.data.data);
      setIsLoading(false);
    });
  };

  const getCertificateAdmin = () => {
    getCertificationName().then((result) => {
      setCertificateAdmin(result.data.data.list);
    });
  };
  return (
    <>
      {isLoading ? (
        <Skeleton />
      ) : (
        <CertificationComponent
          certificates={certificates}
          certificatedetail={certificateDetail}
          certificateadmin={certificateAdmin}
          onFinish={onFinish}
          handleonclick={handleOnClick}
          handlecreate={handleCreate}
          handleChange={handleChange}
          showModal={showModal}
          handleOk={handleOk}
          handleCancel={handleCancel}
          isModalVisible={isModalVisible}
          handledelete={handleDelete}
          handleconfirmdelete={handleConfirmDelete}
          form={form}
        />
      )}
    </>
  );
};

export default CertificationContainer;
