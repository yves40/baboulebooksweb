import { useRef } from 'react';
import { checkEmail } from '@/libs/controls';

export default function InputEmail({componentid, label, parentHandler, placeholder=true}) {
    
    const delayedInput = useRef(null);
    const module = "InputEmail";
    const controlicon = useRef('controlicon');
    const emailinput = useRef('emailinput');
    const feedback = useRef('feedback');
    const TIMEOUT = 800;

    let ph = false;
    if(placeholder === true) {
        ph = true;
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
                    id={componentid} 
                    placeholder={ph ? 'Email SVP' : ''} 
                />
                <a href="#" tabIndex="-1">
                    <img className="inline w-6 h-6  mx-2 mb-1" 
                        onClick={clearInput}
                        ref={controlicon} 
                        src="/png/cross-mark-32.png" 
                        alt="info email status" 
                    />
                </a>
            </div>
            <p ref={feedback} hidden className='mb-2 text-red-600'>Message</p>
        </>
    )
}