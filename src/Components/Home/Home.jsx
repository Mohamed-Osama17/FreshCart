import React, { useContext } from 'react'
import style from './Home.module.css'
import Products from '../Products/Products.jsx';
import MainSlider from '../MainSlider/MainSlider.jsx';
import CategorySlider from '../CategorySlider/CategorySlider.jsx';
import GetApp from '../GetApp/GetApp.jsx';
import AboutUs from '../AboutUs/AboutUs.jsx';
import { DarkModeContext } from '../../Context/DarkModeContext.jsx';


export default function Home() {
  const { darkMode } = useContext(DarkModeContext);

  return <>
    <MainSlider />
    <CategorySlider />
    <Products />
    <div className={`border ${!darkMode ? 'border-orange-300' : 'border-purple-300'} w-[70%] mx-auto my-12`}></div>
    <GetApp />
    <div className={`border ${!darkMode ? 'border-orange-300' : 'border-purple-300'} w-[70%] mx-auto my-12`}></div>
    <AboutUs />


  </>
}
