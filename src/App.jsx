import React, { Suspense } from "react";
import "./App.scss";
import Loading from "./app/components/Loading";
import Routes from "./app/routes"

function App() {
    
    return (
        <div className="App">
            <Suspense fallback={<Loading />}>
                <Routes />
            </Suspense>
        </div>
    );
}

export default App;
