import React from 'react';
import useTheme from 'misc/hooks/useTheme';
import SvgIcon from '../SvgIcon';

const Edit = ({
    color = 'default', // default | header | error | success | warning | info | <string>
    size = 32,
}) => {
    const { theme } = useTheme();
    const actualColor = theme.icon.color[color] || color;
    return (
        <SvgIcon
            style={{
                height: `${size}px`,
                width: `${size}px`,
            }}
            viewBox="0 0 24 24"
        >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z" fill={actualColor} />
        </SvgIcon>
    );
}

export default Edit;