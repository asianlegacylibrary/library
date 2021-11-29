import React from 'react'
import { Link } from 'react-router-dom'

export const Navigation = () => {
    return [1, 2, 3, 4, 5].map((num) => (
        <li key={num}>
            <Link to={`hlt-${num}`}>{num}</Link>
        </li>
    ))
}
