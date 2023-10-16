import { useEffect } from "react"

const Analytics = () => {

    const test = async () => {
        const response = await axios.get('http://localhost:8080/api/top-tracks', {
            withCredentials: true
        })
        console.log(response)
    }

    return (
        <>
            <h1>Analytics Page</h1>
            <button onClick={test}>Test</button>
        </>
    )
}

export default Analytics