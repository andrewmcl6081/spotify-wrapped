import RedirectButton from '../RedirectButton'

const Home = () => {

    return (
        <>
            <h1>Home Page</h1>
            <RedirectButton to='http://localhost:8080/api/login'/>
        </>
    )
}

export default Home