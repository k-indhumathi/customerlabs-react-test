import React, { useState } from 'react';

const SCHEMA_LIST = [
  { label: "First Name", value: "first_name", type: "user" },
  { label: "Last Name", value: "last_name", type: "user" },
  { label: "Gender", value: "gender", type: "user" },
  { label: "Age", value: "age", type: "user" },
  { label: "Account Name", value: "account_name", type: "group" },
  { label: "City", value: "city", type: "group" },
  { label: "State", value: "state", type: "group" },
];

export default function Modal({ onClose, onSave }) {
  const [segmentName, setSegmentName] = useState("");
  const [schemas, setSchemas] = useState([]);
  const [selected, setSelected] = useState("");

  const addSchema = () => {
    if (!selected || schemas.includes(selected)) return;
    setSchemas(prev => [...prev, selected]);
    setSelected("");
  };

  const removeSchema = (val) => {
    setSchemas(prev => prev.filter(p => p !== val));
  };

  const changeSchema = (idx, newVal) => {
    const copy = [...schemas];
    copy[idx] = newVal;
    setSchemas(copy);
  };

  const availableOptions = (forIdx) => {
    return SCHEMA_LIST.filter(s => {
      if (schemas[forIdx] === s.value) return true;
      return !schemas.includes(s.value);
    });
  };

  const handleSave = async () => {
    const formatted = schemas.map(val => {
      const f = SCHEMA_LIST.find(s => s.value === val);
      return { [val]: f?.label || val };
    });

    const payload = {
      segment_name: segmentName || "untitled_segment",
      schema: formatted,
    };

    try {
      await fetch("https://webhook.site/8029be2f-d340-4dff-b737-aab685680e0c", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });


      alert("Segment created successfully!");


      onSave(payload);
    } catch (err) {
      console.error(err);
      alert("Error saving segment");
    }
  };



  return (
    <div className="fixed inset-0 flex justify-end bg-black bg-opacity-40 z-50">
      <div className="relative w-full max-w-md h-full bg-white shadow-xl flex flex-col">

        <div className="flex items-center justify-between px-6 py-4 bg-[#009688] text-white">
          <h2 className="text-lg font-medium">Saving Segment</h2>
          <button onClick={onClose} className="text-white text-2xl leading-none">&times;</button>
        </div>


        <div className="p-6 overflow-y-auto">
          <label className="block text-sm text-gray-700 mb-2 font-medium">
            Enter the Name of the Segment
          </label>
          <input
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
            placeholder="Name of the segment"
            className="w-full border border-gray-300 rounded px-3 py-2 mb-5 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />

          <p className="text-sm text-gray-600 mb-4">
            To save your segment, you need to add the schemas to build the query
          </p>

          <div className="flex items-center gap-6 mb-5 text-sm justify-end">
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-[#2fb86f]"></span>
              - User Traits
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-[#f25d7a]"></span>
              -  Group Traits
            </div>
          </div>


          {schemas.length > 0 && (
            <div className="border-[3px] border-[#bdeaf1] rounded-lg p-4">
              {schemas.map((s, idx) => {
                const info = SCHEMA_LIST.find(x => x.value === s);
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3 mb-3 border border-gray-200 rounded px-3 py-2"
                  >
                    <div
                      className={`w-3 h-3 rounded-full ${info?.type === "user" ? "bg-[#2fb86f]" : "bg-[#f25d7a]"
                        }`}
                    ></div>
                    <select
                      className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none"
                      value={s}
                      onChange={(e) => changeSchema(idx, e.target.value)}
                    >
                      {availableOptions(idx).map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() => removeSchema(s)}
                      className="text-gray-600 text-lg bg-[#f0fafa] px-3 py-1 hover:bg-[#f0fafa] hover:text-red-500 transition"
                    >
                      −
                    </button>
                  </div>
                );
              })}
            </div>
          )}


          <div className="flex items-center gap-3 mt-2">
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none"
            >
              <option value="">Add schema to segment</option>
              {SCHEMA_LIST.filter(s => !schemas.includes(s.value)).map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

          </div>

          <button
            onClick={addSchema}
            className="text-teal-600 font-semibold hover:underline"
          >
            + Add new schema
          </button>


          <div className="absolute bottom-0 left-0 right-0 bg-white border-t bg-gray-100 px-6 py-4 flex justify-start gap-3">
            <button
              onClick={handleSave}
              disabled={schemas.length === 0}
              className={`px-4 py-2 rounded text-white ${schemas.length === 0
                ? "bg-[#2fb86f]/60 cursor-not-allowed"
                : "bg-[#2fb86f] hover:bg-[#26a65b]"
                }`}
            >
              Save the Segment
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded text-red-600 bg-white "
            >
              Cancel
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}
