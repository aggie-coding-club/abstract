"use client"
import { useAuth } from "../components/context/AuthContext";
import { auth, db } from "../firebase/firebase";
import React, { ReactNode } from "react";
import { getImages } from "../firebase/firebase";

export default function History() {
    const [user, setUser] = React.useState(Object)
    const [images, setImages] = React.useState(Array<string>)
    auth.onAuthStateChanged((curUser)=>{
        setUser(curUser);
    })
    if(user?.displayName){
        if(images.length===0){
        getImages(user).then((result)=>{
            console.log("current images array:",images)
            if(result){
            const imageLinks:string[] = result;
            console.log(imageLinks)
            setImages(imageLinks);
            }
        });
    }
    return (
        <div className="flex flex-col justify-center place-items-center">
            <h1 className="h-12 text-4xl dark:text-white">Art History</h1>
        <div className="flex flex-row flex-wrap justify-center">    
           {images.map((image,index)=>(
            <div className="mx-2 my-2 size-56 bg-black flex flex-col justify-center place-items-center rounded-md bg-gradient-to-b from-slate-300 via-blue-500 to-slate-300 dark:bg-gradient-to-b dark:from-orange-400 dark:via-yellow-400 dark:to-orange-400" key={index}>
                <img 
                className="size-52 object-scale-down"
                src={image}
                alt={`Saved Picture ${index+1}`}
                />
            </div>
            ))
           }
        </div>
        </div>
    )

     }

    else{console.log("no")
    return (<div> 
        <div className="flex flex-col place-items-center dark:bg-black">
                <h1>No User</h1>
            </div>
        </div>);
    }
}