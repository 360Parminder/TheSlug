import { useEffect, useState } from 'react';

const Alertmessage = ({ message, type }) => {
    console.log(type);

    let style = {};
    let mainbody = {};

    if (type === 'success') {
        style = {
            backgroundColor: '#a8c59688',
            border: '1px solid #76c893',
        };
        mainbody = {
            display: "flex",
        }
    } else if (type === 'error') {
        style = {
            backgroundColor: '#c5a49688',
            border: '1px solid #800e13',
            color: '#800e13',
        };
        mainbody = {
            display: "flex",
        }
    } else if (type === "info") {
        style = {
            backgroundColor: '#96bcc588',
            border: '1px solid #0582ca',
            color: '#0582ca',
        };
        mainbody = {
            display: "flex",
        }
    } else if (type === "warning") {
        style = {
            backgroundColor: '#c5b79688',
            border: '1px solid #d68c45',
            color: '#d68c45',
        };
        mainbody = {
            display: "flex",
        }
    } else {
        mainbody = {
            display: "none",
        }
    }

    setTimeout(() => {
        type = null;
    }, 2500);

    return (
        <div className='absolute w-full top-5 justify-center hidden' style={mainbody}>
            <div className='z-10 gap-2 px-4 py-2 rounded-lg items-center' style={style}>
                <p>{message}</p>
            </div>
        </div>
    )
};

export default Alertmessage;