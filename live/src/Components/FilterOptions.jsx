import React, { useState } from 'react';
import RandomTable from './RandomTable';
import MostWatchedTable from './MostWatchedTable';
import MostLikedTable from './MostLikedTable';
import TodayMostWatched from './TodayMostWatched';


const FilterOptions = () => {

    
    const currentDate = new Date().toLocaleDateString();
    const [selectedFilter, setSelectedFilter] = useState('all');

    const handleFilterChange = (e) => {
        setSelectedFilter(e.target.value);
    };

    return (
        <div className='frontPage'>

            <div className='frontSecond'>
                <h1>ITZY Video Dashboard</h1>
                <div className="filter-options">
                    <label htmlFor="filter">Filter By:</label>
                    <select id="filter" value={selectedFilter} onChange={handleFilterChange}>
                        <option value="yesterday">Yesterday Views</option>
                        <option value="mostWatched">Most Watched</option>
                        <option value="mostLiked">Most Liked</option>
                        <option value="todayViews">Today's Views</option>
                        
                    </select>
                </div>

                <div>
                <p>{currentDate}</p>
                </div>
            </div>

            {selectedFilter === 'yesterday' && <RandomTable />}
            {selectedFilter === 'mostWatched' && <MostWatchedTable />}
            {selectedFilter === 'mostLiked' && <MostLikedTable />}
            {selectedFilter === 'todayViews' && <TodayMostWatched/>}  


            
        </div>

        

    );
};

export default FilterOptions;