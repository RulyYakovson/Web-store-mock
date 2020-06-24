import React from 'react';
import {isEmpty} from 'lodash';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer} from 'recharts';
import Title from './Title';
import CircularProgress from "@material-ui/core/CircularProgress";

const ELEMENTS_LIMIT = 20;

const useStyles = makeStyles((theme) => ({
    progress: {
        color: '#3f51b5',
        position: 'absolute',
        top: '25%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    empty: {
        alignSelf: "center",
        top: '29%',
        position: "absolute",
        color: '#3f51b5'
    }
}));

const Chart = ({orders, isLoading}) => {
    const classes = useStyles();
    const theme = useTheme();

    const data = [];
    if (orders) {
        for (let i = 0; i <= ELEMENTS_LIMIT && i < orders.length; i++) {
            const order = orders[i];
            const today = new Date().toDateString();
            const {created} = order;
            const date = new Date(created);
            if (date.toDateString() === today) {
                const minuets = date.getMinutes();
                const time = `${date.getHours()}:${minuets < 10 ? '0' : ''}${minuets}`
                data.unshift({time, total: order.total})
            }
        }
    }

    return (
        <React.Fragment>
            <Title>Today</Title>
            {!isLoading && isEmpty(data) && <p className={classes.empty}>No sales today  &#9785;</p>}
            {isLoading && <CircularProgress size={36} className={classes.progress}/>}
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <XAxis dataKey="time" stroke={theme.palette.text.secondary}/>
                    <YAxis stroke={theme.palette.text.secondary}>
                        <Label
                            angle={270}
                            position="left"
                            style={{textAnchor: 'middle', fill: theme.palette.text.primary}}
                        >
                            Sales (&#8362;)
                        </Label>
                    </YAxis>
                    <Line dataKey="total" type="monotone" stroke={theme.palette.primary.main} dot={false}/>
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
};

export default Chart;
