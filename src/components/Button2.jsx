import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Button2 = ({
    text = "Learn More",
    onClick,
    to,
    className = "",
    icon: Icon,
    disabled = false,
    type = "button"
}) => {
    const content = (
        <button
            className={`group relative flex items-center min-w-[12rem] sm:min-w-[14rem] h-[3.2rem] cursor-pointer outline-none border-none bg-transparent p-0 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            <span
                className="absolute left-0 block w-[3.2rem] h-[3.2rem] bg-[#0F172A] rounded-full transition-all duration-[0.45s] cubic-bezier(0.65,0,0.076,1) group-hover:w-full group-hover:bg-emerald-500"
                aria-hidden="true"
            >
                <span className="absolute left-0 w-[3.2rem] h-[3.2rem] flex items-center justify-center transition-all duration-[0.45s]">
                    {Icon ? (
                        <span className="text-white group-hover:translate-x-1 transition-transform duration-[0.45s]">
                            <Icon size={18} />
                        </span>
                    ) : (
                        <span className="text-white group-hover:translate-x-1 transition-transform duration-[0.45s] flex items-center justify-center">
                            <ChevronRight size={20} strokeWidth={3} />
                        </span>
                    )}
                </span>
            </span>
            <span className="relative z-10 block w-full text-center pr-4 pl-[3.5rem] group-hover:pl-8 sm:group-hover:pl-12 text-[#0F172A] font-black uppercase text-[11px] tracking-wider group-hover:text-white transition-all duration-[0.45s] cubic-bezier(0.65,0,0.076,1)">
                {text}
            </span>
        </button>
    );

    if (to) {
        return (
            <Link to={to} className="inline-block no-underline">
                {content}
            </Link>
        );
    }

    return (
        <div className="inline-block">
            {content}
        </div>
    );
}

export default Button2;
