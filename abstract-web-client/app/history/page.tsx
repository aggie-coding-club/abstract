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
            <h1>Art History</h1>
        <div className="flex flex-row flex-wrap justify-center">    
           {images.map((image,index)=>(
            <div className="mx-2 my-2"key={index}>
                <img 
                className="border-4 border-slate-300 dark:border-orange-400 rounded-md"
                src={image}
                height="200"
                width="200"
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