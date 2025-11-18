import { useRef } from 'react'
import AppError from '@/classes/customError';

export default function InputEmail({componentid, label, parentHandler}) {
    
    const delayedInput = useRef(null);
    const module = "InputEmail";
    const controlicon = useRef('controlicon');
    const emailinput = useRef('emailinput');
    const feedback = useRef('feedback');
    const TIMEOUT = 1000;

    function checkEmail(email) {
        const emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const validEmail = emailregex.test(email);
        if(typeof email !== "string" ||  !validEmail) {
            throw new AppError("Entrez un email SVP");
        }
    }

    function clearInput() {
        controlicon.current.src = "/png/cross-mark-32.png";
        feedback.current.textContent = '';  
        feedback.current.hidden = true;
        emailinput.current.value = '';
        parentHandler('');
    }
    
    function checkInput(e) {
        if(delayedInput.current) clearTimeout(delayedInput.current);
        delayedInput.current = setTimeout(() => {
            try {
                checkEmail(e.target.value);
                controlicon.current.src = "/png/check-mark-32.png";
                feedback.current.textContent = '';
                feedback.current.hidden = true;
                parentHandler(e.target.value);
            }
            catch(error){ 
                controlicon.current.src = "/png/cross-mark-32.png";
                feedback.current.textContent = error.message;
                feedback.current.hidden = false;
                console.log (`*** ${module} ${error.message}`);
            }
        }, TIMEOUT);
    }

    return (
        <>
            <label className='form__label mt-2' htmlFor={componentid}>{label} *</label>
            <div className='form__div'>
                <input className='form__input' onChange={checkInput}
                    ref={emailinput}
                    type="text" 
                    name={componentid} 
                    id={componentid} placeholder='email'
                />
                <img className="inline w-6 h-6  mx-2 mb-1" 
                    onClick={clearInput}
                    ref={controlicon} 
                    src="/png/cross-mark-32.png" 
                    alt="info email status" 
                />
            </div>
            <p ref={feedback} hidden className='mb-2 text-red-600'>Message</p>
        </>
    )
}