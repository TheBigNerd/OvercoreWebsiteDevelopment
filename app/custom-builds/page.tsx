// app/custom-builds/page.tsx
import React from 'react';
import CustomPartsDisplay from '../components/CustomBuildsClient';
import Navbar from '../components/Navigation/Navbar';


const CustomBuildsPage: React.FC = () => {
  return (
    <div><Navbar></Navbar>
      <CustomPartsDisplay />
    </div>
  );
};

export default CustomBuildsPage;