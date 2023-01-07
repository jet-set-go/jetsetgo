import React, { useState, useEffect, createContext } from "react";
import PackingList from "../packinglist/PackingList";
const TripPage = () => {
  return (
    <div className='Details-Container'>
      <h1> Your trip</h1>
      <div className='packing-area'>
        <PackingList />
      </div>
    </div>
  );
};

export default TripPage;
