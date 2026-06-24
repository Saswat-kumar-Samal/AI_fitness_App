import {Route, Routes} from 'react-router-dom'
import Dashboard from "./pages/Dashboard.tsx";
import Layout from "./pages/Layout.tsx";
import FoodLog from "./pages/FoogLog.tsx";
import ActivityLog from "./pages/ActivityLog.tsx";
import Profile from "./pages/Profile.tsx";
import  {useAppContext} from "./context/AppContext.tsx";
import Login from "./pages/Login.tsx";
import Loading from "./components/Loading.tsx";
import OnBoarding from "./pages/OnBoarding.tsx";
import {Toaster} from "react-hot-toast";

const App = () => {
    const { user, isUserFetched, onboardingCompleted } = useAppContext();
    if (!user) {
        return  isUserFetched ? <Login /> : <Loading/>
    }
    if (!onboardingCompleted){
        return <OnBoarding />
    }

    return (
        <>
            <Toaster />
            <Routes>
                <Route path="/" element={ <Layout /> }>
                    <Route index element={ <Dashboard /> } />
                    <Route path='food' element={ <FoodLog /> } />
                    <Route path='activity' element={ <ActivityLog /> } />
                    <Route path='profile' element={ <Profile /> } />
                </Route>
            </Routes>
        </>
    )
}

export default App