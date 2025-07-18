import React from "react";

const Modal=({children, isOpen,onClose,title,
    hideHeader,
    showActionBtn,
    actionBtnIcon=null,
    actionBtnText,
    onActionClick})=>{
        if(!isOpen) return null;
        
        return <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/40">
            {/*Modal Content*/}
            <div 
            className={`relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden max-w-[900px] w-full max-h-[90vh]`}
            >
                {/*Modal Header*/}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
                  {!hideHeader && (
                    <h3 className="md:text-lg font-medium text-gray-900 ">{title}</h3>
                  )}
                  <div className="flex items-center gap-2">
                    {showActionBtn && (
                      <button
                        className="btn-small-light mr-4"
                        onClick={()=>onActionClick()}
                      >
                        {actionBtnIcon}
                        {actionBtnText}
                      </button>
                    )}
                    <button
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
                      onClick={onClose}
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14 "
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                {/*Modal Body (Scrollable) */}
                <div className="flex-1 overflow-auto custom-scrollbar">
                  {children}
                </div>
                </div>
        </div>
    }

    export default Modal