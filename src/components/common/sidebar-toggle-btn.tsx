import React, { ReactEventHandler, MouseEventHandler } from "react";

interface OpenSidebarBtnProps {
  onClick: MouseEventHandler<HTMLButtonElement>; // Define the onClick type
}

const OpenSidebarBtn: React.FC<OpenSidebarBtnProps> = ({ onClick }) => {
  return (
    <div
      className="absolute left-2 top-2 z-40 hidden md:inline-block"
      data-projection-id="95"
      style={{ opacity: 1 }}
    >
      <span className="" data-state="closed">
        <button
          aria-label="Open sidebar"
                  className="flex min-h-[44px] transition-colors duration-200 dark:text-white cursor-pointer text-sm rounded-md border dark:border-white/20 gizmo:min-h-0 hover:bg-blue-900 hover:text-white h-11 gizmo:h-10 gizmo:rounded-lg gizmo:border-[rgba(0,0,0,0.1)] w-11 flex-shrink-0 items-center justify-center bg-white dark:bg-transparent"
          onClick={onClick}
        >
            <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon-sm"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="2"
                    ry="2"
                ></rect>
                <line x1="9" y1="3" x2="9" y2="21"></line>
            </svg>
        </button>
      </span>
    </div>
  );
};

export default OpenSidebarBtn;
