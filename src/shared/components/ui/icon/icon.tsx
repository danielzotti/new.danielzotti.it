interface IconProps {
  name: string;
}

export const Icon = ({ name }: IconProps) => {
  return <span className={'material-symbols-outlined'}>{name}</span>;
};
