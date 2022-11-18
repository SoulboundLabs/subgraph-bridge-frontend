interface Props {
  title: string;
  description?: string;
  href?: string;
  cta?: string;
}

export const TitleDescription = ({ title, description, href, cta }: Props) => {
  return (
    <div className="text-left">
      <div className="text-3xl font-semibold text-white">{title}</div>
      <div className="mt-3 text-gray-300 text-2xl">{description}</div>
    </div>
  );
};
