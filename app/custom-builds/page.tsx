// app/custom-builds/page.tsx
import React from 'react';
import CustomPartsDisplay from '../components/CustomBuildsClient';


const CustomBuildsPage: React.FC = () => {
  return (
    <div>
      <h1>Custom Builds</h1>
      <CustomPartsDisplay />
    </div>
  );
};

export default CustomBuildsPage;