import { Request, Response, NextFunction } from 'express';

const adminCheck = (req: Request, res: Response, next: NextFunction) => {
    const {user} = req.body; 

    if (user && user.isAdmin) {
        return next(); 
    } else {
        return res.status(401).json({ message: 'Access denied. Admins only.' });
    }
};

const userCheck = (req: Request, res: Response, next: NextFunction) => {
    const {user} = req.body; 
    if (user && !user.isAdmin) {
        return next(); 
    } else {
        return res.status(401).json({ message: 'Access denied. Clients only.' });
    }
};

export { userCheck, adminCheck };
