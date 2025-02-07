const LoadingSpinner = () => {
  return (
    <div className="bg-surfaceColor-background h-[100vh] w-[100vw] absolute inset-0 flex items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
};

export default LoadingSpinner;
