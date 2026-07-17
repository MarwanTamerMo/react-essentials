const Welcome = (props) => {
    console.log(props)
    return (
        <>
            <h2> Welcome, {props.name}!</h2>
            <p>Enjoy your React journey!</p>
        </>
    )
}

export default Welcome