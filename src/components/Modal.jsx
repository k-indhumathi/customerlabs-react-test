import React, { useState } from 'react';
import axios from 'axios';

const SCHEMA_LIST = [
  { label: "First Name", value: "first_name", type: "user" },
  { label: "Last Name", value: "last_name", type: "user" },
  { label: "Gender", value: "gender", type: "user" },
  { label: "Age", value: "age", type: "user" },
  { label: "Account Name", value: "account_name", type: "group" },
  { label: "City", value: "city", type: "group" },
  { label: "State", value: "state", type: "group" },
];

export default function Modal({ onClose }){
  const [segmentName, setSegmentName] = useState("");
  const [schemas, setSchemas] = useState([]); // array of values
  const [selected, setSelected] = useState("");

  const addSchema = () => {
    if(!selected) return;
    if(schemas.includes(selected)) return;
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
    // available are those not included, except the current at forIdx
    return SCHEMA_LIST.filter(s => {
      if(schemas[forIdx] === s.value) return true;
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
    schema: formatted
  };

  try {
    await fetch("https://webhook.site/8029be2f-d340-4dff-b737-aab685680e0c", {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    alert("Segment saved (check webhook.site for data)!");
    onClose();
  } catch (err) {
    console.error(err);
    alert("Error sending data");
  }
};


  return (
    <div className="fixed inset-0 flex items-center justify-end bg-black bg-opacity-40 z-50">
      <div className="w-full max-w-md h-full bg-white shadow-lg overflow-auto">
        <div className="px-6 py-4" style={{backgroundColor: 'var(--teal)'}}>
          <h2 className="text-white text-lg">Saving Segment</h2>
        </div>

        <div className="p-6">
          <label className="block text-sm text-gray-600 mb-2">Enter the Name of the Segment</label>
          <input
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
            placeholder="Name of the segment"
            className="w-full border rounded px-3 py-2 mb-4"
          />

          <p className="text-xs text-gray-500 mb-4">
            To save your segment, you need to add the schemas to build the query
          </p>

          <div className="flex items-center gap-4 text-sm mb-4">
            <div className="flex items-center gap-2"><span className="inline-block w-3 h-3 rounded-full" style={{backgroundColor: '#2fb86f'}}></span> User Traits</div>
            <div className="flex items-center gap-2"><span className="inline-block w-3 h-3 rounded-full" style={{backgroundColor: '#f25d7a'}}></span> Group Traits</div>
          </div>

          <div className="border rounded p-4 bg-white" style={{borderColor:'#bdeaf1', backgroundColor: 'var(--blue-box)'}}>
            {schemas.length === 0 && <div className="text-gray-500 text-sm">No schemas added yet</div>}
            {schemas.map((s, idx) => {
              const info = SCHEMA_LIST.find(x=>x.value===s);
              return (
                <div key={idx} className="flex items-center gap-3 mb-3">
                  <select
                    className="flex-1 border rounded px-3 py-2"
                    value={s}
                    onChange={(e)=>changeSchema(idx, e.target.value)}
                  >
                    {availableOptions(idx).map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>

                  <button
                    onClick={()=>removeSchema(s)}
                    className="px-3 py-2 border rounded"
                  >
                    −
                  </button>
                </div>
              )
            })}
          </div>

          <div className="mt-4 flex items-center gap-3">
            <select
              value={selected}
              onChange={(e)=>setSelected(e.target.value)}
              className="flex-1 border rounded px-3 py-2"
            >
              <option value="">Add schema to segment</option>
              {SCHEMA_LIST.filter(s=>!schemas.includes(s.value)).map(opt=>(
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            <button onClick={addSchema} className="text-teal-600 font-medium">+ Add new schema</button>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 rounded" style={{backgroundColor:'#ffd6de'}}>Cancel</button>
            <button
              onClick={handleSave}
              disabled={schemas.length===0}
              className="px-4 py-2 rounded text-white"
              style={{backgroundColor:'#2fb86f', opacity: schemas.length===0 ? 0.6 : 1}}
            >
              Save the Segment
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
