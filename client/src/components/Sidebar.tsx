import type {ReactElement} from "react";
import {ActivityIcon, HomeIcon, Moon, PersonStandingIcon, Sun, UsersIcon, UtensilsIcon} from 'lucide-react'
import {useTheme} from "../context/ThemeContext.tsx";
import {NavLink, type NavLinkRenderProps} from "react-router-dom";


export default function Sidebar(): ReactElement {

    const naveItems = [
        {path: '/', label: 'Home', icon: HomeIcon},
        {path: '/food', label: 'Food', icon: UtensilsIcon},
        {path: '/activity', label: 'Activity', icon: ActivityIcon},
        {path: '/profile', label: 'Profile', icon: UsersIcon}
    ]

    const {theme, toggleTheme} = useTheme()

    return (
        <nav className='hidden lg:flex flex-col w-56 bg-white dark:bg-slate-900 border-r
        border-slate-100 dark:border-slate-800 p-6 transition-colors duration-500'>

            <div className='flex gap-3 justify-start items-center'>
                <div className='px-2 py-1 bg-green-500 inline-block rounded-lg'>
                    <PersonStandingIcon size={26} className='text-white'/>
                </div>
                <h1 className='text-2xl text-slate-700 dark:text-slate-300 font-bold'>Fit Track</h1>
            </div>

            <div className='flex flex-col gap-2 mt-4 select-none'>
                {naveItems.map((item) => (
                    <NavLink key={item.path} to={item.path}
                    className={ ({isActive}: NavLinkRenderProps): string => `flex items-center gap-3 px-4 py-2 transition-all duration-20 rounded-lg
                                                                           ${isActive ? 'bg-emerald-50 dark:bg-emerald-900/80 text-emerald-600 dark:text-emerald-100 font-medium border-1'
                                                                                        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 border-transparent'}`}>
                        <item.icon size={20}/>
                        <span className='text-base'>{item.label}</span>
                    </NavLink>
                ))}
            </div>

            {/* button for switching between dark and light theme*/}
            <div className='flex flex-1 items-end'>
                <button className='flex items-center gap-3 px-4 py-2.5 w-full text-slate-500 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-800
                                    hover:text-slate-700 dark:hover:text-slate-200 rounded-lg transition-colors duration-200 cursor-pointer'
                        onClick={toggleTheme}>
                    {theme === 'light' ? <Moon size={20}/> : <Sun size={20}/>}
                    <span className='text-sm font-medium'>{theme === "light" ? 'dark mode' : 'light mode'}</span>
                </button>
            </div>
        </nav>
    )
}