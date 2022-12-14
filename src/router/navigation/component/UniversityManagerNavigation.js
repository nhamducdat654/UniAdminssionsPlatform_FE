import { PATH, PATH_UNIVERSITY_MANAGER } from '../../../constants/Paths/Path';
import ncNanoId from '../../../utils/ncNanoId';

const homePage = [
  {
    id: ncNanoId(),
    name: 'Home Page',
    href: PATH.INDEX
  }
];

const eventManager = [
  {
    id: ncNanoId(),
    href: PATH_UNIVERSITY_MANAGER.CALENDAR,
    name: 'Lịch'
  },
  {
    id: ncNanoId(),
    name: 'Quản lý tuyển sinh',
    type: 'dropdown',
    children: [
      {
        id: ncNanoId(),
        href: PATH_UNIVERSITY_MANAGER.CREATE_EVENT,
        name: 'Tạo sự kiện'
      },
      {
        id: ncNanoId(),
        href: PATH_UNIVERSITY_MANAGER.REGIS_EVENT,
        name: 'Đăng ký sự kiện'
      },
      {
        id: ncNanoId(),
        href: PATH_UNIVERSITY_MANAGER.REGISTERED_EVENT,
        name: 'Sự kiện đã đăng ký'
      }
    ]
  }
];

const eventMenu = [
  {
    id: ncNanoId(),
    href: PATH_UNIVERSITY_MANAGER.NEW,
    name: 'Danh sách tin tức'
  }
];
const profile = [
  {
    id: ncNanoId(),
    href: PATH_UNIVERSITY_MANAGER.PROFILE,
    name: 'Hồ sơ trường'
  },
  {
    id: ncNanoId(),
    href: PATH_UNIVERSITY_MANAGER.UPDATE_PROFILE,
    name: 'Cập nhật hồ sơ trường'
  },
  {
    id: ncNanoId(),
    href: PATH_UNIVERSITY_MANAGER.ACCOUNT_PROFILE,
    name: 'Hồ Sơ Cá Nhân'
  }
];

export const UniversityManagerNavigation = [
  {
    id: ncNanoId(),
    href: PATH.INDEX,
    name: 'Trang chủ',
    type: '',
    children: homePage
  },
  {
    id: ncNanoId(),
    name: 'Trang quản lý',
    href: PATH_UNIVERSITY_MANAGER.CALENDAR
  },
  {
    id: ncNanoId(),
    name: 'Hồ sơ trường',
    type: 'dropdown',
    children: profile
  }
];
