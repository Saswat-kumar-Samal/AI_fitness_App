import {useEffect, useState, type FormEvent} from "react";
import {AtSignIcon, Mail, Lock , Eye, EyeOff} from 'lucide-react'
import {useNavigate} from 'react-router-dom'
import {useAppContext} from "../context/AppContext.tsx";
import {Toaster} from "react-hot-toast";


type stateType = "login" | "signup"

const Login = () => {

    const [state, setState] = useState<stateType>("signup")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate();
    const {user, login, signup} = useAppContext();

    const handleSubmit = async (e : FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        if (state === "login"){
            await login({email, password})
        }else{
            await signup({username, email, password})
        }
        setIsSubmitting(false)
    }


    useEffect( () => {
        if (user){
            navigate('/')
        }
    }, [user, navigate])

    return (
        <>
            <Toaster />
            <main className='flex justify-center items-center w-full h-screen px-4 bg-white dark:bg-slate-950 transition-colors duration-200'>
                <form className='flex w-full flex-col max-w-80' onSubmit={handleSubmit}>
                    <h2 className='text-3xl font-medium
                    text-gray-900 dark:text-white'>{state === 'login' ? 'Sign In' : 'Sign Up'}</h2>

                    <p className='mt-2 text-sm text-gray-500/80 dark:text-gray-400'>
                        {state === 'login' ? "Please enter Email and password to access"
                        : "Please enter your details to create Account "}</p>

                    {/* making username field */ }
                    {
                        state !== 'login' &&
                        <div className='mt-4'>
                            <label className='font-medium text-sm text-gray-700 dark:text-gray-300'>Username</label>
                            <div className='relative mt-2'>

                                <AtSignIcon className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-3.5'/>

                                <input onChange={(e) => setUsername(e.target.value)}
                                       value={username}
                                        type="text"
                                       required={true}
                                       placeholder='Enter Username here'
                                        className='pl-10 rounded-md ring ring-gray-200 dark:ring-slate-700 bg-white
                                              dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-1
                                                focus:ring-green-600 dark:focus:ring-green-500 outline-none p-1.5 w-full transition-all duration-200'/>
                            </div>
                        </div>
                    }

                    {/* for email */}
                    <div className='mt-4'>
                        <label className='font-medium text-sm text-gray-700 dark:text-gray-300'>Email</label>
                        <div className='relative mt-2'>

                            <Mail className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-3.5'/>

                            <input onChange={(e) => setEmail(e.target.value)}
                                   value={email}
                                   type="email"
                                   required={true}
                                   placeholder='Enter Email here'
                                   className='pl-10 rounded-md ring ring-gray-200 dark:ring-slate-700 bg-white
                                              dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-1
                                                focus:ring-green-600 dark:focus:ring-green-500 outline-none p-1.5 w-full transition-all duration-200'/>
                        </div>
                    </div>

                    {/* for Password */}
                    <div className='mt-4'>
                        <label className='font-medium text-sm text-gray-700 dark:text-gray-300'>Password</label>
                        <div className='relative mt-2'>

                            <Lock className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-3.5'/>

                            <input onChange={(e) => setPassword(e.target.value)}
                                   value={password}
                                   type={showPassword ? 'text' : 'password'}
                                   required={true}
                                   placeholder='Enter Password here'
                                   className='pl-10 rounded-md ring ring-gray-200 dark:ring-slate-700 bg-white
                                              dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-1
                                                focus:ring-green-600 dark:focus:ring-green-500 outline-none p-1.5 w-full transition-all duration-200'/>
                            <button type='button'
                                    className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-400 cursor-pointer'
                                    onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <EyeOff size={16} className='active:scale-95'/> : <Eye size={16} className='active:scale-95'/>}
                            </button>
                        </div>
                    </div>
                    <button type='submit' disabled={isSubmitting}
                            className='py-2 w-full rounded-md bg-green-500 text-white transition hover:bg-green-900 disabled:opacity-60 text-sm mt-6'>
                        {
                            isSubmitting ? 'Signing In.....' : state === 'login' ? 'Login' : 'SignUp'
                        }
                    </button>
                    {state === 'login' ?
                        <p className='text-gray-400 mt-3 ml-2'>do not have account ? <button className='hover:underline cursor-pointer text-green-600' onClick={ () => setState("signup")}>Sign up</button></p>
                        : <p className='text-gray-400 mt-3 ml-2'>already hava an account ? <button className='hover:underline cursor-pointer text-green-600' onClick={ () => setState("login")}>Login</button></p>}
                </form>
            </main>
        </>
    )
}

export default Login