import { useRef } from 'react'
import AppError from '@/classes/customError';

export default function InputEmail({componentname, componentid, parentHandler}) {
    
    const delayedInput = useRef(null);
    const module = "InputEmail";
    const controlicon = useRef('controlicon');
    const TIMEOUT = 500;

    function checkEmail(email) {
        const emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const validEmail = emailregex.test(email);
        if(typeof email !== "string" ||  !validEmail) {
            throw new AppError("Invalid email");
        }
    }
    
    function checkInput(e) {
        if(delayedInput.current) clearTimeout(delayedInput.current);
        delayedInput.current = setTimeout(() => {
            try {
                checkEmail(e.target.value);
                controlicon.current.className = "svgsmall-green";
                parentHandler(e.target.value);
            }
            catch(error){ 
                controlicon.current.className = "svgsmall-red";
                console.log (`*** ${module} ${error.message}`);
            }
        }, TIMEOUT);
    }

    return (
        <>
            <label className='form__label' htmlFor="email">E-mail *</label>
            <div className='form__input'>
                <input onChange={checkInput}
                    type="text" 
                    name={componentname} 
                    id={componentid} placeholder='email please'
                />
                <img ref={controlicon} src="/svg/thumbs-up-regular.svg" alt="info email status" 
                    className="svgsmall-red inline w-6 h-6 mr-1 mb-1"/>
            </div>
        </>
    )
}