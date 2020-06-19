import React from 'react'

const ErrorNotification = ({ message }) => {
    const style = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    if (message === '') {
        return null
    }

    return (
        <div style={style}>
            {message}
        </div>
    )
}

export default ErrorNotification