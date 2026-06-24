import {toast, Toaster} from "react-hot-toast";
import {PersonStanding, User, ScaleIcon, Target, ArrowLeft, ArrowRight} from 'lucide-react'
import {useState} from "react";
import {useAppContext} from "../context/AppContext.tsx";
import type {ProfileFormData, UserData} from "../types";
import Input from "../components/ui/Input.tsx";
import Button from "../components/ui/Button.tsx";
import Slider from '../components/ui/Slider.tsx'
import mockApi from "../assets/mockApi.ts";
import {ageRanges, goalOptions} from "../assets/assets.ts";




const OnBoarding = () => {

    const [step, setStep] = useState(1)
    const {user, setOnboardingCompleted, fetchUser} = useAppContext()
    const [formData, setFormData] = useState<ProfileFormData>({
        age: 0,
        weight: 0,
        height: 0,
        goal: "maintain",
        dailyCalorieIntake: 2000,
        dailyCalorieBurn: 400
    })

    function updateField(field: keyof ProfileFormData, value: string | number){
        setFormData({...formData, [field] : value})
    }

    async function handleNext(){
        if (step === 1){
            if (!formData.age){
                return toast("Age is required..!!")
            }else if (Number(formData.age) < 13 || Number(formData.age) > 120){
                return toast("Invalid Age given....!!")
            }
        }
        if (step < 3){
            setStep(step + 1)
        }else{
            const userData = {
                ...formData,
                age: formData.age,
                weight: formData.weight,
                height: formData.height? formData.height : null,
                createdAt: new Date().toISOString()
            }
            localStorage.setItem("fitnessUser", JSON.stringify(userData))
            await mockApi.user.update(user?.id || "", userData as unknown as Partial<UserData>)
            toast.success("Profile updated successfully....")
            setOnboardingCompleted(true)
            await fetchUser(user?.token || "")
        }
    }

    function calculateGoal(option: {value: string, label: string}){
        const age = Number(formData.age)
        const range = ageRanges.find(
            (r) => age <= r.max) || ageRanges[ageRanges.length-1]
        let intake = range.maintain;
        let burn = range.burn;
        if (option.value === 'lose'){
            intake -= 400
            burn += 100
        }else if (option.value === 'gain'){
            intake += 500
            burn -= 100
        }
        setFormData({...formData,
            goal: option.value as 'lose' | 'maintain' | 'gain',
            dailyCalorieIntake: intake,
            dailyCalorieBurn: burn})
    }

    return (
        <>
            <Toaster />
            <div className='min-h-screen bg-linear-to-b from-emerald-50 to-white
            dark:bg-[linear-gradient(to_bottom,theme(colors.slate.700)_5%,theme(colors.slate.950)_100%)]
            flex flex-col transition-colors duration-200'>

                {/* header */}
                <div className='p-6 pt-12 w-full lg:max-w-5xl mx-auto'>
                    <div className='flex items-center gap-3 mb-3'>
                        <div className='h-10 w-10 rounded-xl bg-emerald-500 flex items-center justify-center'>
                            <PersonStanding className='w-6 h-6 text-white'/>
                        </div>
                        <h1 className='text-2xl font-bold text-slate-800 dark:text-white select-none'>Fit Track</h1>
                    </div>
                    <p className='text-slate-500 mt-2 dark:text-slate-400 '>Let's Personalise your experience</p>
                </div>

                {/* Progress bar indicator */}
                <div className='px-6 mb-6 w-full lg:max-w-5xl mx-auto'>
                    <div className='flex gap-2 max-w-2xl'>
                        {
                            [1,2,3].map((idx) => (
                                <div key={idx} className={`h-1.5 flex-1 rounded-full transition-all duration-500
                                                            ${idx <= step ? 'bg-emerald-500 ' : 'bg-slate-200 dark:bg-slate-500'}`}/>
                            ))
                        }
                    </div>
                    <p className='mt-2 text-sm'>steps {step} of 3</p>
                </div>

                {/* form content */}
                <div className='flex-1 px-6 w-full lg:max-w-5xl mx-auto'>
                    {step === 1 &&
                        (<div className='space-y-6'>
                            <div className='flex gap-4 items-center'>
                                <div className='px-2 py-2 ring ring-emerald-400 dark:ring-green-500 inline-block rounded-lg'><User className='size-6 text-emerald-600 dark:text-slate-400'/></div>
                                <div>
                                    <h2 className='text-sm text-slate-800 dark:text-white'>How old are you ?</h2>
                                    <p className='text-xs dark:text-slate-400 text-slate-800'>this helps us calculate your need </p>
                                </div>
                                </div>
                                <Input label="Age" type = "number" className='max-w-2xl'
                                       value={formData.age} onChange={ (v) => updateField('age', v)}
                                        placeholder='Enter your age' min={13} max={120} required={true} />
                        </div>)}



                    {step === 2 &&
                            (<div className='space-y-6 w-full lg:max-w-5xl mx-auto'>
                                <div className='flex gap-4 items-center'>
                                    <div className='px-2 py-2 ring ring-emerald-400 dark:ring-green-500 inline-block rounded-lg'><ScaleIcon className='size-6 text-emerald-600 dark:text-slate-400'/></div>
                                    <div>
                                        <h2 className='text-sm text-slate-800 dark:text-white'>Your Measurements</h2>
                                        <p className='text-xs dark:text-slate-400 text-slate-800'>helps us track your progress </p>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-4 max-w-2xl'>
                                    <Input label="Weight (kg)" type = "number"
                                           value={formData.weight} onChange={ (v) => updateField('weight', v)}
                                           placeholder='Enter your weight' min={20} max={300} required={true} />

                                    <Input label="height (cm) - optional" type = "number"
                                           value={formData.height} onChange={ (v) => updateField('height', v)}
                                           placeholder='Enter your height' min={100} max={250}/>
                                </div>
                            </div>)}

                    {step === 3 &&
                            (<div className='space-y-6 w-full lg:max-w-5xl mx-auto'>
                                <div className='flex gap-4 items-center'>
                                    <div className='px-2 py-2 ring ring-emerald-400 dark:ring-green-500 inline-block rounded-lg'>
                                        <Target className='size-6 text-emerald-600 dark:text-slate-400'/>
                                    </div>
                                    <div>
                                        <h2 className='text-sm text-slate-800 dark:text-white'>What's your goal </h2>
                                        <p className='text-xs dark:text-slate-400 text-slate-800'>helps us track your progress </p>
                                    </div>
                                </div>

                                {/* options */}
                                <div className='space-y-3 max-w-sm'>
                                    {goalOptions.map((option) => (
                                        <button key={Math.random()}
                                                onClick={ () => calculateGoal(option) }
                                                className={`onboarding-option-btn ${formData.goal === option.value && 'ring-2 ring-emerald-500'}`}>
                                            <span className='text-base text-slate-700 dark:text-slate-200'>{option.label}</span>
                                        </button>
                                    ))}
                                </div>

                                <div className='border-t border-slate-200 dark:border-slate-700 my-6 max-w-lg'></div>
                                {/* daily targets */}
                                <div className='space-y-6 max-w-lg'>
                                    <h3 className='text-base font-medium text-slate-800 dark:text-white mb-4'>Daily Targets</h3>
                                    <div className='space-y-10'>
                                        <Slider label='Daily Calory Intake' min={120} max={4000} step={50}
                                                value={formData.dailyCalorieIntake}
                                                onChange={ (val) => updateField('dailyCalorieIntake', val) }
                                                unit="kcal" infoText="the total calories you plan to consume each day"/>

                                        <Slider label='Daily Calory Burn' min={100} max={2000} step={50}
                                                value={formData.dailyCalorieBurn}
                                                onChange={ (val) => updateField('dailyCalorieBurn', val) }
                                                unit="kcal" infoText="the total calories you aim to burn through exercise and activity each day"/>
                                    </div>
                                </div>
                            </div>)}
                </div>


                {/* Navigation button */}
                <div className='p-6 pb-10 min-w-5xl mx-auto'>
                    <div className='flex gap-3 lg:justify-end'>
                        {step > 1 && <Button variant='secondary' onClick={()=> setStep(step > 1 ? step-1 : 1) }
                            className='max-lg:flex-1 lg:px-6'>
                            <span className='flex items-center justify-center gap-2'>
                                <ArrowLeft className='size-5'/>
                                Back
                            </span>
                        </Button>}

                        <Button onClick={handleNext}
                                className='max-lg:flex-1 lg:px-6'>
                            <span className='flex items-center justify-center gap-2'>
                                {step === 3 ? <p className='text-sm font-medium'>Get Started</p> : 'Continue'}
                                <ArrowRight className='size-5'/>
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OnBoarding