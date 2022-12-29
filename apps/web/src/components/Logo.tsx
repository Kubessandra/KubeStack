import Image from "next/image";

interface LogoProps {
  size: number;
}

export const Logo = (props: LogoProps) => {
  const { size } = props;
  return (
    <>
      <span className="sr-only">KubeStack</span>
      <Image height={size} width={size} src="/kubestack.png" alt="Logo" />
    </>
  );
};
