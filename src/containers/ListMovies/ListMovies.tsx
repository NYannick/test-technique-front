import React, { useEffect, useState } from 'react'
import './ListMovies.scss'
import { authAccessToken } from '../../store/actions/auth'
import { getMoviesDiscover } from '../../store/actions/movies'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
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
        }
    })
)

const ListMovies = (props: any) => {
    const [isLoading, setIsLoading] = useState(false)
    const [movies, setMovies] = useState<any[]>([])
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

    const renderMovies = () => {
        return (
            <div className={classes.root}>
                <Grid container item xs={12} spacing={3} className={classes.grid}>
                    {
                        movies ? movies.map((movie: any) => <ItemMovie key={movie.id} movie={movie} />) : null
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
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={callGetMovieDiscover}
                            hasMore={hasMoreItems}
                            loader={<Spinner key='infinite-scroll-loader' />}
                        >
                            {renderMovies()}
                        </InfiniteScroll>
                    )
            }
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
