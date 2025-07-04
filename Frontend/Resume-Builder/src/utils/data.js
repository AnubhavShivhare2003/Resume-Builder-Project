import TemplateOne from "../assets/TemplateOne.jpeg";
import TemplateTwo from "../assets/TemplateTwo.jpeg";
import TemplateThree from "../assets/TemplateThree.jpeg";

export const resumeTemplates=[

    {id:"01",
        thumbnailImg:TemplateOne,
        colorPaletteCode:"themeOne"
    },
    {
        id:"02",
        thumbnailImg:TemplateTwo,
        colorPaletteCode:"themeTwo"
    },
    {
        id:"03",
        thumbnailImg:TemplateThree,
        colorPaletteCode:"themeThree"
    },
]

export const themeColorPalette={
    themeOne:[
     ["#EBFDFF", "#A1F4FD", "#CEFAFE", "#00B8DB", "#4A5565"],
     ["#E9FBF8", "#B4EFE7", "#93E2DA", "#2AC9A0", "#3D4C5A"],
     ["#F5F4FF", "#E0DBFF", "#C9C2F8", "#8579D1", "#4B4B5C"], 
     ["#F0FAFF", "#D6F0FF", "#AFDEFF", "#3399FF", "#445361"], 
     ["#FFF5F7", "#FFE0EC", "#FAC6D4", "#F6729C", "#5A5A5A"],
     ["#F9FAFB", "#E4E7EB", "#CBD5E0", "#7F9CF5", "#2D3748"],

     ["#F4FFFD", "#D3FDF2", "#B0E9D4", "#34C79D", "#384C48"], 
     ["#FFF7F0", "#FFE6D9", "#FFD2BA", "#FF9561", "#4C4743"], 
     ["#F9FCFF", "#E3F0F9", "#C0DDEE", "#6CA6CF", "#46545E"], 
     ["#FFFDF6", "#FFF4D7", "#FFE7A0", "#FFD000", "#57534E"], 
     ["#EFFCFF", "#C8F0FF", "#99E0FF", "#007BA7", "#283A42"],
     ["#F7F7F7", "#E4E4E4", "#CFCFCF", "#4A4A4A", "#222222"], 
     ["#E3F2FD", "#90CAF9", "#A8D2F4", "#1E88E5", "#0047A1"],
    ],
    themeTwo:[
     ["#F0FAFF", "#FFD2BA", "#3399FF", "#FF9561", "#4A4A4A"],
     ["#F5F7FA", "#D1E8E2", "#A9D6E5", "#1995AD", "#2F4858"],
    ],
    themeThree:[
     ["#F8FAFC", "#E2E8F0", "#64748B", "#2563EB", "#0F172A"],
     ["#F3F4F6", "#D1D5DB", "#6B7280", "#1D4ED8", "#111827"],
     ["#F9FAFB", "#E5E7EB", "#9CA3AF", "#2563EB", "#1E293B"],
    ],
}

export const DUMMY_RESUME_DATA={
    profileInfo:{
        profileImg:null,
        previewUrl:"",
        fullName:"John Doe",
        designation:"Senior Software Engineer",
        summary:"Passionate and results-driven Developer with 6+ years of experience building fullStack Projects"
    },
    contactInfo:{
        email:"john.doe@example.com",
        phone:"+1234567890",
        location:"#12 Vasant Vihar, Delhi, India",
        linkedin:"https://linkedin.com/timetoprogram",
        github:"https://github.com/timetoprogram",
        website:"https://timetoprogram.com",
    },
    workExperience:[
        {
        company:"Tech Solutions",
        role:"Senior Backend Developer",
        startDate:"2022-03",
        endDate:"2024-04",
        description:
        "Leading the backend team to build scalable applications"
    },
    {
        company:"Coding Dev",
        role:"Project Manager",
        startDate:"2024-06",
        endDate:"2025-04",
        description:
        "Managed the Complete development of projects for US based clients"
    },
    ],
    education:[
        {
        degree:"M.Sc. Software Engineering",
        institution:"Tech University",
        startDate:"2021-08",
        endDate:"2023-06",
    },
    {
        degree:"B.Sc Computer Science",
        institution:"State University",
        startDate:"2017-08",
        endDate:"2021-05",

    }
    ],
    skills:[
        {name:"JavaScript", progress:95},
        {name:"React",progress:90},
        {name:"NodeJs",progress:85},
        {name:"typeScript",progress:80},
        {name:"MongoDb",progress:75}
    ],
    projects:[
        {
            title:"Project Manager App",
            description:"A task management app built with MERN Stack",
            github:"https://github.com/timetoprogram/project-manager-app",
        },
        {
            title:"Blog CMS",
            description:"A custom CMS for blogging using express and React",
            liveDemo:"https://ecommerce-demo.timetoprogram.com"
        }
    ],
    certifitcations:[
        {
            title:"Full Stack Web Developer",
            issuer:"Courses",
            year:"2022"
        },
        {
            title:"React Advanced Certification",
            issuer:"Coursera",
            year:"2022"
        }
    ],
    languages:[
        {name:"English",progress:100},
        {name:"Spanish",progress:70},
        {name:"French",progress:40}
    ],
    interests:["Reading","Open Source Contribution","Hiking"],    
}