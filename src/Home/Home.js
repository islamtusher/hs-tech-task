import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const Home = () => {
    const [allData, setAllData] = useState([])
    const [filterData, setFilterData] = useState([])
    useEffect(() => {
        fetch('fakeData.json')
        .then(res => res.json())
        .then(data => {
            setAllData(data)
        })
    }, [])

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        if (value.length === 0) {
            setFilterData([])
            return
        }

        const result = allData.filter((data) => data?.name?.toLowerCase().slice(0, value.length).indexOf(value) !== -1);
        setFilterData(result)
    }
    return (
        <div>
            <h1>Data Length {filterData?.length}</h1>
            <input
                onChange={(e) => handleSearch(e)}
                className='px-3 py-2'
                type="text" placeholder='Search Here'
            />
            <div className='row row-cols-4'>
            {   
                filterData?.map(data =>
                    <div key={data._id} className='border border-1'>
                        <h4>Name: <span className='text-info'>{data.name}</span></h4>
                    </div>
                    
                )
            }
            </div>
        </div>
    );
};

export default Home;