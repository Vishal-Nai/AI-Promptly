import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { setUserId, trackGAPageView } from '../services/googleAnalytics';
import { trackMPEvent } from '../services/mixpanelService';

const Analytics: React.FC = () => {
  const location = useLocation();
  const userId = "U1234567890";

  useEffect(() => {
    setUserId(userId);

    trackMPEvent("Page Visit", userId, { page: location.pathname }); // For Mixpanel

    trackGAPageView(location.pathname + location.search); //For Google Analytics
  }, [location]);

  return null;
};

export default Analytics;
