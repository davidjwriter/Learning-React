import '../index.css';
import useInput from '../hooks/use-input';


const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: nameInputValid,
    hasError: nameInvalid,
    valueChangeHandler: nameInputChangeHandler,
    valueBlurHandler: nameInputBlurHandler,
    reset: nameReset
    
  } = useInput(value => value.trim() !== '');

  const {
    value: enteredEmail,
    isValid: emailInputValid,
    hasError: emailInvalid,
    valueChangeHandler: emailInputChangeHandler,
    valueBlurHandler: emailInputBlurHandler,
    reset: emailReset
    
  } = useInput(value => value.includes('@') && value.includes('.'));

  let formIsValid = false;


  if (nameInputValid && emailInputValid) {
    formIsValid = true;
  } else {
    formIsValid = false;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    nameReset();
    emailReset();
  };


  const namedInputClasses = !nameInvalid ? 'form-control' : 'form-control invalid';
  const emailInputClasses = !emailInvalid ? 'form-control' : 'form-control invalid';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={namedInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {nameInvalid && <p className="error-text">Name must not be empty.</p>}
      </div>

      <div className={emailInputClasses}>
        <label htmlFor='email'>Your Email</label>
        <input
          type='email'
          id='email'
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
        {emailInvalid && <p className="error-text">Email is invalid.</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
