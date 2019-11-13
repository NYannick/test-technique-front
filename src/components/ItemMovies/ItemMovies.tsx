import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { SimpleImg } from 'react-simple-img'
import './ItemMovies.scss'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            padding: theme.spacing(1),
            color: theme.palette.text.secondary,
            display: 'flex'
        }
    })
)

const ItemMovies = (props: any) => {
    const classes = useStyles()
    return (
        <Grid item xs={4}>
            <Paper className={classes.paper}>
                <div className='containerImg'>
                    <SimpleImg src={`https://image.tmdb.org/t/p/w200/${props.movie.poster_path}`} height={300} />
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
