
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Youtube, BookOpen, Calendar, Settings } from "lucide-react";

// Language translations
const translations = {
  en: {
    home: "Home",
    sermons: "Sermons",
    bibleStudy: "Bible Study",
    settings: "Settings"
  },
  te: {
    home: "హోమ్",
    sermons: "ప్రసంగాలు",
    bibleStudy: "బైబిల్ స్టడీ",
    settings: "సెట్టింగ్స్"
  },
  hi: {
    home: "होम",
    sermons: "उपदेश",
    bibleStudy: "बाइबिल अध्ययन",
    settings: "सेटिंग्स"
  }
};

type LanguageCode = "en" | "te" | "hi";

interface BottomNavProps {
  language: LanguageCode;
}

const BottomNav = ({ language = "te" }: BottomNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const t = translations[language] || translations.en;
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
      <div className="flex justify-around items-center h-16">
        <button 
          className={`nav-tab ${isActive("/") ? "nav-active" : "nav-inactive"}`}
          onClick={() => navigate("/")}
        >
          <Youtube className="nav-icon" />
          <span>{t.home}</span>
        </button>
        
        <button 
          className={`nav-tab ${isActive("/sermons") ? "nav-active" : "nav-inactive"}`}
          onClick={() => navigate("/sermons")}
        >
          <BookOpen className="nav-icon" />
          <span>{t.sermons}</span>
        </button>
        
        <button 
          className={`nav-tab ${isActive("/bible-study") ? "nav-active" : "nav-inactive"}`}
          onClick={() => navigate("/bible-study")}
        >
          <Calendar className="nav-icon" />
          <span>{t.bibleStudy}</span>
        </button>
        
        <button 
          className={`nav-tab ${isActive("/settings") ? "nav-active" : "nav-inactive"}`}
          onClick={() => navigate("/settings")}
        >
          <Settings className="nav-icon" />
          <span>{t.settings}</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNav;
