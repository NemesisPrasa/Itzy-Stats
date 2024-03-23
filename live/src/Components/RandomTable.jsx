import React from 'react';
import YesterDayViews from './YesterDayViews';

const RandomTable = () => {
    const videoIds = ["VkIEfqHFNkU", "5e3rKInegeU", "1843Q679cvg", "HnXCezrJEdM", "z75GlxXEfZk", 
                      "OSRMoNKftyk", "4R7vRFGJr3k", "0bIRwBpBcZQ", "FcQ6oB1JPiA", "RmTq3cJqyCo", 
                      "zugAhfd2r0g", "6uZy86ePgO0", "Hbb5GPxXF1w", "9oyodEkzn94", "MjCZfZfucEc", 
                      "_ysomCGaZLw", "dnXyghQd2O8", "wTowEKjDGkU", "fE2h3lGlOsk", "zndvqTc4P9I", 
                      "pNfTK39k55U", "krzf1hkFAZA", "F-QTb-0wRGk", "yeHZNPplmm4", "K0xFPQ2CX5E",
                      "ytTlH0EpSqI", "5S1nsJs2O6s",
                       ];
  return (
    <div className="video-container">
                <table className="video-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Thumbnail</th>
                            <th>Title</th>
                            <th>Today Views Count</th>
                            <th>Views Count</th>
                            <th>Comment Count</th>
                            <th>Like Count</th>
                            <th>Released</th>
                        </tr>
                    </thead>
                    <tbody>
                        {videoIds.map((videoId, index) => (
                            <YesterDayViews key={videoId} index={index + 1} videoId={videoId} />
                        ))}
                    </tbody>
                </table>
    </div>
  )
}

export default RandomTable