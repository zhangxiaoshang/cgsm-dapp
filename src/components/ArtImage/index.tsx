import { useState } from 'react';
import styles from './index.less';

const ArtImage: React.FC<{ metaURI: string }> = ({ metaURI }) => {
  if (!metaURI) return null;

  const [url, setUrl] = useState('');

  fetch(metaURI)
    .then((response) => response.json())
    .then((data) => {
      setUrl(data.image);
    })
    .catch((err) => {
      console.log(err);
    });

  return url ? <img src={url} className={styles.ArtImage}></img> : null;
};

export default ArtImage;
