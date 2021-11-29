import React from 'react'
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

function buildPanel(idx, item, id, text, tabValue) {}

export default function Panel({ idx, item, id, text }) {
    const [value, setValue] = React.useState(0)
    const [count, setCount] = React.useState(0)

    const handleChange = (_, newValue) => {
        setValue(newValue)
    }

    return (
        <TabPanel key={idx} value={value} index={idx}>
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
