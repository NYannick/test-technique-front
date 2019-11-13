import React, { useEffect, useState } from 'react'
import './ListMovies.scss'
import { authAccessToken } from '../../store/actions/auth'
import { getMovieDiscover } from '../../store/actions/movies'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import ItemMovies from '../../components/ItemMovies/ItemMovies'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import './ListMovies.scss'
import Spinner from '../../components/Spinner/Spinner'

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            flexGrow: 1
        }
    })
)

const ListMovies = (props: any) => {
    const [isLoading, setIsLoading] = useState(false)
    const [movies, setMovies] = useState<any[]>([])
    const user = JSON.parse(localStorage.getItem('user') || '')
    const classes = useStyles()

    useEffect(() => {
        setIsLoading(true)
        const requestToken = user.data.request_token
        props.dispatch(authAccessToken(requestToken))
    }, [])

    useEffect(() => {
        setIsLoading(true)
        props.dispatch(getMovieDiscover())
    }, [])

    useEffect(() => {
        if (props.movies) {
            setMovies(props.movies.results)
        }
        return () => {
            setIsLoading(false)
        }
    }, [props.movies])

    const renderMovies = () => {
        console.log(isLoading)
        return (
            <div className={classes.root}>
                <Grid container item xs={12} spacing={3}>
                    {
                        movies ? movies.map((movie: any) => <ItemMovies key={movie.id} movie={movie} />) : null
                    }
                </Grid>
            </div>
        )
    }

    return (
        <div className='containerMovies'>
            { isLoading ? <Spinner /> : renderMovies() }
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        auth: state.auth,
        movies: state.movies
    }
}

export default connect(mapStateToProps)(ListMovies)
