import React, { useEffect, useRef, useState } from 'react'
import {
  LuMapPinHouse,
  LuMail, 
  LuPhone, 
  LuRss,
  LuGithub,
  LuUser
} from "react-icons/lu"
import {RiLinkedinLine} from "react-icons/ri"
import ContactInfo from '../ResumeSections/ContactInfo';
import EducationInfo from '../ResumeSections/EducationInfo';
import { formatYearMonth } from '../../utils/helper';
import LanguageSection from '../ResumeSections/LanguageSection';
import WorkExperience from '../ResumeSections/WorkExperience';
import ProjectInfo from '../ResumeSections/ProjectInfo';
import SkillSection from '../ResumeSections/SkillSection';
import CertificationInfo from './CertificationInfo';

const DEFAULT_THEME=["#EBFDFF", "#A1F4FD", "#CEFAFE","#00B8DB","#4A5565"];

const Title=({text,color})=>{
  return (
    <div className="relative w-full mb-2.5">
      <span
      className='absolute bottom-0 left-0 w-full h-2'
      style={{background:color}}
      ></span>
      <h2 className={`relative text-sm font-semibold`}>{text}</h2>
    </div>
  )
}
const TemplateOne = ({resumeData, colorPalette,containerWidth}) => {
  const themeColors=colorPalette?.length>0 ? colorPalette : DEFAULT_THEME;

  const resumeRef=useRef(null);
  const [baseWidth,setBaseWidth]=useState(800); //Default Value
  const [scale,setScale]=useState(1);

  // Safe fallbacks for all resumeData properties
  const safeProfileInfo = resumeData?.profileInfo || {};
  const safeContactInfo = resumeData?.contactInfo || {};
  const safeEducation = resumeData?.education || [];
  const safeLanguages = resumeData?.languages || [];
  const safeWorkExperience = resumeData?.workExperience || [];
  const safeProjects = resumeData?.projects || [];
  const safeSkills = resumeData?.skills || [];
  const safeCertifications = resumeData?.certifications || resumeData?.certifitcations || [];
  const safeInterests = resumeData?.interests || [];

  useEffect(()=>{
    //Calculate the scale factor based on the container width
    const actualBaseWidth=resumeRef.current.offsetWidth;
    setBaseWidth(actualBaseWidth); //Get the actual base width
    setScale(containerWidth/baseWidth);
  },[containerWidth])
  
  
  return (
    <div
    ref={resumeRef}
    className='p-3 bg-white'
    style={{
      transform:containerWidth>0?`scale(${scale})`:"none",
      transformOrigin:"top left",
      width:containerWidth>0? `${baseWidth}px`:"auto", // Keep the original size the scaling works correctly 
      height:"auto",
    }}
    >
      <div className='grid grid-cols-12 gap-8'>
        <div
        className='col-span-4 py-10'
        style={{backgroundColor:themeColors[0]}}
        >
          <div className='flex flex-col items-center px-2'>
            <div
            className='w-[100px] h-[100px] max-w-[110px] max-h-[110px] rounded-full flex items-center justify-center'
            style={{backgroundColor:themeColors[1]}}
            >
              {safeProfileInfo.profilePreviewUrl ?(
                <img
                src={safeProfileInfo.profilePreviewUrl}
                className='w-[90px] h-[90px] rounded-full'
               />
              ):(
                <div
                className='w-[90px] h-[90px] flex items-center justify-center text-5xl rounded-full'
                style={{color:themeColors[4]}}
                >
                  <LuUser/>
                  </div>
              )}
            </div>

            <h2 className='text-xl font-bold mt-3'>
              {safeProfileInfo.fullName}
            </h2>
            <p className='text-sm text-center'>
              {safeProfileInfo.designation}
            </p>
          </div>

          <div className='my-6 mx-6'>
            <div className='flex flex-col gap-4'>
              <ContactInfo
              icon={<LuMapPinHouse/>}
              iconBG={themeColors[2]}
              value={safeContactInfo.location}
              />

              <ContactInfo
              icon={<LuMail/>}
              iconBG={themeColors[2]}
              value={safeContactInfo.email}
              />

              <ContactInfo
              icon={<LuPhone/>}
              iconBG={themeColors[2]}
              value={safeContactInfo.phone}
              />

              {safeContactInfo.linkedin && (
                <ContactInfo
                icon={<RiLinkedinLine/>}
                iconBG={themeColors[2]}
                value={safeContactInfo.linkedin}
                />
                 )}

               {safeContactInfo.github &&(
                  <ContactInfo
                  icon={<LuGithub/>}
                  iconBG={themeColors[2]}
                  value={safeContactInfo.github}
                  />
               )} 

               <ContactInfo
               icon={<LuRss/>}
               iconBG={themeColors[2]}
               value={safeContactInfo.website}
               />
             
            </div>

            <div className='mt-5'>
              <Title text="Education" color={themeColors[1]}/>
              
              {safeEducation.map((data,index)=>(
                <EducationInfo
                key={`education_${index}`}
                degree={data.degree}
                institution={data.institution}
                duration={`${formatYearMonth(
                  data.startDate
                )}-${formatYearMonth(data.endDate)}`}
                />
              ))}
            </div>

            <div className='mt-5'>
              <Title text="languages" color={themeColors[1]}/>
              <LanguageSection
              languages={safeLanguages}
              accentColor={themeColors[3]}
              bgColor={themeColors[2]}
              />
            </div>
          </div>
        </div>

        <div className='col-span-8 pt-10 mr-10 pb-5'>
          <div>
            <Title text="Professional Summary" color={themeColors[1]}/>
            <p className='text-sm font-medium'>
              {safeProfileInfo.summary}
            </p>
          </div>

          <div className='mt-4'>
            <Title text="Work Experience" color={themeColors[1]}/>

            {safeWorkExperience.map((data,index)=>(
              <WorkExperience
              key={`work_${index}`}
              company={data.company}
              role={data.role}
              duration={`${formatYearMonth(
                data.startDate
              )}-${formatYearMonth(data.endDate)}`}
              durationColor={themeColors[4]}
              description={data.description}
              />
            ))}
          </div>

          <div className='mt-4'>
            <Title text="Projects" color={themeColors[1]}/>

            {safeProjects.map((project,index)=>(
              <ProjectInfo
              key={`project_${index}`}
              title={project.title}
              description={project.description}
              githubLink={project.github}
              liveDemoUrl={project.liveDemo}
              bgColor={themeColors[2]}
              />
            ))}
          </div>
          <div className='mt-4'>
            <Title text="Skills" color={themeColors[1]}/>

            <SkillSection
            skills={safeSkills}
            accentColor={themeColors[3]}
            bgColor={themeColors[2]}
            />
          </div>
          <div className='mt-4'>
            <Title text="Certifications" color={themeColors[1]}/>
              <div className='grid grid-cols-2 gap-2'>
              {safeCertifications.map((data,index)=>(
                <CertificationInfo
                key={`cert_${index}`}
                title={data.title}
                issuer={data.issuer}
                year={data.year}
                bgColor={themeColors[2]}
                />
              ))}
            </div>
          </div>

          {safeInterests.length>0 && safeInterests[0]!=="" &&(
            <div className='mt-4'>
            <Title text="Interests" color={themeColors[1]}/>

            <div className='flex items-center flex-wrap gap-3 mt-4'>
              {safeInterests.map((interest,index)=>{
                if(!interest) return null;
                return (
                  <div 
                  key={`interest_${index}`}
                  className='text-[13px] font-medium py-1 px-3 rounded-lg'
                  style={{backgroundColor:themeColors[2]}}
                  >
                    {interest}
                    </div>
                  
                )
                
               })}
            </div>
          </div>
        )}


        </div>
      </div>
    </div>
  )
}

export default TemplateOne
