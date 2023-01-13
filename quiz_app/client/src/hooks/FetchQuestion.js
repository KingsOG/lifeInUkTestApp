import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getServerData } from "../helper/helper.js"

//redux actions
import * as Action from '../redux/question_reducer'

//FETCH QUESTION HOOK TO FETCH API DATA AND SET VALUE TO THE STORE
export const  useFetchQuestion = () => {
    const dispatch = useDispatch();
    const [ getData, setGetData] = useState({ isLoading : false, apiData: [], serverError: null});

        useEffect(() => {
            setGetData(prev => ({...prev, isLoading : true}));

            //async function to fetch backend data
            (async () => {
                try {
                    const [{ questions, answers }] = await getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`, (data) => data)
                   

                    if(questions.length > 0){
                        setGetData(prev => ({...prev, isLoading : false}));
                        setGetData(prev => ({...prev, apiData : questions}));

                        //dispatch and action
                        dispatch(Action.startExamAction({ question : questions, answers}))
                    }else{
                        throw new Error("No Question Available")
                    }
                } catch (error) {
                    setGetData(prev => ({...prev, isLoading : false}));
                    setGetData(prev => ({...prev, serverError : error}));

                    
                }

            })();

        }, [dispatch]);

        return[ getData, setGetData]
}

//moveAction Dispatch Function
export const MoveNextQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.moveNextAction()); //increase trace value by one
        
    } catch (error) {
        console.log(error)
        
    }
}
//previousAction Dispatch Function
export const MovePrevQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.movePrevAction()); //decrease trace value by one
        
    } catch (error) {
        console.log(error)
        
    }
}