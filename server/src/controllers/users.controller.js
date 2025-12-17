import User from '../models/user.model.js';


export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: { $ne: 'admin' } });
        return res.status(200).json({users: users});
    } catch (error) {
        console.error("Users not found", error);
        return res.status(404).json({message: "Users not found"});
    }

}

export const getUser = async (req, res) => {
    try {
        const { user_id } = req.body;
        const user = User.findById({ user_id });
        
        if(user) return res.status(200).json({ user: user});
    } catch (error) {    
        console.error("Users not found", error);
        return res.status(404).json({message: "Users not found"});
    }
}
