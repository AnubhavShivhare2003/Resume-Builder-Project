import React, { useState,useEffect } from "react";
import { getLightColorFromImage } from "../../utils/helper";
const ResumeSummaryCard = ({ imageUrl, title, lastUpdated, onSelect }) => {
    
    const [bgColor, setBgColor]= useState("#ffffff")
    useEffect(()=>{
        if(imageUrl){
            getLightColorFromImage(imageUrl)
            .then((color)=>{
                setBgColor(color)
            })
            .catch(()=>{
                setBgColor("#ffffff")
            })
        }
    },[imageUrl])

    return <div  
            className="h-[300px] flex flex-col items-center justify-between bg-white rounded-lg border border-gray-200 hover:border-purple-300 overflow-hidden cursor-pointer"
            style={{backgroundColor:bgColor}}
            onClick={onSelect}
            >
                <div className="p-4">
                    {imageUrl ? (
                        <img
                        src={imageUrl}
                        alt=""
                        className="w-[100%] h-[200px] rounded"
                        />
                    ):(
                        <div> </div>
                    )}
            </div>
            <div className="w-full bg-white px-4 py-3">
                <h5 className="text-sm font-medium truncate overflow-hidden whitespace-nowrap">{title}</h5>
                <p className="text-xs font-medium text-gray-500 mt-0.5">
                    Last UpdatedAt:{lastUpdated}
                </p>
            </div>
            </div>
}
export default ResumeSummaryCard;