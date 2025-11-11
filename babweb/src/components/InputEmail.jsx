import React from 'react'

export default function InputEmail({componentname, componentid, handler}) {
    
    function inputhandler(e) {
        handler(e);
    }

    return (
        <>
            <label className='form__label' htmlFor="email">E-mail *</label>
            <input onChange={inputhandler}
                className='form__input'
                type="text" 
                name={componentname} 
                id={componentid} placeholder='email please'
            />
        </>
    )
}