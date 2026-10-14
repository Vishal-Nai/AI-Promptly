import mixpanel from 'mixpanel-browser';

const MIXPANEL_TOKEN = import.meta.env.VITE_MIXPANEL_TOKEN || '';
const mixpanelEnabled = MIXPANEL_TOKEN.length > 0;

if (mixpanelEnabled) {
  mixpanel.init(MIXPANEL_TOKEN, {
    debug: import.meta.env.VITE_DEBUG === 'true',
    persistence: 'localStorage',
    track_pageview: import.meta.env.VITE_TRACK_PAGEVIEW === 'true',
    record_sessions_percent: 1 //records 1% of all sessions
  });
}

const trackMPEvent = (eventName: string, userId: string, properties?: Record<string, unknown>) => {
  if (!mixpanelEnabled) {
    return;
  }

  try {
    mixpanel.track(eventName, { userId, ...properties });
  } catch (error) {
    console.error('Mixpanel tracking failed', error);
  }
};

export { trackMPEvent };
