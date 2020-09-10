const asyncActionAlt = (args) => {
    return async (dispatch) => {
        if (['ID', 'RESULTS'].some((el) => actionType.includes(el))) {
            dispatch(clearAction())
        }
        dispatch(startAction())

        try {
            const { data } = await asyncFunc(args)
            console.log('async utils try', data)
            dispatch(successAction(data))
        } catch (error) {
            dispatch(failureAction(error))
        }
    }
}

return asyncAction
}