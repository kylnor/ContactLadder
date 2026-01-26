import { getAllModules } from '@/lib/modules/db-loader'
import { SearchModules } from '@/components/training/SearchModules'

export default async function SearchPage() {
  // Fetch modules on the server
  const allModules = await getAllModules()

  return <SearchModules allModules={allModules} />
}
