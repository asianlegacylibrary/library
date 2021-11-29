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
            role="tabpanel"
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
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

function buildText(t) {
    let count = 0
    let text = t
        .replace(/(\r\n|\n|\r)/gm, '<br>')
        .replace(/(<br\s*\/?>){3,}/gi, '<br>')
        .replace(/(<em)/g, function () {
            console.log('count inside', count)
            return `<em ref='hlt-${++count}'`
        })
    return [count, text]
}

function Panel(props) {
    let { idx, item, id, text, tabValue, max_count } = props

    const [count, setCount] = React.useState(0)

    const handleIncrement = (newCount) => {
        setCount(newCount)
    }

    console.log(max_count, count)
    return (
        <TabPanel key={idx} value={tabValue} index={idx}>
            <div className="details-meta">
                <CardMeta data={item} />
                {item._source[personField] ? (
                    <React.Fragment key={idx}>
                        <span className="span-title">{personField}: </span>
                        <span
                            dangerouslySetInnerHTML={{
                                __html: item._source[personField],
                            }}
                        />
                    </React.Fragment>
                ) : null}
            </div>
            {/* 
            <Button onClick={() => handleIncrement(count + 1)}>GO</Button> */}

            <Button
                variant="outlined"
                color="primary"
                className="waves-effect waves-light btn brighten"
                href={`data:text/json;charset=utf-8,${encodeURIComponent(
                    text
                )}`}
                download={`${id}.txt`}
            >
                {`Download Text`}
            </Button>

            <div
                dangerouslySetInnerHTML={{
                    __html: text,
                }}
            />
        </TabPanel>
    )
}

export default function SimpleTabs(props) {
    let { data, mainId } = props
    const [value, setValue] = React.useState(0)

    const handleChange = (_, newValue) => {
        console.log(_)
        setValue(newValue)
    }

    let tabs = []
    let tabData = []
    //let author = []

    data.forEach((d, i) => {
        let id = d._id
        let max_count = 0
        let [c, text] = buildText(d._source['all:items']['bibframe:datasource'])
        max_count = max_count >= c ? max_count : c

        let label = id
        if (id !== mainId) {
            label = `${id} (related item)`
        }

        tabs.push(<Tab key={i} label={label} {...a11yProps(i)} />)

        tabData.push(
            <Panel
                key={i}
                idx={i}
                item={d}
                id={id}
                text={text}
                tabValue={value}
                max_count={max_count}
            />
        )
    })

    return (
        <div>
            <AppBar position="static" elevation={0}>
                <Tabs
                    indicatorColor="primary"
                    value={value}
                    onChange={handleChange}
                    aria-label="simple tabs example"
                >
                    {tabs}
                </Tabs>
            </AppBar>
            {tabData}
        </div>
    )
}
