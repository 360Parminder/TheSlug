import { useEffect, useState } from 'react';
import { ALERT_TYPES, UI_CONSTANTS } from '../constants';

const Alertmessage = ({ message, type }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (type) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, UI_CONSTANTS.ALERT_DURATION);
      return () => clearTimeout(timer);
    }
  }, [type]);

  if (!isVisible || !type) {
    return null;
  }

  const getAlertStyles = () => {
    switch (type) {
      case ALERT_TYPES.SUCCESS:
        return 'bg-green-100 border border-green-400 text-green-700';
      case ALERT_TYPES.ERROR:
        return 'bg-red-100 border border-red-400 text-red-700';
      case ALERT_TYPES.INFO:
        return 'bg-blue-100 border border-blue-400 text-blue-700';
      case ALERT_TYPES.WARNING:
        return 'bg-yellow-100 border border-yellow-400 text-yellow-700';
      default:
        return 'bg-gray-100 border border-gray-400 text-gray-700';
    }
  };

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-11/12 md:w-auto">
      <div
        className={`px-4 py-3 rounded-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2 ${getAlertStyles()}`}
      >
        <p className="text-sm md:text-base">{message}</p>
      </div>
    </div>
  );
};

export default Alertmessage;
