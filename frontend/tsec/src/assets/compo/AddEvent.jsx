import React, { useState } from 'react';
import axios from 'axios';

const AddEvent = () => {
    const [ogName, setOgName] = useState('');
    const [loc, setLoc] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [dur, setDur] = useState(''); // Duration value
    const [durUnit, setDurUnit] = useState('hours'); // Duration unit
    const [fund, setFund] = useState(0);
    const [vol, setVol] = useState(0);

    async function handleSubmit(ev) {
        ev.preventDefault();
        const eventData = {
            ogName,
            loc,
            date,
            time,
            dur: `${dur} ${durUnit}`,
            fund,
            vol
        };

        try {
            const response = await axios.post('http://localhost:3000/addEvent', eventData, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            console.log(response.data);
            alert('Uploaded successfully');
        } catch (err) {
            console.log('There was an error uploading!', err);
            alert("Couldn't upload");
        }
    }

    return (
        <div className='min-h-screen flex flex-col items-center gap-6 m-10 bg-gradient-to-r from-[#7b2cbf] to-[#ff9100]'>
            <h1 className='font-bold text-4xl text-white'>Add Event Here</h1>
            <div className='bg-white border border-gray-300 shadow-lg rounded-lg px-10 py-8'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
                    <div className='flex flex-col gap-4'>
                        <div className='flex items-center gap-4'>
                            <label className='font-bold text-xl text-[#7b2cbf]'>Organisation Name:</label>
                            <input
                                type="text"
                                value={ogName}
                                onChange={(e) => setOgName(e.target.value)}
                                className='flex-1 border border-gray-300 rounded-full px-4 py-2 focus:ring-[#ff9100] focus:border-[#ff9100]'
                            />
                        </div>
                        <div className='flex items-center gap-4'>
                            <label className='font-bold text-xl text-[#7b2cbf]'>Location:</label>
                            <input
                                type="text"
                                value={loc}
                                onChange={(e) => setLoc(e.target.value)}
                                className='flex-1 border border-gray-300 rounded-full px-4 py-2 focus:ring-[#ff9100] focus:border-[#ff9100]'
                            />
                        </div>
                        <div className='flex items-center gap-4'>
                            <label className='font-bold text-xl text-[#7b2cbf]'>Date:</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className='flex-1 border border-gray-300 rounded-full px-4 py-2 focus:ring-[#ff9100] focus:border-[#ff9100]'
                            />
                        </div>
                        <div className='flex items-center gap-4'>
                            <label className='font-bold text-xl text-[#7b2cbf]'>Time:</label>
                            <input
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className='flex-1 border border-gray-300 rounded-full px-4 py-2 focus:ring-[#ff9100] focus:border-[#ff9100]'
                            />
                        </div>
                        <div className='flex items-center gap-4'>
                            <label className='font-bold text-xl text-[#7b2cbf]'>Duration:</label>
                            <input
                                type="number"
                                min="1"
                                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:ring-[#ff9100] focus:border-[#ff9100]"
                                placeholder="Enter value"
                                value={dur}
                                onChange={(e) => setDur(e.target.value)}
                            />
                            <select
                                value={durUnit}
                                onChange={(e) => setDurUnit(e.target.value)}
                                className="flex-1 border border-gray-300 rounded-full px-2 py-1 focus:ring-[#ff9100] focus:border-[#ff9100]"
                            >
                                <option value="hours">Hours</option>
                                <option value="days">Days</option>
                            </select>
                        </div>
                        <div className='flex items-center gap-4'>
                            <label className='font-bold text-xl text-[#7b2cbf]'>Fund Collected:</label>
                            <input
                                type="number"
                                max="100000"
                                value={fund}
                                onChange={(e) => setFund(e.target.value)}
                                className='flex-1 border border-gray-300 rounded-full px-4 py-2 focus:ring-[#ff9100] focus:border-[#ff9100]'
                            />
                        </div>
                        <div className='flex items-center gap-4'>
                            <label className='font-bold text-xl text-[#7b2cbf]'>Volunteers Required:</label>
                            <input
                                type="number"
                                value={vol}
                                onChange={(e) => setVol(e.target.value)}
                                className='flex-1 border border-gray-300 rounded-full px-4 py-2 focus:ring-[#ff9100] focus:border-[#ff9100]'
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className='flex justify-center items-center gap-2 border text-white bg-[#7b2cbf] rounded-full px-6 py-3 shadow-md shadow-gray-300 hover:bg-[#ff9100] transition duration-300'
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddEvent;