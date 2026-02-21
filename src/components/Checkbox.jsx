import React from 'react';

const Checkbox = ({ checked, onChange, label, id }) => {
    return (
        <div className="inline-flex items-center gap-2">
            <input 
                type="checkbox" 
                id={id || label} 
                checked={checked}
                onChange={onChange}
                className="hidden" 
            />
            <label 
                htmlFor={id || label} 
                className="check cursor-pointer relative m-auto w-[18px] h-[18px] tap-highlight-transparent before:content-[''] before:absolute before:-top-[15px] before:-left-[15px] before:w-12 before:h-12 before:rounded-full before:bg-[rgba(34,50,84,0.03)] before:opacity-0 before:transition-opacity before:duration-200 hover:before:opacity-100"
            >
                <svg 
                    width="18px" 
                    height="18px" 
                    viewBox="0 0 18 18"
                    className="relative z-10 fill-none stroke-[#c8ccd4] stroke-[1.5] stroke-linecap-round stroke-linejoin-round transition-all duration-200"
                >
                    <path 
                        d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"
                    />
                    <polyline 
                        points="1 9 7 14 15 4"
                    />
                </svg>
            </label>
            {label && <span className="text-sm text-gray-700 font-medium">{label}</span>}
        </div>
    );
};

export default Checkbox;
