import React, { useEffect, useState } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { authRequestToken } from './store/actions/auth'
import Spinner from './components/Spinner/Spinner'

const App: React.FC = (props: any) => {
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        props.dispatch(authRequestToken())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (props.auth.data)
            window.location.assign(`https://www.themoviedb.org/auth/access?request_token=${props.auth.data.request_token}`)
        return () => {
            setIsLoading(false)
        }
    }, [props.auth])
  return (
    <div className="App">
      { isLoading ? <Spinner /> : null }
    </div>
  );
}

const mapStateToProps = (state: any) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(App);
