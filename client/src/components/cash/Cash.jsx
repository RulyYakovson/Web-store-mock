import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import UserProductsListView from "./UserProductsListView";
import {Grid} from "@material-ui/core";
import {connect} from "react-redux";
import {fetchProducts} from "../../actions/productsActions";

const QontoConnector = withStyles({
    alternativeLabel: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    active: {
        '& $line': {
            borderColor: '#784af4',
        },
    },
    completed: {
        '& $line': {
            borderColor: '#784af4',
        },
    },
    line: {
        borderColor: '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
    root: {
        color: '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
    },
    active: {
        color: '#784af4',
    },
    circle: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
    },
    completed: {
        color: '#784af4',
        zIndex: 1,
        fontSize: 18,
    },
});

function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const {active, completed} = props;

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
            })}
        >
            {completed ? <Check className={classes.completed}/> : <div className={classes.circle}/>}
        </div>
    );
}

QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
    alternativeLabel: {
        top: 22,
    },
    active: {
        '& $line': {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    completed: {
        '& $line': {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
    },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
    root: {
        backgroundColor: '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    },
});

function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const {active, completed} = props;

    const icons = {
        1: <SettingsIcon/>,
        2: <GroupAddIcon/>,
        3: <VideoLabelIcon/>,
    };

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}
        >
            {icons[String(props.icon)]}
        </div>
    );
}

ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    container: {
        padding: '10px 250px',
    },
    buttons: {
        padding: '25px 120px',
    },
    nextButton: {
        marginRight: theme.spacing(1),
    },
    backButton: {
        marginLeft: theme.spacing(1),
    },
}));

function getSteps() {
    return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return 'Select campaign settings...';
        case 1:
            return 'What is an ad group anyways?';
        case 2:
            return 'This is the bit I really care about!';
        default:
            return 'Unknown step';
    }
}

const Cash = ({products, dispatch}) => {
    const classes = useStyles();

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    const [activeStep, setActiveStep] = useState(1);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector/>}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <div style={{background: 'linear-gradient(to bottom, #fdfdfd 41%, #ebebeb 100%)'}}>
                <Grid className={classes.buttons} container direction="row" justify="space-between" alignItems="center">
                    <Grid item>
                        <Button /*onClick={backStep}*/ variant="contained" color="primary"
                                                       className={classes.backButton}>
                            &lt;&lt;&nbsp;Back
                        </Button>
                    </Grid>
                    <Grid item>
                        <Typography component="h5" variant="h5" color="primary">
                            {totalPrice}  &#8362;
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button /*onClick={buy}*/ variant="contained" color="primary" className={classes.nextButton}>
                            Next&nbsp;&gt;&gt;
                        </Button>
                    </Grid>
                </Grid>

                <div className={classes.container}>
                    <UserProductsListView products={products} setTotalPrice={setTotalPrice}/>
                </div>
                <div>
                    {/*{activeStep === steps.length ? (*/}
                    {/*    <div>*/}
                    {/*        <Typography className={classes.instructions}>*/}
                    {/*            All steps completed - you&apos;re finished*/}
                    {/*        </Typography>*/}
                    {/*        <Button onClick={handleReset} className={classes.button}>*/}
                    {/*            Reset*/}
                    {/*        </Button>*/}
                    {/*    </div>*/}
                    {/*) : (*/}
                    {/*    <div>*/}
                    {/*        <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>*/}
                    {/*        <div>*/}
                    {/*            <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>*/}
                    {/*                Back*/}
                    {/*            </Button>*/}
                    {/*            <Button*/}
                    {/*                variant="contained"*/}
                    {/*                color="primary"*/}
                    {/*                onClick={handleNext}*/}
                    {/*                className={classes.button}*/}
                    {/*            >*/}
                    {/*                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}*/}
                    {/*            </Button>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*)}*/}
                </div>
            </div>
        </div>
    );
};

export default connect(store => ({
    products: store.products && store.products.products
}))(Cash);