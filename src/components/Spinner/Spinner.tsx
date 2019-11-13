import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { createStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme =>
    createStyles({
        progress: {
            margin: theme.spacing(2)
        }
    })
)

const Spinner = (props: any) => {
    const classes = useStyles()
    return <CircularProgress className={classes.progress} />
}

export default Spinner
