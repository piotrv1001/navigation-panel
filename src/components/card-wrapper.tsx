type CardWrapperProps = {
  children: React.ReactNode;
};

export default function CardWrapper({ children }: CardWrapperProps) {
  return <div className="p-3 rounded-md border bg-white">{children}</div>;
}
