import ReactGA from 'react-ga4';

export const initGA = () => {
  ReactGA.initialize('G-4DX9T8H42Y', {
    ...((import.meta.env.VITE_NODE_ENV === 'development' ? { debug: true } : {}) as any)
  });
};

export const setUserId = (userId: string) => {
  ReactGA.set({ user_id: userId });
};

export const trackGAPageView = (path: string) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

export const trackGAEvent = (eventName: string, userId: string, properties?: Record<string, any>) => {
  ReactGA.event(eventName, {
    user_id: userId,
    ...properties,
  });
};