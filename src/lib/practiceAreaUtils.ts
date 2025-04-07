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
    id: area.id,
  }))
}

export async function fetchRelatedPracticeAreas(currentId: string) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { docs: practiceAreas } = await payload.find({
    collection: 'practice-areas',
    depth: 1,
    limit: 3,
    where: {
      id: {
        not_equals: currentId,
      },
    },
  })

  return practiceAreas
}
