const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

module.exports.postNotes = async (
  req, res
) => {
  const { description, isArchive } = req.body
  try {
    const element = await prisma.notes.create({
      data: {
        description: description,
        isArchive: isArchive
      }
    })
    res.status(201).json({
      ok: true,
      message: 'Note created successfully',
      note: element
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Something went wrong',
      error: error.message
    })
  }
}

module.exports.getNotes = async (
  req, res
) => {
  try {
    const elements = await prisma.notes.findMany()

    res.status(200).json({
      ok: true,
      message: 'Notes retrieved successfully',
      notes: elements
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Something went wrong',
      error: error.message
    })
  }
}
