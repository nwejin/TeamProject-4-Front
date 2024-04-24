import '../styles/global.scss';
import { Metadata } from 'next';
import Header from '../components/header';
import NavBox from '../components/navBox';
import { Providers } from '../Store/provider';

export const metadata: Metadata = {
  title: {
    template: 'project',
    default: 'Weatherable',
  },
  description: '당신만의 옷장을 만들어 편하게 관리해보세요!',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <Header />
          <div className="mainContainer">{children}</div>
          <NavBox />
        </Providers>
      </body>
    </html>
  );
}
