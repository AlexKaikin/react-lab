import { Breadcrumbs } from '@/widgets/breadcrumbs'

export const Home = () => {
  return (
    <div className="container">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }]} />
      <div>content</div>
    </div>
  )
}

export default Home
