import config from '@/payload.config'
import { getPayload } from 'payload'

export async function fetchAllPracticeAreas() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { docs: practiceAreas } = await payload.find({
    collection: 'practice-areas',
    depth: 2,
    limit: 1000,
  })

  return practiceAreas.map((area) => ({
    slug: area.slug,
  }))
}

export async function fetchDepartments() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { docs: departments } = await payload.find({
    collection: 'departments',
    depth: 2,
    limit: 1000,
  })

  return departments.map((dep) => ({
    id: dep.id,
    slug: dep.slug,
    title: dep.title,
    description: dep.description,
  }))
}

export async function fetchRelatedPracticeAreas(currentSlug: string) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { docs: practiceAreas } = await payload.find({
    collection: 'practice-areas',
    depth: 1,
    limit: 30,
    where: {
      slug: {
        not_equals: currentSlug,
      },
    },
  })

  return practiceAreas
}
