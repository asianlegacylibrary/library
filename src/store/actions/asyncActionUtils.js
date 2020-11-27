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

    const dealWithParameters = (params) => {
        return { type: 'SET_URL_PARAMS', payload: params }
    }

    const successAction = (payload) => {
        console.log('success?', payload)
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

    const asyncAction = (params) => {
        console.log('async with args are', params)
        return async (dispatch, getState) => {
            // if (['ID', 'RESULTS'].some((el) => actionType.includes(el))) {
            //     dispatch(clearAction())
            // }
            if (params) {
                dispatch(dealWithParameters(params))
            }
            dispatch(startAction())
            const response = await asyncFunc(getState().URLParams)
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
