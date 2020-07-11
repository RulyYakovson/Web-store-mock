import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import CopyrightIcon from '@material-ui/icons/Copyright'

const Copyright = () => {
    const year = new Date().getFullYear();

    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright '}
            <CopyrightIcon/>
            <Link color="inherit" href="https://github.com/RulyYakovson/Web-store-mock">
                {' Ruly Yakovson'}
            </Link>
            {' & '}
            <Link color="inherit" href="https://github.com/WeissYizchak">
                {'Yitzhak Weiss'}
            </Link>{' '}
            {year}.
        </Typography>
    );
};

export default Copyright;