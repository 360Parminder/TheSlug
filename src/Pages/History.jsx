import { useEffect, useState } from 'react';
import Alertmessage from '../Components/Alertmessage';
import Listloader from '../Components/Loaders/Listloader';
import List from '../Components/List';
import UserServices from '../Services/UserServices';
import { logError } from '../utils/errorHandler';

const History = ({ reload }) => {
  const [history, setHistory] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllLinks = async () => {
      setIsLoading(true);
      try {
        const response = await UserServices.fetchHistory();
        if (response?.urls) {
          setHistory(response.urls);
        } else {
          setHistory([]);
        }
      } catch (error) {
        logError(error, 'History.fetchAllLinks');
        setHistory([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllLinks();
  }, [reload]);

  return (
    <>
      <Alertmessage message={message} type={messageType} />
      <div className="w-full h-full flex justify-center">
        {isLoading ? <Listloader /> : history && history.length > 0 ? <List allLinks={history} /> : <div className="text-white text-center py-8">No URLs found</div>}
      </div>
    </>
  );
};

export default History;
