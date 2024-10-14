import { useField } from 'formik';
import React from 'react';

const MyLink = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div>
            <label htmlFor=""></label>
        </div>
    );
};

export default MyLink;
