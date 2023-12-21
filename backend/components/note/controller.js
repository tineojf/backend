const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

module.exports.postNote = async (req, res) => {
  const { description, isArchive } = req.body

  if (!description || isArchive === undefined) {
    return res.status(400).json({
      ok: false,
      message: 'description and isArchive are required'
    })
  }

  try {
    const elements = await prisma.notes.create({
      data: {
        description: description,
        isArchive: isArchive
      }
    })

    res.status(201).json({
      ok: true,
      message: 'Note created successfully',
      note: elements
    })

  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Something went wrong',
      error: error.message
    })
  }
}

module.exports.getNotes = async (req, res) => {
  try {
    const elements = await prisma.notes.findMany()

    res.status(200).json({
      ok: true,
      message: 'All notes retrieved',
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

module.exports.getNoteID = async (req, res) => {
  const { id } = req.params

  try {
    const element = await prisma.notes.findUnique({
      where: {
        id: parseInt(id, 10)
      }
    })

    if (element) {
      res.status(200).json({
        ok: true,
        message: `Note with id ${id} retrieved`,
        note: element
      })
    } else {
      res.status(404).json({
        ok: false,
        message: `Note with id ${id} not found`
      })
    }

  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Something went wrong',
      error: error.message
    })
  }
}

module.exports.getNoteArchive = async (req, res) => {
  try {
    const elements = await prisma.notes.findMany({
      where: {
        isArchive: true
      }
    });

    if (elements.length === 0) {
      return res.status(200).json({
        ok: true,
        message: 'No se encontraron notas archivadas',
        notes: elements
      });
    }

    return res.status(200).json({
      ok: true,
      message: 'Todas las notas archivadas recuperadas',
      notes: elements
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Algo salió mal',
      error: error.message
    });
  }
};

module.exports.getNoteNotArchive = async (req, res) => {
  try {
    const elements = await prisma.notes.findMany({
      where: {
        isArchive: false
      }
    });

    if (elements.length === 0) {
      return res.status(404).json({
        ok: false,
        message: 'No se encontraron notas'
      });
    }

    res.status(200).json({
      ok: true,
      message: 'Todas las notas no archivadas recuperadas',
      notes: elements
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Algo salió mal',
      error: error.message
    });
  }
}


module.exports.putNoteID = async (req, res) => {
  const { id } = req.params
  const { description, isArchive } = req.body

  if (!description || isArchive === undefined) {
    return res.status(400).json({
      ok: false,
      message: 'description and isArchive are required'
    })
  }

  try {
    const element = await prisma.notes.update({
      where: {
        id: parseInt(id)
      },
      data: {
        description: description,
        isArchive: isArchive
      }
    })

    if (element) {
      res.status(200).json({
        ok: true,
        message: `Note with id ${id} updated`,
        note: element
      })
    } else {
      res.status(404).json({
        ok: false,
        message: `Note with id ${id} not found`
      })
    }

  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Something went wrong',
      error: error.message
    })
  }
}