const Loading = () => {
    return (
        <div className="text-center mt-5">
            <div className="w-12 h-12 border-4 border-t-red-800 border-indigo-300 rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-indigo-600 text-lg">Loading...</p>
        </div>
    );
}

export default Loading;