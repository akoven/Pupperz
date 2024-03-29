import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignUpForm from './SignUpForm';

const SignUpModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='nav-button' onClick={() => setShowModal(true)}>Sign Up!</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignUpForm />
        </Modal>
      )}
    </>
  );
}

export default SignUpModal;
