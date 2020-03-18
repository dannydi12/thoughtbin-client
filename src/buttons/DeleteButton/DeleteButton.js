import React from 'react';
import './DeleteButton.css';

function DeleteButton(props) {
  return (
    <button aria-label='delete' className='delete-button' onClick={props.clickFunction}>
      <i aria-hidden='true'>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 512 512">
          <path d="M428.051,184.293c-15.289-32.832-36.644-64.856-63.471-95.181c-5.621-6.357-15.323-6.742-21.444-1.028l-70.585,65.879  V15.999c0-11.549-13.925-20.178-24.353-13.87C190.871,36.805,121.236,106.361,85.574,180.632  c-20.26,42.193-30.532,85.922-30.532,129.973C55.041,421.655,145.168,512,255.949,512C395.142,512,513.638,368.089,428.051,184.293z   M209.599,435.465c0-38.805,31.242-67.287,46.374-78.805c15.065,12.235,46.325,42.054,46.325,78.805  c0,25.619-20.792,46.462-46.35,46.462S209.599,461.084,209.599,435.465z M325.437,467.113  c22.934-50.397-15.016-111.307-60.883-141.554c-4.804-3.166-10.988-3.304-15.929-0.35c-47.789,28.583-85.145,91.407-62.165,141.904  c-59.705-26.742-101.419-86.83-101.419-156.507c0-109.037,71.01-203.998,157.51-268.131v146.035  c0,13.104,15.642,19.944,25.222,11.005l84.365-78.741c49.594,60.144,74.718,123.941,74.718,189.833  C426.856,380.283,385.142,440.371,325.437,467.113z" />
        </svg>
      </i>
      <span className='hidden'>Delete</span>
    </button>
  )
}

export default DeleteButton;
