module.exports.authEmployee = (req, res, next) => {
    if (isSessionExist(req) && isEmp(req.session.role)) {
        console.log(`Authentication for employee: '${req.session.username}' finish successfully`);
        req.userRole = req.session.role;
        next();
    }
    else {
        console.log('Failed to authenticate employee !!!');
        res.status(403);
        res.json({ status: 403 });
    }
};

module.exports.authUser = (req, res, next) => {
    if (isSessionExist(req)) {
        console.log(`Authentication for user: '${req.session.username}' finish successfully`);
        req.userRole = req.session.role;
        next();
    } else {
        console.log('Failed to authenticate user !!!');
        res.status(403);
        res.json({ status: 403 });
    }
};

const isSessionExist = req =>
    (req.session && req.session.userId);

const isEmp = role =>
    (role === 'Admin' || role === 'Employee');