import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { SimpleImg } from 'react-simple-img'
import Add from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import './ItemMovie.scss'
import { useHistory } from 'react-router-dom'
import imgNotAvailable from '../../images/sorry-image-not-available.jpg'
import moment from 'moment'
import classNames from 'classnames'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            padding: theme.spacing(1),
            display: 'flex',
            cursor: 'pointer'
        },
        grid: {
            maxWidth: 'none',
            flexBasis: 'initial'
        }
    })
)

const ItemMovies = (props: any) => {
    const classes = useStyles()
    let history = useHistory()
    return (
        <Grid item xs={4} className={classNames(classes.grid, 'grid')}>
            <Tooltip title="Add to my list">
                <Fab className='addBtn' onClick={() => props.addItemMovie(126095, props.movie.id)}>
                    <Add />
                </Fab>
            </Tooltip>
            <Paper className={classes.paper} onClick={() => history.push(`/movies/${props.movie.id}`)}>
                <div className='containerImg'>
                    <SimpleImg src={props.movie.poster_path ? `https://image.tmdb.org/t/p/w200${props.movie.poster_path}` : imgNotAvailable} height={300} />
                    <div className='onlyMobile'>
                        <p>{props.movie.title}</p>
                        <p>{moment(props.movie.release_date).format('YYYY')}</p>
                    </div>
                </div>
                <div className='containerText'>
                    <h4 className='marginTop marginBottom'>{props.movie.title}</h4>
                    <p className='marginTop colorGrey'>{moment(props.movie.release_date).format('LL')}</p>
                    <div>
                        <p className='overviewTruncate'>{props.movie.overview.length > 170 ? `${props.movie.overview.substring(0, 170)}...` : props.movie.overview}</p>
                    </div>
                </div>
            </Paper>
        </Grid>
    )
}

export default ItemMovies
