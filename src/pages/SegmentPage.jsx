import React, { useState } from 'react';
import Modal from '../components/Modal';

export default function SegmentPage(){
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white shadow rounded-lg p-8">
        <div className="bg-teal-600 text-white px-6 py-4 rounded mb-6" style={{backgroundColor: 'var(--teal)'}}>
          <h1 className="text-lg">View Audience</h1>
        </div>

        <div className="h-64 flex items-center justify-center border border-dashed rounded">
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
          >
            Save segment
          </button>
        </div>
      </div>

      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </div>
  )
}
