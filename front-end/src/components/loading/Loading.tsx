function Loading({ label }: { label?: string }) {
    return (
        <div className="flex flex-col justify-center items-center gap-3">
            <h1 className="font-bold text-[30px] text-gray-second">{label ?? 'Loading...'}</h1>
            <div className="loader"></div>
        </div>
    )
}

export default Loading