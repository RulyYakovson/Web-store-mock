import React, {useEffect, useState} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import CheckIcon from '@material-ui/icons/Check';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PaymentIcon from '@material-ui/icons/Payment';
import SendIcon from '@material-ui/icons/Send';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import UserProductsListView from "./UserProductsListView";
import {Grid} from "@material-ui/core";
import {connect} from "react-redux";
import {fetchProducts} from "../../actions/productsActions";
import Payment from "./Payment";
import Delivery from "./Delivery";
import Copyright from "../Copyright";
import Box from "@material-ui/core/Box";
import Finish from "./Finish";

const finishStep = 2;

const ColorLibConnector = withStyles({
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

const useColorLibStepIconStyles = makeStyles({
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

const ColorLibStepIcon = (props) => {
    const classes = useColorLibStepIconStyles();
    const {active, completed} = props;

    const icons = {
        1: <ShoppingCartIcon/>,
        2: <SendIcon/>,
        3: <PaymentIcon/>,
        4: <CheckIcon/>
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

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    button: {
        marginRight: theme.spacing(1)
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    container: {
        padding: '10px 250px'
    },
    diveBase: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: '-5px -5px 5px 5px rgb(158, 158, 158)',
        position: 'relative',
        overflow: 'auto'
    },
    buttons: {
        padding: '25px 120px'
    },
    nextButton: {
        marginRight: theme.spacing(1)
    },
    finishButton: {
        background: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        marginRight: theme.spacing(1)
    },
    backButton: {
        marginLeft: theme.spacing(1)
    },
}));

const Cash = ({products, dispatch}) => {
    const classes = useStyles();
    const steps = ['Shopping cart', 'Delivery', 'Payment', 'Finish']

    const [totalPrice, setTotalPrice] = useState(0);
    const [activeStep, setActiveStep] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        activeStep === 2 && handleFinish();
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleFinish = () => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000)
    };

    const getDisplayPage = () => {
        switch (activeStep) {
            case 0:
                return <UserProductsListView products={products} setTotalPrice={setTotalPrice}/>;
            case 1:
                return <Payment/>;
            case 2:
                return <Delivery/>;
            case 3:
                return <Finish isLoading={isLoading}/>;
            default:
                break;
        }
        ;
    };

    return (
        <div className={classes.root}>
            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorLibConnector/>}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={ColorLibStepIcon}></StepLabel>
                    </Step>
                ))}
            </Stepper>

            <div style={{background: 'linear-gradient(to bottom, #fdfdfd 41%, #ebebeb 100%)'}}>
                <Grid className={classes.buttons} container direction="row" justify="space-between" alignItems="center">
                    <Grid item>
                        <Button
                            className={classes.backButton}
                            variant="contained"
                            color="primary"
                            hidden={activeStep < 1 || activeStep > finishStep}
                            onClick={handleBack}
                        >
                            &lt;&lt;&nbsp;Back
                        </Button>
                    </Grid>
                    <Grid item>
                        <Typography component="h5" variant="h5" color="primary" hidden={activeStep > finishStep}>
                            {totalPrice || 0}  &#8362;
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button
                            className={activeStep === finishStep ? classes.finishButton : classes.nextButton}
                            variant="contained"
                            color={"primary"}
                            hidden={activeStep > finishStep}
                            onClick={handleNext}
                        >
                            {activeStep === finishStep ? 'Finish' : 'Next'}&nbsp;&gt;&gt;
                        </Button>
                    </Grid>
                </Grid>

                <div className={classes.container}>
                    <div className={classes.diveBase}>
                        {getDisplayPage(activeStep)}
                    </div>
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
                <Box pt={4} style={{paddingBottom: '16px'}}>
                    <Copyright/>
                </Box>
            </div>
        </div>
    );
};

export default connect(store => ({
    products: store.products && store.products.products
}))(Cash);