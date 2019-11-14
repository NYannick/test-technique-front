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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120
        }
    })
)

const ListMovies = (props: any) => {
    const [isLoading, setIsLoading] = useState(false)
    const [movies, setMovies] = useState<any[]>([])
    const [params, setParams] = useState('')
    const user = JSON.parse(localStorage.getItem('user') || '')
    const classes = useStyles()

    useEffect(() => {
        setIsLoading(true)
        const requestToken = user.data.request_token
        props.dispatch(authAccessToken(requestToken))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setIsLoading(true)
        props.dispatch(getMoviesDiscover(params))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params])

    useEffect(() => {
        if (props.movies) {
            setMovies(props.movies.results)
        }
        return () => {
            setIsLoading(false)
        }
    }, [props.movies])

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setParams(event.target.value as string)
    }

    const renderMovies = () => {
        return (
            <div className={classes.root}>
                <Grid container item xs={12} spacing={3}>
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
                        value={params}
                        onChange={handleChange}
                    >
                        <MenuItem value='release_date.asc'>Asc</MenuItem>
                        <MenuItem value='release_date.desc'>Desc</MenuItem>
                    </Select>
                </FormControl>
                { params && <Close className='close' fontSize='large' onClick={() => setParams('')} /> }
            </div>
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
