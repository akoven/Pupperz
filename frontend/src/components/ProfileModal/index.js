import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ProfilePage from './ProfilePage';

const ProfileModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Your Profile</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ProfilePage />
        </Modal>
      )}
    </>
  );
}

export default ProfileModal;
