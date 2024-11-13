import { PetName } from '~/server/models/PetName'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { type, gender, personality, language } = body

  try {
    const names = await PetName.aggregate([
      { $match: { type, gender, personality, language } },
      { $sample: { size: 1 } }
    ])

    if (!names.length) {
      throw createError({
        statusCode: 404,
        message: 'No names found matching criteria'
      })
    }

    return names[0]
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Failed to generate name'
    })
  }
}) 