import './Loading.css';

export const Loading = ({ fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="loading-container">
      <div className="spinner"></div>
    </div>
  );
};
