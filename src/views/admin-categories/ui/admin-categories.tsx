import { getCategoriesForAdmin } from '@/entities/post-category'
import { CategoryList } from '@/features/post-category-editor'

export const AdminCategoriesPage = async () => {
  const categories = await getCategoriesForAdmin()

  return (
    <div className="container animate-fade-in">
      <CategoryList categories={categories} />
    </div>
  )
}
