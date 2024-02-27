"use client";

import Image from 'next/image'
import React, { useState, useEffect } from 'react';
import ThreeEasel from '@/components/threeEasel';


export default function ShopArtPage() {

  useEffect(() => {
    
  }, []);

  return (
    <div className='main flex flex-col'>
      
      <div id="model-container" className='model-container'>
        <div className="left-container absolute flex flex-col h-full w-1/2 justify-center">
          <h1>Mad`s Art Dumpster</h1>

        </div>
        <ThreeEasel />
        <div className='easel-art-container absolute'>
          <Image src="/art/Cappuccino Di Soia 2023.jpg" alt="Easel" width={300} height={300} className='easel-art'/>
        </div>
      </div>
      <div className='shop-container bg-black'>
        <div className='h-screen'>
          <h1>Shop Art</h1>
        </div>
      </div>
    </div>
  );
}