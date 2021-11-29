import { status } from '../types'

export const getAsyncAction = ({ actionType, asyncFunc }) => {
    const actionTypeRequest = `${status.REQUEST}_${actionType}`
    const actionTypeReceive = `${status.RECEIVE}_${actionType}`
    //const actionTypeClear = `${status.CLEAR}_${actionType}`
    const actionTypeError = `${status.ERROR}_${actionType}`
    //const actionTypeResources = `RECEIVE_ASSOCIATED_RECORDS`

    const startAction = () => {
        return {
            type: actionTypeRequest
        }
    }

    // const clearAction = () => {
    //     return {
    //         type: actionTypeClear
    //     }
    // }

    const dealWithParameters = (params, paramAction) => {
        if (paramAction === 'initialize') {
            return { type: 'SET_URL_PARAMS', payload: params }
        } else {
            return { type: 'RESET_URL_PARAMS', payload: params }
        }
    }

    const successAction = (payload) => {
        //console.log('success?', payload)
        return {
            type: actionTypeReceive,
            payload: payload
        }
    }

    const failureAction = (error) => {
        console.log('failure? rejoice!')
        return {
            type: actionTypeError,
            payload: error
        }
    }

    const asyncAction = (params, paramAction) => {
        //console.log(paramAction, params)
        return async (dispatch, getState) => {
            // if (['ID', 'RESULTS'].some((el) => actionType.includes(el))) {
            //     dispatch(clearAction())
            // }
            let response

            dispatch(startAction())

            if (actionType === 'RESULTS') {
                dispatch(dealWithParameters(params, paramAction))
                response = await asyncFunc(getState().URLParams)
            } else if (actionType === 'DETAILS') {
                console.log('async action', params)
                response = await asyncFunc(params)
            }

            //console.log(response.status, response.data)
            if (response.status === 200) {
                dispatch(successAction(response))
            } else {
                dispatch(failureAction(response))
            }
        }
    }
    return asyncAction
}
