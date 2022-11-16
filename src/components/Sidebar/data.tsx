import { ReactComponent as HomeSvg } from 'assets/images/icons/home.svg';
import { ReactComponent as StoreSvg } from 'assets/images/icons/book.svg';
import { ReactComponent as FromSvg } from 'assets/images/icons/form.svg';
import { ReactNode } from 'react';

type ISidebarData = {
  label: string;
  link: string;
  icon?: ReactNode;
};

export const sidebarData: ISidebarData[] = [
  {
    label: 'Home',
    link: '',
    icon: <HomeSvg />,
  },
  {
    label: 'Store',
    link: '/counter',
    icon: <StoreSvg />,
  },
  {
    label: 'Formik',
    link: '/formik',
    icon: <FromSvg />,
  },
  {
    label: 'ScanQRCode',
    link: '/scan',
    icon: <FromSvg />,
  },
];

export default sidebarData;
