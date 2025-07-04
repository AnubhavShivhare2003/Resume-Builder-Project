import React, { useEffect, useRef, useState } from 'react';
import {
  LuMapPinHouse,
  LuMail, 
  LuPhone, 
  LuRss,
  LuGithub,
  LuUser
} from "react-icons/lu";
import { RiLinkedinLine } from "react-icons/ri";
import ContactInfo from '../ResumeSections/ContactInfo';
import EducationInfo from '../ResumeSections/EducationInfo';
import { formatYearMonth } from '../../utils/helper';
import LanguageSection from '../ResumeSections/LanguageSection';
import WorkExperience from '../ResumeSections/WorkExperience';
import ProjectInfo from '../ResumeSections/ProjectInfo';
import SkillSection from '../ResumeSections/SkillSection';
import CertificationInfo from './CertificationInfo';

const DEFAULT_THEME = ["#F8FAFC", "#E2E8F0", "#64748B", "#2563EB", "#0F172A"];

const Title = ({ text, color }) => (
  <div className="relative w-full mb-2.5">
    <span
      className='absolute bottom-0 left-0 w-10 h-2 rounded'
      style={{ background: color, opacity: 0.2 }}
    ></span>
    <h2 className={`relative text-base font-semibold tracking-wide uppercase`} style={{ color }}>{text}</h2>
  </div>
);

const TemplateThree = ({ resumeData, colorPalette, containerWidth }) => {
  const themeColors = colorPalette?.length > 0 ? colorPalette : DEFAULT_THEME;

  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(900); // Wider for professional look
  const [scale, setScale] = useState(1);

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

  useEffect(() => {
    const actualBaseWidth = resumeRef.current.offsetWidth;
    setBaseWidth(actualBaseWidth);
    setScale(containerWidth / baseWidth);
  }, [containerWidth]);

  return (
    <div
      ref={resumeRef}
      className='p-4 bg-white shadow-lg rounded-lg'
      style={{
        transform: containerWidth > 0 ? `scale(${scale})` : "none",
        transformOrigin: "top left",
        width: containerWidth > 0 ? `${baseWidth}px` : "auto",
        height: "auto",
      }}
    >
      <div className='grid grid-cols-12 gap-0 min-h-[900px]'>
        {/* Sidebar Left */}
        <div className='col-span-4 bg-gradient-to-b from-[themeColors[1]] to-[themeColors[0]] rounded-l-lg p-8 flex flex-col items-center text-center shadow-md'>
          <div className='w-[110px] h-[110px] rounded-full border-4 border-white shadow-lg mb-4 flex items-center justify-center bg-gray-100'>
            {safeProfileInfo.profilePreviewUrl ? (
              <img src={safeProfileInfo.profilePreviewUrl} className='w-[100px] h-[100px] rounded-full object-cover' alt='Profile'/>
            ) : (
              <div className='w-[100px] h-[100px] flex items-center justify-center text-5xl rounded-full' style={{ color: themeColors[4] }}>
                <LuUser />
              </div>
            )}
          </div>
          <h2 className='text-xl font-bold mb-1' style={{ color: themeColors[4] }}>{safeProfileInfo.fullName}</h2>
          <p className='text-sm font-medium mb-4' style={{ color: themeColors[2] }}>{safeProfileInfo.designation}</p>

          <div className='mb-6 w-full'>
            <Title text="Contact" color={themeColors[3]} />
            <div className='flex flex-col gap-2 text-left mt-2'>
              <ContactInfo icon={<LuMapPinHouse />} iconBG={themeColors[2]} value={safeContactInfo.location} />
              <ContactInfo icon={<LuMail />} iconBG={themeColors[2]} value={safeContactInfo.email} />
              <ContactInfo icon={<LuPhone />} iconBG={themeColors[2]} value={safeContactInfo.phone} />
              {safeContactInfo.linkedin && (
                <ContactInfo icon={<RiLinkedinLine />} iconBG={themeColors[2]} value={safeContactInfo.linkedin} />
              )}
              {safeContactInfo.github && (
                <ContactInfo icon={<LuGithub />} iconBG={themeColors[2]} value={safeContactInfo.github} />
              )}
              <ContactInfo icon={<LuRss />} iconBG={themeColors[2]} value={safeContactInfo.website} />
            </div>
          </div>

          <div className='mb-6 w-full'>
            <Title text="Skills" color={themeColors[3]} />
            <SkillSection
              skills={safeSkills}
              accentColor={themeColors[3]}
              bgColor={themeColors[1]}
            />
          </div>

          <div className='mb-6 w-full'>
            <Title text="Languages" color={themeColors[3]} />
            <LanguageSection
              languages={safeLanguages}
              accentColor={themeColors[3]}
              bgColor={themeColors[1]}
            />
          </div>

          <div className='mb-6 w-full'>
            <Title text="Interests" color={themeColors[3]} />
            <div className='flex flex-wrap gap-2 mt-2 justify-center'>
              {safeInterests.map((interest, idx) => (
                <span key={idx} className='text-xs px-3 py-1 rounded-full bg-white border border-gray-200' style={{ color: themeColors[4] }}>{interest}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Right */}
        <div className='col-span-8 bg-white rounded-r-lg p-10'>
          <div className='mb-6'>
            <Title text="Profile" color={themeColors[3]} />
            <p className='text-sm font-medium'>{safeProfileInfo.summary}</p>
          </div>

          <div className='mb-6'>
            <Title text="Work Experience" color={themeColors[3]} />
            {safeWorkExperience.map((data, index) => (
              <WorkExperience
                key={`work_${index}`}
                company={data.company}
                role={data.role}
                duration={`${formatYearMonth(data.startDate)}-${formatYearMonth(data.endDate)}`}
                durationColor={themeColors[4]}
                description={data.description}
              />
            ))}
          </div>

          <div className='mb-6'>
            <Title text="Projects" color={themeColors[3]} />
            {safeProjects.map((project, index) => (
              <ProjectInfo
                key={`project_${index}`}
                title={project.title}
                description={project.description}
                githubLink={project.github}
                liveDemoUrl={project.liveDemo}
                bgColor={themeColors[1]}
              />
            ))}
          </div>

          <div className='mb-6'>
            <Title text="Education" color={themeColors[3]} />
            {safeEducation.map((data, index) => (
              <EducationInfo
                key={`education_${index}`}
                degree={data.degree}
                institution={data.institution}
                duration={`${formatYearMonth(data.startDate)}-${formatYearMonth(data.endDate)}`}
              />
            ))}
          </div>

          <div className='mb-6'>
            <Title text="Certifications" color={themeColors[3]} />
            <div className='grid grid-cols-2 gap-2'>
              {safeCertifications.map((data, index) => (
                <CertificationInfo
                  key={`cert_${index}`}
                  title={data.title}
                  issuer={data.issuer}
                  year={data.year}
                  bgColor={themeColors[1]}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateThree; 