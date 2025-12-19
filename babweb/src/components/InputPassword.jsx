import { useRef, useEffect } from 'react'
import {checkPassword} from '@/libs/controls';
import Logger from '@/classes/logger';

export default function InputPassword({componentid, label, parentHandler, 
    placeholder=true, timeout=800}) {
    
    const delayedInput = useRef(null);
    const module = "InputPassword";
    const controlicon = useRef('controlicon');
    const passwordinput = useRef('passwordinput');
    const feedback = useRef('feedback');
    const logger = new Logger();

    let ph = false;
    if(placeholder === true) {
        ph = true;
    }

    useEffect( () => {
        controlicon.current.hidden = true;
    }, [] );

    
    function clearInput() {
        controlicon.current.hidden = true;
        feedback.current.textContent = '';  
        feedback.current.hidden = true;
        passwordinput.current.value = '';
        parentHandler('');
    }

    function checkInput(e) {
        if(e.target.value === '') {
            controlicon.current.hidden = true;
            return;
        }
        if(delayedInput.current) clearTimeout(delayedInput.current);
        delayedInput.current = setTimeout(() => {
            controlicon.current.hidden = false;
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
                logger.error(`*** ${module} ${error.message}`);
            }
        }, timeout);
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