import mixpanel from 'mixpanel-browser';

const MIXPANEL_TOKEN = import.meta.env.VITE_MIXPANEL_TOKEN || '';

mixpanel.init(MIXPANEL_TOKEN, {
  debug: import.meta.env.VITE_DEBUG === 'true',
  persistence: 'localStorage',
  track_pageview: import.meta.env.VITE_TRACK_PAGEVIEW === 'true',
  record_sessions_percent: 1 //records 1% of all sessions
});

const trackMPEvent = (eventName: string, userId: string, properties?: Record<string, any>) => {
  mixpanel.track(eventName, { userId, ...properties });
};

export { trackMPEvent }; 