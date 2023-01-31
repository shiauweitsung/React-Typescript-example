import { ReactComponent as HomeSvg } from 'assets/images/icons/home.svg';
import { ReactComponent as StoreSvg } from 'assets/images/icons/book.svg';
import { ReactComponent as FormSvg } from 'assets/images/icons/form.svg';
import { ReactComponent as QrCodeSvg } from 'assets/images/icons/qrCode.svg';
import { ReactComponent as ChartSvg } from 'assets/images/icons/chart.svg';
import { ReactComponent as GoogleSvg } from 'assets/images/icons/google.svg';
import { ReactComponent as ChatSvg } from 'assets/images/icons/chat.svg';

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
    icon: <FormSvg />,
  },
  {
    label: 'ScanQRCode',
    link: '/scan',
    icon: <QrCodeSvg />,
  },
  {
    label: 'EChart',
    link: '/echart',
    icon: <ChartSvg />,
  },
  {
    label: 'Google',
    link: '/google',
    icon: <GoogleSvg />,
  },
  {
    label: 'ChatRoom',
    link: '/chat',
    icon: <ChatSvg />,
  },
  {
    label: 'Hospital',
    link: '/animal_hospital',
    icon: <ChatSvg />,
  },
  {
    label: 'Cookie',
    link: '/cookie',
    icon: <ChatSvg />,
  },
  {
    label: 'Table',
    link: '/table',
    icon: <ChatSvg />,
  },
];

export default sidebarData;
