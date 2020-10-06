import React, { FC, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import { User } from '../user/User';
import { Contact } from '../contact/Contact';
import { Card } from '../card/Card';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      margin: '0px auto',
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }),
);

function getSteps() {
  return ['Sign Up Details', 'Contact Info', 'Contact Details'];
}

export const  SignUp: FC = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [ user, setUser ] = useState({ firstName: '', lastName: '', email: "", password: "", confirmPassword: ""})
  const [ info, setInfo ] = useState({ contact: "", career: "" })
  const [ payment, setPayment ] = useState({card: "", cvc: ""})
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // const handleReset = () => {
  //   setActiveStep(0);
  // };

  function getStepContent(stepIndex: number) {
    switch (stepIndex) {
      case 0:
        return <User user={user} setUser={setUser} steps={steps} activeStep={activeStep} handleNext={handleNext} handleBack={handleBack} />;
      case 1:
        return <Contact info={info} setInfo={setInfo} steps={steps} activeStep={activeStep} handleNext={handleNext} handleBack={handleBack} />;
      case 2:
        return <Card payment={payment} setPayment={setPayment} steps={steps} activeStep={activeStep} handleNext={handleNext} handleBack={handleBack} />;
      default:
        return 'Unknown stepIndex';
    }
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed - you&apos;re Registered now</Typography>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
