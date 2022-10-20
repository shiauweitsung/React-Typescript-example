import { ReactComponent as HomeSvg } from 'assets/images/icons/home.svg';
import { ReactComponent as StoreSvg } from 'assets/images/icons/book.svg';
import { ReactNode, SVGProps } from 'react';

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
];

export default sidebarData;
