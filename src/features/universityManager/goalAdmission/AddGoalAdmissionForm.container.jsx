import { CheckCircleTwoTone } from '@ant-design/icons';
import { CreateGoalAdmisisonsNotification } from '../../../notification/GoalAdmisisonNotification';
import { Modal, Form } from 'antd';
import { addGoalAdmission } from '../../../services/GoalAdmissionService';
import { getAllMajorDepartment } from '../../../services/MajorDepartmentService';
import { getAllSubjectGroup } from '../../../services/SubjectGroupService';
import { getSchoolYear } from '../../../services/SchoolYearService';
import { useSelector } from 'react-redux';
import AddGoalAdmisisonFormComponent from './components/form/AddGoalAdmissionForm.component';
import React, { useEffect, useState } from 'react';

const AddGoalAdmissionFormContainer = (props) => {
  const { user } = useSelector((state) => state.authentication);
  const { selectedSchoolYear } = props;

  const [schoolYear, setSchoolYear] = useState('');
  const [listMajorDepartment, setListMajorDepartment] = useState([]);
  const [listSubjectGroup, setListSubjectGroup] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    getYear(selectedSchoolYear);
    getMajorDepartments({
      'university-id': user.universityId,
      limit: 1000
    });
    getSubjectGroups();
  }, [selectedSchoolYear]);

  const getYear = (data) => {
    setLoading(true);
    getSchoolYear(data).then((result) => {
      setSchoolYear(result.data.data.year);
      setLoading(false);
    });
  };

  const getMajorDepartments = (data) => {
    setLoading(true);
    getAllMajorDepartment(data).then((result) => {
      setListMajorDepartment(result.data.data.list);
      setLoading(false);
    });
  };

  const getSubjectGroups = (data) => {
    setLoading(true);
    getAllSubjectGroup(data).then((result) => {
      setListSubjectGroup(result.data.data.list);
      setLoading(false);
    });
  };

  const onChangeMajor = (value) => {};

  const onChangeSubjectGroup = (value) => {};

  const countDown = () => {
    let secondsToGo = 5;
    const modal = Modal.confirm({
      title: 'Th??m ti??u ch?? tuy???n sinh th??nh c??ng',
      icon: <CheckCircleTwoTone twoToneColor='#52c41a' />,
      content: `B???n c?? mu???n ti???p t???c th??m ti??u ch?? tuy???n sinh ? Th??ng b??o n??y s??? t???t sau ${secondsToGo} gi??y.`,
      okText: 'C??',
      cancelText: 'Kh??ng',
      onOk() {
        Modal.destroyAll();
        form.resetFields();
      },
      onCancel() {
        window.location.reload();
      }
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
      modal.update({
        content: `B???n c?? mu???n ti???p t???c th??m ti??u ch?? tuy???n sinh ? Th??ng b??o n??y s??? t???t sau ${secondsToGo} gi??y.`
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      modal.destroyAll();
      window.location.reload();
    }, secondsToGo * 1000);
  };

  const onFinish = (values) => {
    values.name = `Ti??u ch?? tuy???n sinh n??m ${schoolYear}`;
    values.description = `Ti??u ch?? v?? ??i???m chu???n c???a tr?????ng n??m ${schoolYear}`;
    values.schoolYearId = selectedSchoolYear;
    addGoalAdmission(values)
      .then((result) => {
        countDown();
      })
      .then((error) => {
        CreateGoalAdmisisonsNotification('error', error.response.data.msg);
      });
  };
  return (
    <>
      <AddGoalAdmisisonFormComponent
        listMajorDepartment={listMajorDepartment}
        listSubjectGroup={listSubjectGroup}
        schoolYear={schoolYear}
        onChangeMajor={onChangeMajor}
        onChangeSubjectGroup={onChangeSubjectGroup}
        onFinish={onFinish}
        loading={loading}
        form={form}
      />
    </>
  );
};
export default AddGoalAdmissionFormContainer;
