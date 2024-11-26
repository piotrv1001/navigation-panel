import { cn } from "@/lib/utils";

type CardWrapperProps = {
  className?: string;
  children: React.ReactNode;
};

export default function CardWrapper({ className, children }: CardWrapperProps) {
  return (
    <div className={cn("rounded-md border bg-white", className)}>
      {children}
    </div>
  );
}
