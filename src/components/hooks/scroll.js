import { useEffect } from 'react'
import { withRouter } from 'react-router-dom'

const ScrollHandler = (cssClass) => {
    useEffect(() => {
        const element = document.getElementsByClassName(cssClass)

        setTimeout(() => {
            window.scrollTo({
                behavior: element ? 'smooth' : 'auto',
                top: element ? element.offsetTop : 0,
            })
        }, 100)
    }, [cssClass])

    return null
}

export default withRouter(ScrollHandler)
