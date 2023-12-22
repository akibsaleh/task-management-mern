const LoadingUi = () => {
    return (
        <div className='flex flex-col h-full w-full justify-center items-center grow'>
            <progress className="progress w-1/2"></progress>
        </div>
    );
};

export default LoadingUi;