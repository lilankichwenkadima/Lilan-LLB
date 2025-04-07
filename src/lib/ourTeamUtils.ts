import config from '@/payload.config'
import { getPayload } from 'payload'

export async function fetchAllMembers() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { docs: teamMembers } = await payload.find({
    collection: 'team',
    depth: 2,
    limit: 1000,
  })

  return teamMembers.map((member) => ({
    id: member.id,
  }))
}

export async function fetchRelatedMembers(currentId: string) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { docs: teamMembers } = await payload.find({
    collection: 'team',
    depth: 1,
    limit: 3,
    where: {
      id: {
        not_equals: currentId,
      },
    },
  })

  return teamMembers
}
