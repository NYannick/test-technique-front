import React, { useEffect, useState } from 'react'
import './ListMovies.scss'
import { authAccessToken } from '../../store/actions/auth'
import { getMoviesDiscover, addItems, getList, deleteItems } from '../../store/actions/movies'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import ItemMovie from '../../components/ItemMovie/ItemMovie'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import './ListMovies.scss'
import Spinner from '../../components/Spinner/Spinner'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Close from '@material-ui/icons/Close'
import InfiniteScroll from 'react-infinite-scroller'
import { Link } from 'react-router-dom'
import imgNotAvailable from '../../images/sorry-image-not-available.jpg'
import { SimpleImg } from 'react-simple-img'
import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import classNames from 'classnames'
import axios from 'axios'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120
        },
        grid: {
            justifyContent: 'center'
        },
        card: {
            marginRight: 10,
            marginBottom: 10,
            cursor: 'pointer',
            minWidth: 135
        }
    })
)

const ListMovies = (props: any) => {
    const [isLoading, setIsLoading] = useState(false)
    const [movies, setMovies] = useState<any[]>([])
    const [moviesWatchList, setMoviesWacthList] = useState<any[]>([])
    const [sortBy, setSortBy] = useState('')
    const [page, setPage] = useState(1)
    const [hasMoreItems, setHasMoreItems] = useState(false)
    const user = JSON.parse(localStorage.getItem('user') || '')
    const classes = useStyles()

    useEffect(() => {
        setIsLoading(true)
        const requestToken = user.data.request_token
        props.dispatch(authAccessToken(requestToken))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // refacto
    useEffect(() => {
        props.dispatch(getMoviesDiscover(sortBy, 1))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortBy])

    useEffect(() => {
        if (props.movies) {
            setMovies(props.movies.results)
        }
        return () => {
            setIsLoading(false)
        }
    }, [props.movies])

    // refacto
    useEffect(() => {
        if (page === 1)
            callGetMovieDiscover()
        return () => {
            setIsLoading(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    useEffect(() => {
        props.dispatch(getList(126095))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (props.moviesList)
            setMoviesWacthList(props.moviesList.results)
    }, [props.moviesList])

    // refacto - for now i don't update store
    const callGetMovieDiscover = () => {
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=8bc50bb087dba9d92cc48b7404da984a&page=${page}&sort_by=${sortBy ? sortBy : 'popularity.desc'}`)
            .then(res => {
                setMovies([...movies, ...res.data.results])
                setHasMoreItems(res.data.results.length >= 20)
                setPage(page + 1)
            })
    }

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSortBy(event.target.value as string)
    }

    // DRY
    const addItemMovie = (idList: number, idMovie: number) => {
        const items: any[] = []
        items.push({ media_type: 'movie', media_id: idMovie })
        props.dispatch(addItems(idList, items))
        props.dispatch(getList(126095))
    }

    // DRY
    const deleteItemMovie = (idList: number, idMovie: number) => {
        const items: any[] = []
        items.push({ media_type: 'movie', media_id: idMovie })
        props.dispatch(deleteItems(idList, items))
        props.dispatch(getList(126095))
    }

    const renderMyList = () => {
        if (moviesWatchList) {
            return moviesWatchList.map((movie: any) => {
                return (
                    <Card key={movie.id} className={classNames(classes.card, 'cardList')}>
                        <Tooltip title="Delete from this list">
                            <Fab className='deleteBtn' onClick={() => deleteItemMovie(126095, movie.id)}>
                                <Close />
                            </Fab>
                        </Tooltip>
                        <Link to={`/movies/${movie.id}`} className="linkRecommendations">
                            <SimpleImg src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : imgNotAvailable} height={200} />
                        </Link>
                    </Card>
                )
            })
        }
        return isLoading ? <Spinner /> : null
    }

    const renderMovies = () => {
        return (
            <div className={classes.root}>
                <Grid container item xs={12} spacing={3} className={classes.grid}>
                    {
                        movies ? movies.map((movie: any) => <ItemMovie key={movie.id} movie={movie} addItemMovie={addItemMovie} />) : null
                    }
                </Grid>
            </div>
        )
    }

    return (
        <div className='containerMovies'>
            <div className='containerFilters'>
                <FormControl className={classes.formControl}>
                    <InputLabel id="simple-select-label">Release Date</InputLabel>
                    <Select
                        labelId="simple-select-label"
                        id="simple-select"
                        value={sortBy}
                        onChange={handleChange}
                    >
                        <MenuItem value='release_date.asc'>Asc</MenuItem>
                        <MenuItem value='release_date.desc'>Desc</MenuItem>
                    </Select>
                </FormControl>
                { sortBy && <Close className='close' fontSize='large' onClick={() => setSortBy('')} /> }
            </div>
            {
                isLoading
                    ? <Spinner />
                    : (
                        <div className='allMovies'>
                            {moviesWatchList && moviesWatchList.length > 0 ? <p className='bold'>{props.moviesList.name}</p> : null}
                            <div className='moviesList'>
                                {renderMyList()}
                            </div>
                            <InfiniteScroll
                                pageStart={0}
                                loadMore={callGetMovieDiscover}
                                hasMore={hasMoreItems}
                                loader={<Spinner key='infinite-scroll-loader' />}
                            >
                                {renderMovies()}
                            </InfiniteScroll>
                        </div>
                    )
            }
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        auth: state.auth,
        movies: state.movies,
        moviesList: state.moviesList
    }
}

export default connect(mapStateToProps)(ListMovies)
