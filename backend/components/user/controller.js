const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

module.exports.postUser = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      ok: false,
      message: 'email and password are required'
    })
  }

  try {
    const elements = await prisma.users.create({
      data: {
        email: email,
        password: password
      }
    })

    res.status(201).json({
      ok: true,
      message: 'User created successfully',
      user: elements
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Something went wrong',
      error: error.message
    })
  }
}

module.exports.getUsers = async (req, res) => {
  try {
    const elements = await prisma.users.findMany()

    res.status(200).json({
      ok: true,
      message: 'Users retrieved',
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

module.exports.getUserID = async (req, res) => {
  const { id } = req.params

  try {
    const element = await prisma.users.findUnique({
      where: {
        id: parseInt(id)
      }
    })

    if (element) {
      res.status(200).json({
        ok: true,
        message: 'User retrieved',
        note: element
      })
    } else {
      res.status(404).json({
        ok: false,
        message: 'User not found'
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

module.exports.putUserID = async (req, res) => {
  const { id } = req.params
  const { email, password } = req.body


  if (!password || !email) {
    return res.status(400).json({
      ok: false,
      message: 'email and password are required'
    })
  }

  try {
    const element = await prisma.users.update({
      where: {
        id: parseInt(id)
      },
      data: {
        email: email,
        password: password
      }
    })

    if (element) {
      res.status(200).json({
        ok: true,
        message: 'User updated',
        note: element
      })
    } else {
      res.status(404).json({
        ok: false,
        message: 'User not found'
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

module.exports.deleteUserID = async (req, res) => {
  const { id } = req.params

  try {
    const element = await prisma.users.delete({
      where: {
        id: parseInt(id)
      }
    })

    if (element) {
      res.status(200).json({
        ok: true,
        message: 'User deleted',
        note: element
      })
    } else {
      res.status(404).json({
        ok: false,
        message: 'User not found'
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