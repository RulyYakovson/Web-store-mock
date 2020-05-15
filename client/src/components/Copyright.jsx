import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const Copyright = () => {
    const year = new Date().getFullYear();

    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/RulyYakovson/Web-store-mock">
                Ruli Yakovson
            </Link>
            {' & '}
            <Link color="inherit" href="https://github.com/WeissYizchak">
                Yitzhak Weiss
            </Link>{' '}
            {year}.
        </Typography>
    );
};

export default Copyright;