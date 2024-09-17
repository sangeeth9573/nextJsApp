"use client";
import { useRef, useState } from 'react';
import classes from './image-picker.module.css';
import Image from 'next/image';
export default function ImagePicker({ lable, name }) {
    const imagePicker = useRef()
    const[pickupImage,setPickupImage]=useState();
    function handleInput(){
        imagePicker.current.click();
    }
    function handleImage(event){
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onload =()=>{
           setPickupImage( fileReader.result);
        }
        fileReader.readAsDataURL(file);
    }
    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{lable}</label>
            <div className={classes.control}>
                <div className={classes.preview}>
                    {!pickupImage && <p> No Image picked yet</p>}
                  {  pickupImage && <Image src={pickupImage} alt='picked Image' fill/>}
                </div>
                <input
                    className={classes.input}
                    type='file'
                    id={name}
                    accept='image/png,image/jpeg'
                    name={name}
                    ref={imagePicker}
                    onChange={handleImage}
                    required
                />
                
            </div>
            <button type='button' className={classes.button} onClick={handleInput}>
                    pick Image
                </button>
        </div>

    )
}