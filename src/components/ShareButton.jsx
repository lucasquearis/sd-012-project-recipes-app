import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function ShareButton() {
  const [showMsg, setShowMsg] = useState(false);
  const { pathname } = useLocation();
  const local = `http://localhost:3000${pathname}`;

  const handleShare = () => {
    navigator.clipboard.writeText(local);
    setShowMsg(true);
  };

  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
        key={ shareIcon }
        onClick={ () => handleShare() }
      >
        <img src={ shareIcon } alt="share-icon" />
      </button>
      { showMsg ? <span>Link copiado!</span> : undefined }
    </div>
  );
}

export default ShareButton;