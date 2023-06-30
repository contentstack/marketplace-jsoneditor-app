import { useAppSdk } from './useAppSdk';

const useAnalytics = () => {
  const [appSdk] = useAppSdk();

  const trackEvent = (event: string, eventData: any = {}) => appSdk?.pulse(event, eventData);
  return { trackEvent };
};

export default useAnalytics;