import React, { useEffect, useState } from 'react';
import { HashLoader } from 'react-spinners';
import './loading.css';

function Loading() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
        }, 5000)
    }, [loading]);

    return (
        <div className="loading">
            <HashLoader color="#0188FF" size={70} />
        </div>
    );
};

export default Loading;

