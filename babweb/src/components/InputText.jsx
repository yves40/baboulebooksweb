import { useRef } from 'react'
import AppError from '@/classes/customError';

export default function InputText({componentid, label, parentHandler}) {
    
    const delayedInput = useRef(null);
    const module = "InputText";
    const feedback = useRef('feedback');
    const TIMEOUT = 1000;

    function checkEmail(email) {
        const emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const validEmail = emailregex.test(email);
        if(typeof email !== "string" ||  !validEmail) {
            throw new AppError("Entrez un email SVP");
        }
    }
    
    function checkInput(e) {
        if(delayedInput.current) clearTimeout(delayedInput.current);
        delayedInput.current = setTimeout(() => {
            try {
                feedback.current.textContent = '';
                feedback.current.hidden = true;
                parentHandler(e.target.value);
            }
            catch(error){ 
                feedback.current.textContent = error.message;
                feedback.current.hidden = false;
            }
        }, TIMEOUT);
    }

    return (
        <>
            <label className='form__label' htmlFor={componentid}>{label}</label>
            <div className='form__div'>
                <input className='form__input' onChange={checkInput}
                    type="text" 
                    name={componentid} 
                    id={componentid}
                />
            </div>
            <p ref={feedback} hidden className='mb-2 text-red-600'>Message</p>
        </>
    )
}