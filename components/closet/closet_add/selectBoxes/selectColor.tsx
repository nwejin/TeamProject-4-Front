import { symlink } from 'fs';
import styles from '../../../../styles/closet/addform.module.scss';

export default function SelectColor() {
  const Color = [
    { Black: 'black' },
    { White: '#b2b2b2' },
    'Navy',
    'Ivory',
    'Gray',
    'LightGray',
    'Blue',
    'DarkGray',
    'SkyBlue',
    'Beige',
    'Green',
    'Other',
    'Brown',
    'LightPink',
    'Pink',
    'Khaki',
    'Mint',
    'Red',
    'Yellow',
    'Sand',
    'Orange',
    'DarkGreen',
    'Lavender',
    'Purple',
    'LightYellow',
    'LightGreen',
    'PalePink',
    'OliveGreen',
    'Burgundy',
    'Camel',
    'Denim',
    'DeepRed',
    'LightBlue',
    'KhakiBeige',
    'BlackBlue',
    'MiddleBlue',
    'Silver',
    'DeepBlue',
    'Gold',
    'RoseGold',
  ];

  interface Color {
    [key: string]: string;
  }

  const colorArr: Color[] = [
    { Black: '#000000' },
    { white: '#ffffff' },
    { LightGray: '#d3d3d3' },
    { Ivory: '#fffff0' },
    { Navy: '#000080' },
    { Gray: '#808080' },
    { Blue: '#0000ff' },
    { DarkGray: '#a9a9a9' },
    { SkyBlue: '#87ceeb' },
    { Beige: '#f5f5dc' },
    { Green: '#008000' },
    { Brown: '#a52a2a' },
    { LightPink: '#ffb6c1' },
    { Pink: '#ffc0cb' },
    { Khaki: '#f0e68c' },
    { Mint: '#98ff98' },
    { Red: '#ff0000' },
    { Yellow: '#ffff00' },
    { Sand: '#f4a460' },
    { Orange: '#ffa500' },
    { DarkGreen: '#006400' },
    { Lavender: '#e6e6fa' },
    { Purple: '#800080' },
    { LightYellow: '#ffffe0' },
    { LightGreen: '#90ee90' },
    { PalePink: '#fadadd' },
    { OliveGreen: '#556b2f' },
    { Burgundy: '#800020' },
    { Camel: '#c19a6b' },
    { Denim: '#1560bd' },
    { DeepRed: '#8b0000' },
    { LightBlue: '#add8e6' },
    { KhakiBeige: '#f0e68c' },
    { BlackBlue: '#00008b' },
    { MiddleBlue: '#7b68ee' },
    { Silver: '#c0c0c0' },
    { DeepBlue: '#0000cd' },
    { Gold: '#ffd700' },
    { RoseGold: '#b76e79' },
    { Other: '#ffffff' },
  ];

  console.log(Color.length);
  console.log(colorArr.length);

  return (
    <section className={styles.colorBox}>
      <div className={styles.innerColorBox}>
        {colorArr.map((color, index) => (
          <input
            key={index}
            type="button"
            name=""
            id=""
            style={{ backgroundColor: `${Object.values(color)[0]}` }}
          />
        ))}
      </div>
    </section>
  );
}
