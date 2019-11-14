import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { SimpleImg } from 'react-simple-img'
import './ItemMovie.scss'
import { useHistory } from 'react-router-dom'
import imgNotAvailable from '../../images/sorry-image-not-available.jpg'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            padding: theme.spacing(1),
            display: 'flex',
            cursor: 'pointer'
        }
    })
)

const ItemMovies = (props: any) => {
    const classes = useStyles()
    let history = useHistory()
    return (
        <Grid item xs={4}>
            <Paper className={classes.paper} onClick={() => history.push(`/movies/${props.movie.id}`)}>
                <div className='containerImg'>
                    <SimpleImg src={props.movie.poster_path ? `https://image.tmdb.org/t/p/w200${props.movie.poster_path}` : imgNotAvailable} height={300} />
                </div>
                <div className='containerText'>
                    <h4 className='marginTop'>{props.movie.title}</h4>
                    <p>{props.movie.release_date}</p>
                    <div>
                        <p className='overviewTruncate'>{props.movie.overview.length > 170 ? `${props.movie.overview.substring(0, 170)}...` : props.movie.overview}</p>
                    </div>
                </div>
            </Paper>
        </Grid>
    )
}

export default ItemMovies
