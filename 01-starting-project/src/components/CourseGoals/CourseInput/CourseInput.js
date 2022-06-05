import React, { useState } from 'react';
import styled from 'styled-components';
import styles from './CourseInput.module.css';
import buttonStyles from '../../UI/Button/Button.module.css';
import Button from '../../UI/Button/Button';

// const FormControl = styled.div`

// margin: 0.5rem 0;

// & label {
//   font-weight: bold;
//   display: block;
//   margin-bottom: 0.5rem;
//   color: ${props => (props.invalid ? 'red' : 'black')}
// }

// & input {
//   display: block;
//   width: 100%;
//   border: 1px solid ${props => (props.invalid ? 'red' : '#ccc')};
//   background-color: ${props => (props.invalid ? 'rgb(241, 126, 126)' : 'transparent')};
//   font: inherit;
//   line-height: 1.5rem;
//   padding: 0 0.25rem;
// }

// & input:focus {
//   outline: none;
//   background: #fad0ec;
//   border-color: #8b005d;
// }


// `;


const CourseInput = props => {
  const [enteredValue, setEnteredValue] = useState('');
  const [file, setFile] = useState('');
  const [isValid, setIsValid] = useState(true);

  const goalInputChangeHandler = event => {
    if (event.target.value.trim().length > 0) {
      setIsValid(true);
    }
    setEnteredValue(event.target.value);
  };

  const fileInputChangeHandler = (event) => {
    setFile(event.target.value);
  }

  const formSubmitHandler = event => {
    event.preventDefault();
    if (enteredValue.trim().length === 0) {
      setIsValid(false);
      return;
    }
    props.onAddGoal({
      search: enteredValue,
      fileInput: file
    });
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={`${styles['form-control']} ${!isValid && styles.invalid}`}>
        <label className={styles['text-glow']}>Search for string</label>
        <input type="text" onChange={goalInputChangeHandler} />
      </div>
      <div className={styles["upload-btn-wrapper"]}>
        <Button>Upload a file</Button>
        <input type="file" onChange={fileInputChangeHandler}/>
      </div>
      <Button type="submit">Search</Button>
    </form>
  );
};

export default CourseInput;
