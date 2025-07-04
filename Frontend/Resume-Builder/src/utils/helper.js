import moment from 'moment'
import html2canvas from 'html2canvas'
export const validateEmail=(email)=>{
    const regex=/^[^\s@]+@[^\s@].[^\s@]+$/;
    return regex.test(email)
}

//get lightest average color
export const  getLightColorFromImage=(imageUrl)=>{
    return new Promise((resolve,reject)=>{
        //Check if imageUrl is valid
        if(!imageUrl || typeof imageUrl!=='string'){
            return reject(new Error)
        }
        const img=new Image();

        //If not a base64 string, set crossOrigin (important for Cors)
        if(!imageUrl.startsWith('data:')){
            img.crossOrigin='anonymous';
        }
        img.src=imageUrl
        img.onload=()=>{
            const canvas=document.createElement('canvas');
            const ctx=canvas.getContext('2d')
            

        canvas.width=img.width;
        canvas.height=img.height;
        ctx.drawImage(img,0,0);

        const imageData=ctx.getImageData(0,0, canvas.width, canvas.height).data;

        let r=0, g=0, b=0, count=0;
        
        for(let i=0; i<imageData.length;i+=4){
            const red=imageData[i];
            const green=imageData[i+1];
            const blue=imageData[i+2];
            const brightness=(red+green+blue)/3;

            //Only count light pixels (tweak threshold as needed)
            if(brightness>100){
                r+=red;
                g+=green;
                b+=blue;
                count++
            }
        }
        if(count===0){
            resolve('#ffffff')//falback if no bright pixels found
        }
        else{
            r=Math.round(r/count);
            g=Math.round(g/count);
            b=Math.round(b/count);
            resolve(`rgb(${r}, ${g}, ${b})`);
        }
        };
        img.onerror=(e)=>{
            console.error('Failed to load image:',e)
            reject(new Error('Image could not be loaded or is blocked by CORS.'))
        }
    })
}


//Eg: Mar 2025 
export function formatYearMonth(yearMonth){
    
    return yearMonth ? moment(yearMonth, "YYYY-MM").format("MMM YYYY"):"";
}


export const fixTailWindColors=(element)=>{
    const elements=element.querySelectorAll("*")
    elements.forEach((el)=>{
        const style=window.getComputedStyle(el);

        ["color","backgroundColor","borderColor"].forEach((prop)=>{
            const value=style[prop];
            if(value.includes("oklch")){
                el.style[prop]="#000" //or any safe fallback
            }
        })
    })
}

//convert component to image
export async function captureElementAsImage(element){
    if(!element)throw Error("NO element provided");

    const canvas=await html2canvas(element);
    return canvas.toDataURL("image/png");
}

//Utility to convert based64 data Url to a file object 
export const dataUrltoFile=(dataUrl,fileName)=>{
    const arr=dataUrl.split(",");
    const mime=arr[0].match(/:(.*?);/)[1];
    const bstr=atob(arr[1]);
    let n=bstr.length;
    const uBarr=new Uint8Array(n)

    while(n--){
        uBarr[n]=bstr.charCodeAt(n);
    }
    return new File([uBarr],fileName,{type:mime});
}