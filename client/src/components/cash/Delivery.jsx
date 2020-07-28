import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import SendIcon from '@material-ui/icons/Send';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {isEmpty} from "lodash";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {FLOORS, MANDATORY_TITLE} from "../../utils/constants";
import {onPhoneChange} from "../../utils/onChangeHandler";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "#3f51b5",
        width: 50,
        height: 50
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(4),
    },
    formControl: {
        width: '100%',
    },
    select: {
        width: "min-content"
    }
}));

const Delivery = ({firstName, lastName, phone, street, city, floor, setFirstName,
                      setLastName, setPhone, setStreet, setCity, setFloor}) => {

    const classes = useStyles();
    const [phoneErrorMessage, setPhoneErrorMessage] = useState(MANDATORY_TITLE);

    return (
        <Container component="main">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <SendIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Delivery
                </Typography>
                <form className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName-delivery"
                                label="First Name"
                                autoFocus
                                value={firstName}
                                onChange={event => setFirstName(event.target.value)}
                                title={isEmpty(firstName) && MANDATORY_TITLE}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName-delivery"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                value={lastName}
                                onChange={event => setLastName(event.target.value)}
                                title={isEmpty(lastName) && MANDATORY_TITLE}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="street"
                                label="Street"
                                name="street"
                                autoComplete="street"
                                value={street}
                                onChange={event => setStreet(event.target.value)}
                                title={isEmpty(street) && MANDATORY_TITLE}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="city"
                                label="City"
                                id="city"
                                value={city}
                                onChange={event => setCity(event.target.value)}
                                title={isEmpty(city) && MANDATORY_TITLE}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="phone"
                                label="Phone"
                                type="phone"
                                id="phone-delivery"
                                autoComplete="phone"
                                value={phone}
                                onChange={event => onPhoneChange(event.target.value, setPhone, setPhoneErrorMessage)}
                                title={phoneErrorMessage}
                                error={phoneErrorMessage && phoneErrorMessage !== MANDATORY_TITLE}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="floor-select-outlined-label">Floor</InputLabel>
                                <Select
                                    labelId="select-floor-label"
                                    id="floor-select"
                                    value={floor}
                                    onChange={event => setFloor(event.target.value)}
                                    label="Floor"
                                    autoWidth
                                >
                                    {
                                        FLOORS.map(f =>
                                            <MenuItem value={f}>{f}</MenuItem>
                                        )
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default Delivery;