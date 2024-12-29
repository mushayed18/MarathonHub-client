
const Loading = () => {
    return (
        <div className="min-h-[500px] flex items-center justify-center">
            <div className="flex">
                <h1>Loading...</h1>
                <span className="loading loading-spinner loading-sm text-sky-500"></span>
            </div>
        </div>
    );
};

export default Loading;