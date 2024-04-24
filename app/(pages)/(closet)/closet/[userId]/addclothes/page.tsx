import styles from '../../../../../../styles/closet/closet.module.scss';
import AddForm from '../../../../../../components/closet/closet_add/addForm';

export default function AddClothes() {
  return (
    <div className={styles.container}>
      <AddForm></AddForm>
    </div>
  );
}
