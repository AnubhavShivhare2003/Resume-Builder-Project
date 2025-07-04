import React, { useEffect, useRef, useState } from 'react'
import {
  DUMMY_RESUME_DATA,
  resumeTemplates,
  themeColorPalette,
} from "../utils/data";


import { LuCircleCheckBig } from 'react-icons/lu';
import Tabs from '../components/Tabs';
import RenderResume from '../components/ResumeTemplates/RenderResume';

const TAB_Data=[{label:"Templates"},{label:"Color Palettes"}]

const ThemeSelector = ({selectedTheme,setSelectedTheme,setResumeData,resumeData,onClose = () => {}}) => {
  const resumeRef=useRef(null);
  const [baseWidth,setBaseWidth]=useState(800);

  const [tabValue, setTabValue] = useState("Templates");
  // Find the initial template index
  const initialTemplateIndex = resumeTemplates.findIndex(t => t.id === selectedTheme?.theme);
  // Find the initial palette index
  const initialPaletteIndex = (() => {
    if (initialTemplateIndex === -1) return -1;
    const palettes = themeColorPalette[resumeTemplates[initialTemplateIndex]?.colorPaletteCode] || [];
    return palettes.findIndex(p => JSON.stringify(p) === JSON.stringify(selectedTheme?.colorPalette));
  })();
  const [selectedTemplate, setSelectedTemplate] = useState({
    theme: selectedTheme?.theme || "",
    index: initialTemplateIndex,
  });
  const [selectedColorPalette, setSelectedColorPalette] = useState({
    colors: selectedTheme?.colorPalette,
    index: initialPaletteIndex,
  });

  //Handle Theme Change
  const handleThemeSelection=()=>{
    setSelectedTheme({
      colorPalette:selectedColorPalette?.colors,
      theme:selectedTemplate?.theme,
    });
    if (typeof onClose === 'function') onClose();
  };

  const updateBaseWidth=()=>{
    if(resumeRef.current){
      setBaseWidth(resumeRef.current.offsetWidth);
    }
  };

  useEffect(()=>{
    updateBaseWidth();
    window.addEventListener("resize",updateBaseWidth);
    return ()=>{
      window.removeEventListener("resize",updateBaseWidth);
    }
  },[])

  // Always show palettes for the selected template
  const palettesForSelectedTemplate = selectedTemplate.index !== -1
    ? themeColorPalette[resumeTemplates[selectedTemplate.index]?.colorPaletteCode] || []
    : [];

  return (
    <div className='w-full max-w-[1200px] mx-auto px-2 md:px-0 overflow-x-hidden'>
      <div className='flex items-center gap-6 mb-7 mt-4'>
        <button 
          className='bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow flex items-center gap-2 transition-all duration-200'
          onClick={handleThemeSelection}
        >
          <LuCircleCheckBig className='text-[18px]'/>Done
        </button>
        <div className='font-bold text-xl text-gray-800'>Theme Selector</div>
        <Tabs tabs={TAB_Data} activeTab={tabValue} setActiveTab={setTabValue}/>
      </div>

      <div className='flex flex-col md:flex-row gap-8 w-full overflow-x-hidden'>
        {/* Left: Selection Panel */}
        <div className='w-full md:max-w-xs md:w-96 bg-white rounded-xl shadow-lg pl-10 pr-6 py-6 h-[60vh] md:h-[80vh] overflow-y-auto custom-scrollbar flex-shrink-0 mb-6 md:mb-0'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-7'>
            {tabValue === "Templates" && resumeTemplates.map((template, idx) => (
              <div
                key={template.id}
                className={`relative border-2 rounded-xl p-3 cursor-pointer transition-all duration-200 flex flex-col items-center justify-center bg-gray-50 hover:scale-105 hover:shadow-xl ${selectedTemplate.index === idx ? 'border-blue-600 shadow-lg scale-105' : 'border-gray-200 hover:border-blue-400'}`}
                onClick={() => {
                  setSelectedTemplate({ theme: template.id, index: idx });
                  // Reset color palette selection when template changes
                  const palettes = themeColorPalette[template.colorPaletteCode] || [];
                  setSelectedColorPalette({ colors: palettes[0] || [], index: 0 });
                }}
              >
                <img src={template.thumbnailImg} alt={`Template ${template.id}`} className='w-full h-36 object-cover rounded-lg mb-3 shadow'/>
                <span className='text-sm font-semibold text-gray-700 mb-1'>Template {template.id}</span>
                {selectedTemplate.index === idx && (
                  <span className='absolute top-2 right-2 bg-blue-600 text-white rounded-full p-1 shadow'><LuCircleCheckBig className='text-lg'/></span>
                )}
              </div>
            ))}

            {tabValue === "Color Palettes" && (
              palettesForSelectedTemplate.length > 0 ? (
                palettesForSelectedTemplate.map((palette, idx) => (
                  <div
                    key={idx}
                    className={`relative border-2 rounded-xl p-3 cursor-pointer flex flex-col items-center transition-all duration-200 bg-gray-50 hover:scale-105 hover:shadow-xl ${selectedColorPalette.index === idx ? 'border-blue-600 shadow-lg scale-105' : 'border-gray-200 hover:border-blue-400'}`}
                    onClick={() => setSelectedColorPalette({ colors: palette, index: idx })}
                  >
                    <div className='flex gap-2 mb-3'>
                      {palette.map((color, cidx) => (
                        <span
                          key={cidx}
                          className={`w-7 h-7 rounded-full border-2 ${selectedColorPalette.index === idx ? 'border-blue-600 ring-2 ring-blue-200' : 'border-gray-300'}`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <span className='text-xs font-semibold text-gray-700'>Palette {idx + 1}</span>
                    {selectedColorPalette.index === idx && (
                      <span className='absolute top-2 right-2 bg-blue-600 text-white rounded-full p-1 shadow'><LuCircleCheckBig className='text-lg'/></span>
                    )}
                  </div>
                ))
              ) : (
                <div className='col-span-2 text-center text-gray-400 py-10'>
                  Please select a template first.
                </div>
              )
            )}
          </div>
        </div>
        {/* Divider */}
        <div className='w-full md:w-px bg-gray-200 mx-2 h-0 md:h-[80vh] hidden md:block'/>
        {/* Right: Resume Preview */}
        <div className='flex-1 flex items-center justify-center w-full overflow-x-hidden'>
          <div className='bg-white rounded-xl shadow-lg flex items-center justify-center w-full max-w-[800px] min-h-[400px]' ref={resumeRef}>
            {selectedTemplate.theme ? (
              <RenderResume
                templateId={selectedTemplate.theme}
                resumeData={resumeData || DUMMY_RESUME_DATA}
                colorPalette={selectedColorPalette.colors}
                containerWidth={800}
              />
            ) : (
              <div className='text-gray-400 text-center w-full'>Select a template to preview your resume</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThemeSelector
