import React, { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./App.scss";
import Loading from "./app/components/Loading";
import Routes from "./app/routes"

function App() {
    
    const [flag, setFlag] = useState(false);

    const { loggedIn } = useSelector(state => state.login);

    useEffect(() => {
        if (loggedIn) {
            setFlag(true);
        }
    }, [loggedIn]);

    return (
        <div className="App">
            <Suspense fallback={<Loading />}>
                <Routes />
            </Suspense>
        </div>
    );
}

export default App;
