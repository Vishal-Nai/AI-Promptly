import ReactGA from 'react-ga4';

const reportAnalyticsError = (action: string, error: unknown) => {
  console.error(`Google Analytics ${action} failed`, error);
};

export const initGA = () => {
  try {
    ReactGA.initialize('G-4DX9T8H42Y');
  } catch (error) {
    reportAnalyticsError('init', error);
  }
};

export const setUserId = (userId: string) => {
  try {
    ReactGA.set({ user_id: userId });
  } catch (error) {
    reportAnalyticsError('setUserId', error);
  }
};

export const trackGAPageView = (path: string) => {
  try {
    ReactGA.send({ hitType: "pageview", page: path });
  } catch (error) {
    reportAnalyticsError('pageview', error);
  }
};

export const trackGAEvent = (eventName: string, userId: string, properties?: Record<string, unknown>) => {
  try {
    ReactGA.event(eventName, {
      user_id: userId,
      ...properties,
    });
  } catch (error) {
    reportAnalyticsError('event', error);
  }
};