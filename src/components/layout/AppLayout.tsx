
import React from 'react';
import Header from './Header';
import BottomNav from './BottomNav';

type LanguageCode = "en" | "te" | "hi";

interface AppLayoutProps {
  children: React.ReactNode;
  language: LanguageCode;
  isLive?: boolean;
}

const AppLayout = ({ children, language = "te", isLive = false }: AppLayoutProps) => {
  return (
    <div className="app-container">
      <Header language={language} isLive={isLive} />
      <div className="page-container">
        {children}
      </div>
      <BottomNav language={language} />
    </div>
  );
};

export default AppLayout;
