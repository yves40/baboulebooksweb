import { useRef } from 'react'
import {checkPassword} from '@/libs/controls';

export default function InputPassword({componentid, label, parentHandler, placeholder=true}) {
    
    const delayedInput = useRef(null);
    const module = "InputPassword";
    const controlicon = useRef('controlicon');
    const passwordinput = useRef('passwordinput');

    const feedback = useRef('feedback');
    const TIMEOUT = 1000;
    
    let ph = false;
    if(placeholder === true) {
        ph = true;
    }
    
    function clearInput() {
        controlicon.current.src = "/png/cross-mark-32.png";
        feedback.current.textContent = '';  
        feedback.current.hidden = true;
        passwordinput.current.value = '';
        parentHandler('');
    }

    function checkInput(e) {
        if(delayedInput.current) clearTimeout(delayedInput.current);
        delayedInput.current = setTimeout(() => {
            try {
                checkPassword(e.target.value);
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
            <label className='form__label' htmlFor={componentid} >{label} *</label>
            <div className='form__div'>
                <input className='form__input' onChange={checkInput}
                    type="password" 
                    ref={passwordinput}
                    name={componentid} 
                    id={componentid} 
                    placeholder={ph ? 'Au moins 8 caractères, 1 chiffre, 1 majuscule' : ''}
                />
                <a href="#" tabIndex="-1">
                    <img ref={controlicon} 
                        onClick={clearInput}                    
                        src="/png/cross-mark-32.png" 
                        alt="info email status" 
                        className="inline w-6 h-6  mx-2 mb-1"/>
                </a>
            </div>
            <p ref={feedback} hidden className='mb-2 text-red-600'>Message</p>
        </>
    )
}