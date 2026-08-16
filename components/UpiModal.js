'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const UpiModal = ({ isOpen, onClose }) => {
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 260, damping: 20 },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: { duration: 0.2 },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
          onClick={onClose} // Close modal on overlay click
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="bg-white p-8 rounded-lg shadow-xl relative max-w-lg w-full text-center"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl font-bold">&times;</button>
            <h2 className="text-2xl font-bold mb-4">Scan to Pay with UPI</h2>
            <p className="text-gray-600 mb-6">Use your favorite UPI app to scan the QR code below.</p>
            <div className="relative w-[448px] h-[448px] mx-auto rounded-lg overflow-hidden p-2 shadow-lg">
              <Image src="/GooglePay_QR.png" alt="UPI QR Code" fill sizes="448px" style={{ objectFit: 'cover', transform: 'scale(1.1)' }} />
            </div>
            <p className="mt-6 text-sm text-gray-500">After payment, your order will be confirmed.</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UpiModal;