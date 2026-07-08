import { icons, type LucideProps } from 'lucide-react'

export type IconName = keyof typeof icons

export const Icon: React.FC<{ name: IconName } & LucideProps> = ({ name, ...rest }) => {
  const Component = icons[name]
  return <Component {...rest} />
}
