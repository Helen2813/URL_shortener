import type { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode
}

export const Layout = ({children}: LayoutProps) => {
    return (
        <div className="bg-gray-800 p-[20px] max-w-[600px] rounded-[20px] shadow-[0_4px_20px_rgba(59,130,246,0.5)] p-5 flex flex-col items-center justify-center">
            {children}
        </div>
    )
}