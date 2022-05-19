function Home({currentUser}){
    return (
        <h1>welcome home {currentUser?.first_name}</h1>
    )
}

export default Home;