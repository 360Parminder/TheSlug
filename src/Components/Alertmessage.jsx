import { IonIcon } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';

const Alertmessage = ({ message, type }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    let style = {};

    if (type === 'success') {
        style = {
            backgroundColor: '#a8c59688',
            border: '1px solid #76c893',
        };
    } else if (type === 'error') {
        style = {
            backgroundColor: '#c5a49688',
            border: '1px solid #800e13',
            color: '#800e13',
        };
    } else if (type === "info") {
        style = {
            backgroundColor: '#96bcc588',
            border: '1px solid #0582ca',
            color: '#0582ca',
        };
    } else if (type === "warning") {
        style = {
            backgroundColor: '#c5b79688',
            border: '1px solid #d68c45',
            color: '#d68c45',
        };
    }

    return visible && (
        <div className='absolute w-full top-5 flex justify-center'>
            <div className='z-10 gap-2 px-4 py-2 rounded-lg items-center' style={style}>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default Alertmessage;
