import {Outlet} from 'react-router-dom'
import Sidebar from '../components/Sidebar.tsx'
import MobileViewNav from "../components/MobileViewNav.tsx";

const Layout = () => {
    return (
        <div className='min-h-screen lg:max-h-screen lg:flex bg-white dark:bg-slate-950 transition-colors duration-200'>
            <Sidebar />

            {/* we have to mount all the child to the layout , otherwise we will not see any route */}
            <div className='flex-1 overflow-y-scroll'>
                <Outlet />
            </div>
            <MobileViewNav />
        </div>
    )
}

export default Layout