import {ActivityIcon, HomeIcon, UsersIcon, UtensilsIcon} from "lucide-react";
import {NavLink, type NavLinkRenderProps} from "react-router-dom";


export default function MobileViewNav(){

    const naveItems = [
        {path: '/', label: 'Home', icon: HomeIcon},
        {path: '/food', label: 'Food', icon: UtensilsIcon},
        {path: '/activity', label: 'Activity', icon: ActivityIcon},
        {path: '/profile', label: 'Profile', icon: UsersIcon}
    ]

    return (
        <nav className='fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-100
                        dark:border-slate-800 px-4 lg:hidden transition-colors duration-200'>

            <div className='max-w-lg mx-auto flex items-center justify-around h-16'>
                {naveItems.map((item, index) => (
                    <NavLink key={index}
                             to={item.path}
                            className={ ({isActive}: NavLinkRenderProps) :string => `flex flex-col items-center gap-1 px-4 py-2 rounded-xl
                                        transition-all duration-200 ${isActive ? 'text-emerald-900 dark:text-emerald-400 dark:bg-emerald-900/80 bg-emerald-200/80' 
                                        : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-600'}`}>
                        <item.icon size={20}/>
                        <span className='text-xs font-medium'>{item.label}</span>
                    </NavLink>
                ))}
            </div>

        </nav>
    )
}