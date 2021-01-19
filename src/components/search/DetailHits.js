import '../../assets/css/Search-Card.scss'

import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
//import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { Button } from '@material-ui/core'
import { CardMeta } from './CardMeta'
import { personField } from '../../store/statics'

function TabPanel(props) {
    const { children, value, index, ...other } = props

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    )
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    }
}

export default function SimpleTabs(props) {
    let { data, mainId } = props
    const [value, setValue] = React.useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    let t = []
    let p = []
    //let author = []

    data.forEach((d, i) => {
        let id = d._id
        let text = d._source['all:items'][0]['bibframe:datasource']
        let label = id
        if (id !== mainId) {
            label = `${id} (related item)`
        }

        t.push(<Tab key={i} label={label} {...a11yProps(i)} />)

        p.push(
            <TabPanel key={i} value={value} index={i}>
                <div className='details-meta'>
                    <CardMeta data={d} />
                    {d._source[personField] ? (
                        <React.Fragment key={i}>
                            <span className='span-title'>{personField}: </span>
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: d._source[personField]
                                }}
                            />
                        </React.Fragment>
                    ) : null}
                </div>
                <Button
                    variant='outlined'
                    color='primary'
                    className='waves-effect waves-light btn brighten'
                    href={`data:text/json;charset=utf-8,${encodeURIComponent(
                        text
                    )}`}
                    download={`${id}.txt`}
                >
                    {`Download Text`}
                </Button>
                <div
                    dangerouslySetInnerHTML={{
                        __html: text
                            .replace(/(\r\n|\n|\r)/gm, '<br>')
                            .replace(/(<br\s*\/?>){3,}/gi, '<br>')
                    }}
                />
            </TabPanel>
        )
    })

    return (
        <div>
            <AppBar position='static' elevation={0}>
                <Tabs
                    indicatorColor='primary'
                    value={value}
                    onChange={handleChange}
                    aria-label='simple tabs example'
                >
                    {t}
                </Tabs>
            </AppBar>

            {p}
        </div>
    )
}
