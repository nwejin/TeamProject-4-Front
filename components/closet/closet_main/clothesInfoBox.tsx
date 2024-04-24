import styles from '../../../styles/closet/closet.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { likedCloth } from '../../../service/closetApiService';
import { useEffect, useState } from 'react';

export default function ClothesInfoBox(data: any) {
  const { imagePath, id, productName, liked } = data.clothes;

  const [isLike, setIsLike] = useState(liked);

  // console.log(liked);

  // like 데이터 보내기

  const likeBtn = async () => {
    const likedData = { id: id, liked: liked };
    // console.log(likedData);
    const likeRes = await likedCloth(likedData);
    setIsLike(!isLike);
  };

  useEffect(() => {
    // console.log(isLike);
  }, [isLike]);

  return (
    <div className={styles.infoSmallBox}>
      <div>
        <Link href={`/clothes/${id}`} className={styles.title}>
          <span>{productName}</span>
        </Link>
        <button onClick={likeBtn}>
          <span
            className="material-symbols-outlined"
            style={isLike ? { color: '#ff5656' } : { color: '#d3d3d3' }}
          >
            favorite
          </span>
        </button>
      </div>
      <Link href={`/clothes/${id}`}>
        <img src={imagePath} alt="" />
      </Link>
    </div>
  );
}
