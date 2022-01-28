import { useEffect, useState } from 'react';
import { METADATA_BASEURL } from '@/vars';

const useBaseURI = () => {
  const [baseURI, setBaseURI] = useState(METADATA_BASEURL);
};
