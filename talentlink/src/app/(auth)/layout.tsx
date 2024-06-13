
export default function AuthLayout({ children }: {
    children: React.ReactNode
}) {
    return (
        <div className="w-screen h-3/5 flex justify-center items-center">
            {children}
        </div>
    );
}