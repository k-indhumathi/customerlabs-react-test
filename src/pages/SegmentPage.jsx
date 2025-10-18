import React, { useState } from "react";
import Modal from "../components/Modal";

export default function SegmentPage() {
  const [showModal, setShowModal] = useState(false);
  const [segments, setSegments] = useState([]);


  const handleSegmentSaved = (newSegment) => {
    setSegments((prev) => [...prev, newSegment]);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-4xl bg-white shadow rounded-lg p-8">

        <div
          className="text-white px-6 py-4 rounded mb-6"
          style={{ backgroundColor: "var(--teal, #009688)" }}
        >
          <h1 className="text-lg font-semibold">View Audience</h1>
        </div>


        {segments.length > 0 ? (
          <table className="w-full text-left border-collapse border border-gray-200">
            <thead className="bg-[#f9fefe]">
              <tr>
                <th className="border border-gray-200 px-4 py-2">Segment Name</th>
                <th className="border border-gray-200 px-4 py-2">Schemas</th>
              </tr>
            </thead>
            <tbody>
              {segments.map((seg, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2 font-medium text-gray-700">
                    {seg.segment_name}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-gray-600">
                    {seg.schema.map((s, i) => {
                      const key = Object.keys(s)[0];
                      return (
                        <span key={i}>
                          {s[key]}
                          {i < seg.schema.length - 1 ? ", " : ""}
                        </span>
                      );
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="h-64 flex items-center justify-center border border-dashed rounded text-gray-500">
            No segments yet — click below to create one.
          </div>
        )}

        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
          >
            Save segment
          </button>
        </div>
      </div>


      {showModal && <Modal onClose={() => setShowModal(false)} onSave={handleSegmentSaved} />}
    </div>
  );
}
