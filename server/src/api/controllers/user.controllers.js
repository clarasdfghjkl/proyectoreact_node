const User = require("../models/user.model")

const addUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const createdUser = await newUser.save();
        return res.status(200).json({ message: "Usuario creado", data: createdUser })

    } catch (error) {
        console.log(error)
    }
}

const addExerciseToUser = async (req, res) => {
    const { idExercise, idUser } = req.params;
    console.log(idExercise, idUser)

    const modifyUser = await User.findByIdAndUpdate(
        idU,
        { $push: { product: idExercise } },
        { new: true })

    if (!modifyUser) {
        return res.json({ message: "Usuario  no encontrado" })
    } else {
        return res.json({ message: "Usuario modificado con éxito", data: modifyUser })
    }
}

const getUserById = async (req, res) => {
    const { id } = req.query;
    const user = await User.findById(id).populate("exercise")
    if (!user) {
        return res.json({ message: "usuario no existe" })
    } else {
        return res.json({ data: user })
    }
}

const deleteExerciseUser = async (req, res) => {
    const { idExercise, idUser } = req.query;
    //encontrar el usuario y modificarlo
    //$pull --> elimina del array
    const updatedUser = await User.findByIdAndUpdate(
        idUser,
        { $pull: { exercise: idExercise } }, // $pull permite eliminar un elemnto del array
        { new: true }
    )
    return res.json({ data: updatedUser })
    // buscar al usuario, sacar el elemento del array (filter, splice, slice), guardar los datos del usuario save()
}

module.exports = { addUser, addExerciseToUser, getUserById, deleteExerciseUser }