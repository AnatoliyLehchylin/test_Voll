import './style/style.scss'
import {useState} from "react";
import id from '../../assets/user-id-icon.png';
import password from '../../assets/password.png';
import name from '../../assets/name.png';
import email from '../../assets/email.png';
import phone from '../../assets/phone.png';
import nm from '../../assets/NM.png';
import arrow from '../../assets/arrow.png';
import error from '../../assets/error.png';
import engFlag from '../../assets/eng.png';
import ukrFlag from '../../assets/ua.png';
import eye from '../../assets/icon-eye.png';
import hide from '../../assets/icon-hide.png';

import Data from "../../../src/assets/Data.json";

function CreateAccount() {

    const initialStateAccount = {
        id: '',
        password: '',
        name: '',
        email: '',
        code: ''
    }

    const [accountInfo, setAccountInfo] = useState(initialStateAccount);
    const [isCheckbox, setIsCheckbox] = useState([false, false, false]);
    const [isSubmit, setIsSubmit] = useState(false);
    const [languages, setLanguages] = useState('eng');
    const [isError, setIsError] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const dataText = Data[languages];

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setAccountInfo((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const toggleCheckbox = (index) => {
        setIsCheckbox((prevState) => {
            const newCheckboxState = [...prevState];
            newCheckboxState[index] = !newCheckboxState[index];
            return newCheckboxState;
        });
    };

    const toggleLanguages = () => {
        setLanguages((prev) => (prev === 'eng' ? 'ukr' : 'eng'))
    };


    const toggleVisiblePassword = () => {
        setIsPasswordVisible((prevState) => !prevState);
    };

    const validateForm = () => {

        for (const key in accountInfo) {
            if (accountInfo[key].length <= 0) {
                return false
            }
        }

        if (accountInfo.password.length < 8) {
            return false
        }

        if (!isCheckbox[0] || !isCheckbox[1]) {
            return false
        }

        return true;
    }

    const handleCreateAccount = (event) => {
        event.preventDefault();
        setIsSubmit(true);

        if (!validateForm()) {
            setIsError(true);
        } else {
            console.log(accountInfo);
            setIsError(false);

            setTimeout(() => {
                setIsSubmit(false);
                setAccountInfo(initialStateAccount);
                setIsCheckbox([false, false, false]);
            }, 8000);
        }
    }

    return (
        <>
            <div className='main-container'>
                <div className='banner-wrap'>
                    <img src={nm} className='nm' alt='NM'/>
                    <p className='banner-text'>Nick Mine Inc.</p>
                </div>

                <div className='form-wrap'>

                    <img src={languages === 'eng' ? ukrFlag : engFlag} className='flag' onClick={toggleLanguages}
                         alt='en'/>

                    <form className='form-content' autoComplete="off" onSubmit={handleCreateAccount}>
                        <div className='title'>{dataText.title}<span style={{color: "#E80004"}}>.</span></div>
                        <div className='text-wrap'>
                            <p className='text'>{dataText.textTitle}</p>
                            <a className='sign-in'>{dataText.signIn}</a>
                        </div>

                        <div className='input-container'>
                            <input name='id' type='text' className='input' autoFocus={true} autoComplete="off" value={accountInfo.id}
                                   onChange={handleInputChange}/>
                            <div className='input-label'>{dataText.userID}</div>
                            <img src={id} className='input-icon' alt='user-id'/>
                            {isSubmit && accountInfo.id.length < 1 && (
                                <img src={error} className='error-icon' alt='error-icon'/>
                            )}
                        </div>

                        <div className='input-container'>
                            <input name='password' type={isPasswordVisible ? 'text' : 'password'} className='input'
                                   autoComplete="off" value={accountInfo.password} onChange={handleInputChange}/>
                            <div className='input-label'>{dataText.password}</div>
                            <img src={isPasswordVisible ? eye : hide} onClick={toggleVisiblePassword} className='eye'
                                 alt='eye'/>
                            <img src={password} className='input-icon' alt='password'/>
                            {isSubmit && accountInfo.password.length < 8 && (
                                <img src={error} className='error-icon' alt='error-icon'/>
                            )}
                        </div>
                        <div className='description'>
                            <div className='point'>.</div>
                            <div>{dataText.passwordDescription}</div>
                        </div>

                        <div className='input-container'>
                            <input name='name' type='text' className='input' autoComplete="off" value={accountInfo.name}
                                   onChange={handleInputChange}/>
                            <div className='input-label'>{dataText.name}</div>
                            <img src={name} className='input-icon' alt='name'/>
                            {isSubmit && accountInfo.name.length < 1 && (
                                <img src={error} className='error-icon' alt='error-icon'/>
                            )}
                        </div>
                        <div className='description'>
                            <div className='point'>.</div>
                            <div>{dataText.nameDescription}</div>
                        </div>

                        <div className='input-container'>
                            <input name='email' type='email' className='input' style={{width: '65%'}}
                                   autoComplete="off" value={accountInfo.email}
                                   onChange={handleInputChange}/>
                            <div className='input-label'>{dataText.email}</div>
                            <div className='resend'>{dataText.resend}</div>
                            <img src={email} className='input-icon' alt='email'/>
                            {isSubmit && accountInfo.email.length < 1 && (
                                <img src={error} className='error-icon' alt='error-icon'/>
                            )}
                        </div>

                        <div className='input-container input-container-code'>
                            <input name='code' type='text' className='input' autoComplete="off" value={accountInfo.code}
                                   onChange={handleInputChange}/>
                            <div className='input-label'>{dataText.code}</div>
                            <img src={email} className='input-icon' alt='code'/>
                            {isSubmit && accountInfo.code.length < 1 && (
                                <img src={error} className='error-icon' alt='error-icon'/>
                            )}
                        </div>

                        <div className='checkbox-wrap'>
                            <div className='checkbox'>
                                <div className='box' onClick={() => toggleCheckbox(0)}>
                                    {isCheckbox[0] && <img className='arrow' src={arrow} alt='arrow'/>}
                                </div>
                                <div>{dataText.checkboxFirst1}<a href='#'
                                                                 className='checkbox-link'>{dataText.terms}</a>{dataText.checkboxFirst2}
                                </div>
                                {isSubmit && !isCheckbox[0] && (
                                    <img src={error} className='error-icon error-icon-checkbox' alt='error-icon'/>
                                )}
                            </div>

                            <div className='checkbox'>
                                <div className='box' onClick={() => toggleCheckbox(1)}>
                                    {isCheckbox[1] && <img src={arrow} className='arrow' alt='arrow'/>}
                                </div>
                                <div>{dataText.checkboxSecond1}<a href='#'
                                                                  className='checkbox-link'>{dataText.privacy}</a>{dataText.checkboxSecond2}
                                </div>
                                {isSubmit && !isCheckbox[1] && (
                                    <img src={error} className='error-icon error-icon-checkbox' alt='error-icon'/>
                                )}
                            </div>

                            <div className='checkbox'>
                                <div className='box' onClick={() => toggleCheckbox(2)}>
                                    {isCheckbox[2] && <img src={arrow} className='arrow' alt='arrow'/>}
                                </div>
                                <div>{dataText.checkboxThird}</div>
                            </div>
                        </div>

                        <button className='submit-button' type='submit'>{dataText.create}</button>

                        {isSubmit && (
                            <div className='error-message'>
                                {isError ? (
                                    <div>{dataText.error}</div>
                                ) : (
                                    <div style={{color: '#228c1f'}}>{dataText.success}</div>
                                )}
                            </div>
                        )}

                        <div className='bottom-text'>
                            <div className='promokod'>
                                <img src={phone} className='phone-icon' alt='phone'/>
                                <a>{dataText.promo}</a>
                            </div>
                            <a>{dataText.support}</a>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateAccount