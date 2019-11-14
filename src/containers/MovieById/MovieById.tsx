import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovieDetails } from '../../store/actions/movies'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { SimpleImg } from 'react-simple-img'
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card'
import Spinner from '../../components/Spinner/Spinner'
import Tooltip from '@material-ui/core/Tooltip'
import Paper from '@material-ui/core/Paper'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import './MovieById.scss'
import ArrowBack from '@material-ui/icons/ArrowBack'

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: 'flex'
        },
        paper: {
            padding: 10,
            marginRight: 10
        },
        button: {
            marginBottom: 20,
            alignSelf: 'flex-start'
        }
    })
)

const MovieById = (props: any) => {
    let { id } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [movie, setMovie] = useState<any>([])
    const classes = useStyles()

    useEffect(() => {
        setIsLoading(true)
        props.dispatch(getMovieDetails(Number(id)))
    }, [])

    useEffect(() => {
        if (props.movieById)
            setMovie(props.movieById)
        return () => {
            setIsLoading(false)
        }
    }, [props.movieById])

    const showGenres = () => {
        if (movie.genres)
            return movie.genres.map((genre: any) => <Paper className={classes.paper}>{genre.name}</Paper>)
        return null
    }

    return (
        <div className='containerMovie'>
            <Link to="/movies" className="linkBack">
                <Button
                    variant="contained"
                    className={classes.button}
                    startIcon={<ArrowBack />}
                >
                    Back
                </Button>
            </Link>
            {
                isLoading
                    ? <Spinner />
                    : (
                        <Card className={classes.root}>
                            <Tooltip title={movie.homepage ? 'Visit Homepage' : ''}>
                                <div
                                    className='containerImgMovie'
                                    onClick={e => {
                                        e.preventDefault()
                                        if (movie.homepage)
                                            window.location.assign(movie.homepage)
                                    }}
                                >
                                    <SimpleImg src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`} height={400} />
                                </div>
                            </Tooltip>
                            <div className='containerTextMovie'>
                                <h2>{`${movie.title} (${movie.release_date})`}</h2>
                                <p>{movie.overview}</p>
                                <div className='containerGenres'>
                                    <p>Genres:</p>
                                    {movie.genres && movie.genres.map((genre: any) => <Paper key={genre.id} className={classes.paper}>{genre.name}</Paper>)}
                                </div>
                            </div>
                        </Card>
                    )
            }
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    movieById: state.movieById
})

export default connect(mapStateToProps)(MovieById)
