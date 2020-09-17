import React from 'react'
import { useParams } from 'react-router-dom'

export function Details() {
    let { id } = useParams()
    return (
        <div className='meow'>
            {id ? (
                <h3>
                    The <code>id</code> in the URL is &quot;{IDBIndex}
                    &quot;
                </h3>
            ) : (
                <h3>There is no id in the query string</h3>
            )}
        </div>
    )
}
