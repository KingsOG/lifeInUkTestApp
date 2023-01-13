import React, { useEffect } from 'react'
import '../styles/Result.css'
import { Link } from 'react-router-dom'
import ResultTable from './ResultTable'
import { useDispatch, useSelector } from 'react-redux'



//import actions
import { resetAllAction } from '../redux/question_reducer'
import { resetResultAction } from '../redux/result_reducer'
import { attempts_Number, earnPoints_Number, flagResult } from '../helper/helper'
import { usePublishedResult } from '../hooks/setResult'

export default function Result() {

  const dispatch = useDispatch()
  const { questions : {queue, answers }, result : {result, userId} } = useSelector(state => state)

  const totalPoints = queue.length * 1;
  const attempts = attempts_Number(result)
  const earnPoints = earnPoints_Number(result, answers, 1)
  const flag = flagResult(totalPoints, earnPoints)

  //Store the User Result
  usePublishedResult({ 
    result, 
    username : userId, 
    attempts, 
    points: earnPoints, 
    achieved : flag ? "Passed" : "Failed" });

  function onRestart(){
    dispatch(resetAllAction())
    dispatch(resetResultAction())
  }

  return (
    <div className='container'>
      <h1 className='title text-light'>Life In The UK Test Result</h1>

      <div className='result flex-center'>
        <div className='flex'>
          <span>Username</span>
          <span className='bold'>{userId}</span>
        </div>
        <div className='flex'>
          <span>Total Quiz Points : </span>
          <span className='bold'>{ totalPoints || 0}</span>
        </div>
        <div className='flex'>
          <span>Total Questions : </span>
          <span className='bold'>{queue.length || 0}</span>
        </div>
        <div className='flex'>
          <span>All Attempted questions : </span>
          <span className='bold'>{attempts || 0}</span>
        </div>
        <div className='flex'>
          <span>Correct Answers : </span>
          <span className='bold'>{earnPoints || 0}</span>
        </div>
        <div className='flex'>
          <span>Your Result : </span>
          <span style={{ color : `${flag ? "#2aff95" : "#ff2a66"}` }}className='bold'>{flag ? "Passed" : "Failed"}</span>
        </div>
      </div>

      <div className='start'>
        <Link className='btn' to={'/'} onClick={onRestart}>Restart</Link>
      </div>

      <div className='container'>

        {/* Result table */}
        <ResultTable></ResultTable>
      </div>

    </div>
  )
}
