import { notification } from 'antd';

export const handleNotification = (status, input) => {
  if (status === 'success') {
    notification.success({
      message: 'Truy vấn thành công!',
      description: `Lấy học bạ thành công`
    });
  } else if (status === 'error') {
    notification.error({
      message: 'Truy vấn thất bại!',
      description: `${input}`
    });
  }
};

export const handleModifyNotification = (status, input) => {
  if (status === 'success') {
    notification.success({
      message: 'Truy vấn thành công!',
      description: `Chỉnh sửa học bạ thành công`
    });
  } else if (status === 'error') {
    notification.error({
      message: 'Truy vấn thất bại!',
      description: `Lỗi: ${input}`
    });
  }
};

export const handleAddNotification = (status, input) => {
  if (status === 'success') {
    notification.success({
      message: 'Truy vấn thành công!',
      description: `Tạo học bạ thành công`
    });
  } else if (status === 'error') {
    notification.error({
      message: 'Truy vấn thất bại!',
      description: `${input}`,
      duration: 3
    });
  }
};

export const handleDeleteRecordItemNotification = (status, input) => {
  if (status === 'success') {
    notification.success({
      message: 'Xóa môn học thành công',
      description: 'Vui lòng đợi trong giây lát...',
      duration: 1
    });
  } else if (status === 'error') {
    notification.error({
      message: 'Truy vấn thất bại!',
      description: `${input}`,
      duration: 3
    });
  }
};

export const handleDeleteSchoolRecordNotification = (status, input) => {
  if (status === 'success') {
    notification.success({
      message: 'Xóa học baj thành công',
      description: 'Vui lòng đợi trong giây lát...',
      duration: 1
    });
  } else if (status === 'error') {
    notification.error({
      message: 'Truy vấn thất bại!',
      description: `${input}`,
      duration: 3
    });
  }
};
