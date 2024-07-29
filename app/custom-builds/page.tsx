// app/custom-builds/page.tsx

import { customParts } from '../data/customParts';
import CustomBuildsClient from '../components/CustomBuildsClient';

const HomePage = () => {
  return (
    <div>
      <CustomBuildsClient customParts={customParts} />
    </div>
  );
};

export default HomePage;
