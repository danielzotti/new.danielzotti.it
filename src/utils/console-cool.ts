export interface ConsoleCoolStyle {
  'font-size': string;
  'background-color': string;
  color: string;
  padding: string;
  'border-radius': string;
  'margin': string;
}

const defaultStyle = {
  'font-size': '15px',
  'background-color': 'black',
  'border-radius': '2px',
  color: 'yellow',
  // padding: '10px',
};

export const consoleCool = (text: string, style?: Partial<ConsoleCoolStyle>) => {
  console.log(
    `%c${text}`,
    Object.entries({
      ...defaultStyle,
      ...style
    })
      .map(([key, value]) => `${key}:${value}`)
      .join(';')
  );
};
