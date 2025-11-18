import { useRef } from 'react'
import AppError from '@/classes/customError';

export default function InputPassword({componentid, label, parentHandler}) {
    
    const delayedInput = useRef(null);
    const module = "InputPassword";
    const controlicon = useRef('controlicon');
    const passwordinput = useRef('passwordinput');

    const feedback = useRef('feedback');
    const TIMEOUT = 500;
    
    function containsUppercase(str) {
      return /[A-Z]/.test(str);
    }

    // Some rules for password validation
    function checkPassword(password) {
        if(typeof password !== "string" || password.length < 8) {
            throw new AppError("Minimum 8 caractères et une majuscule");
        }
        if(!containsUppercase(password)) {
            throw new AppError("Minimum 8 caractères et une majuscule");
        }
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
                    id={componentid} placeholder='Votre mot de passe'
                />
                <img ref={controlicon} 
                    onClick={clearInput}                    
                    src="/png/cross-mark-32.png" 
                    alt="info email status" 
                    className="inline w-6 h-6  mx-2 mb-1"/>
            </div>
            <p ref={feedback} hidden className='mb-2 text-red-600'>Message</p>
        </>
    )
}