/* eslint-disable react/jsx-no-target-blank */
import React from 'react';

function InfoBlock() {
  return (
    <header>
      <h2>ECG Elo Project</h2>
      <p>Shamelessly inspired by <a href='http://www.mtgeloproject.net/leaders.php' target="_blank" rel="noopener noreferer">MTG Elo Project</a>, but for Epic Card Game. 
        Ratings start at <a href ='https://en.wikipedia.org/wiki/Elo_rating_system' target="_blank" rel="noopener noreferer">1600 and the k-value is set (for now) at 36.</a> As more matches are played the k-value will adjust for those who have played more matches. 
        Current dataset is all Monthly Tournaments since the start of public release. I'm still trying to figure out the best way to add private beta tournaments.</p>
      <p><span style={{color: '#2f5e70', fontStyle: 'italic'}}>Click on player records to show their tournament history.</span></p>
    </header>
  );
}

export default InfoBlock;
