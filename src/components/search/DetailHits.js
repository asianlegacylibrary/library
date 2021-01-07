import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

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
                    <Typography>{children}</Typography>
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

export default function SimpleTabs({ data, total, mainId }) {
    const [value, setValue] = React.useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    let t = []
    let p = []

    data.forEach((d, i) => {
        console.log(i, d)
        let id = d._id
        let text = d._source['all:items'][0]['bibframe:datasource']
        let label = id
        if (id !== mainId) {
            label = `${id} (related item)`
        }
        // if (total > 1) {
        //     let related = d._source['all:relatedworks'][0]
        //     let k = Object.keys(related)
        //     console.log(k)
        //     var result = k.filter((item) => {
        //         return (
        //             typeof item == 'string' && item.indexOf('translation') > -1
        //         )
        //     })
        //     console.log('result?', result[0])
        // }

        t.push(<Tab label={label} {...a11yProps(i)} />)
        p.push(
            <TabPanel value={value} index={i}>
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
            <AppBar position='static'>
                <Tabs
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
