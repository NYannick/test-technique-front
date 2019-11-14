import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovieDetails, getMoviesRecommendations } from '../../store/actions/movies'
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
import imgNotAvailable from '../../images/sorry-image-not-available.jpg'

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
        },
        card: {
            marginRight: 10,
            marginBottom: 10,
            cursor: 'pointer',
            minWidth: 135
        }
    })
)

const MovieById = (props: any) => {
    let { id } = useParams()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [movie, setMovie] = useState<any>([])
    const [moviesRecommendations, setMoviesRecommendations] = useState<any>([])
    const classes = useStyles()

    useEffect(() => {
        setIsLoading(true)
        props.dispatch(getMovieDetails(Number(id)))
        props.dispatch(getMoviesRecommendations(Number(id)))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    useEffect(() => {
        if (props.movieById)
            setMovie(props.movieById)
        if (props.moviesRecommendations)
            setMoviesRecommendations(props.moviesRecommendations)
        return () => {
            setIsLoading(false)
        }
    }, [props.movieById, props.moviesRecommendations])

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
                        <div className='movieAndRecommendation'>
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
                                        <SimpleImg src={movie.poster_path ? `https://image.tmdb.org/t/p/w400${movie.poster_path}` : imgNotAvailable} height={400} />
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
                            <div className='containerRecommendations'>
                                {
                                    moviesRecommendations.results && moviesRecommendations.results.map((recommendation: any) => {
                                        return (
                                            <Tooltip title={recommendation.title ? recommendation.title : ''} key={recommendation.id}>
                                                <Card className={classes.card}>
                                                    <Link to={`/movies/${recommendation.id}`} className="linkRecommendations">
                                                        <SimpleImg src={recommendation.poster_path ? `https://image.tmdb.org/t/p/w200${recommendation.poster_path}` : imgNotAvailable} height={200} />
                                                    </Link>
                                                </Card>
                                            </Tooltip>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    movieById: state.movieById,
    moviesRecommendations: state.moviesRecommendations
})

export default connect(mapStateToProps)(MovieById)
