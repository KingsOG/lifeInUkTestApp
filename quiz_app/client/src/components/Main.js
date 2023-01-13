import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUserId } from '../redux/result_reducer'
import '../styles/Main.css'

export default function Quiz() {

    const inputRef = useRef(null)
    const dispatch = useDispatch()

    function startQuiz(){
        if(inputRef.current?.value){
            dispatch(setUserId(inputRef.current?.value))
        }
    }
    
  return (
    <div className='container'>
        <h1 className='title text-light'>Life In The UK Test</h1>

        <ol>
            <li> You will be asked 24 questions.</li>
            <li> Each question carries one mark.</li>
            <li> You will need a total of 18 question to pass this test.</li>
            <li> Your result will be provided once you finish and submit your test.</li>
            <li> Good luck and all the best.</li>
        </ol>

        <form id="form">
            <div className='input'>
            <input ref={inputRef} className="userid" type="text" placeholder='Username*'/>
            </div>
        <div className='start'>
            <Link className='btn' to={'quiz'} onClick={startQuiz}>Start Exam</Link>

        </div>
        </form>
    </div>
  )
}
