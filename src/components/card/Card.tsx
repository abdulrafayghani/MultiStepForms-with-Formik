import { TextField, makeStyles, createStyles, Theme, Button } from '@material-ui/core'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { FC, Fragment } from 'react'
import * as Yup from 'yup'

interface InitialValues {
    card: string
    cvc: string
}

interface CardProps {  
    payment: InitialValues
    setPayment: (initialValues: InitialValues) => void
    handleNext: () => void
    handleBack: () => void
    steps: string[]
    activeStep: number
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textBox: {
        margin: '7px 0px'
    },
    button: {
        marginRight: theme.spacing(1),
    },
    error: {
        color: 'tomato',
        fontSize: '12px',
        paddingLeft: '5px'
    }
  }),
);

const validationSchema = Yup.object().shape<InitialValues>({
    card: Yup.string()
        .label('Card number')
        .max(16)
        .required(),
    cvc: Yup.string()
        .label('CVC')
        .min(3)
        .max(4)
        .required()
})

export const Card: FC<CardProps> = ({ payment, setPayment, steps, activeStep, handleNext, handleBack }) => {
    const initialValues: InitialValues = payment
    const classes = useStyles()

    return (
        <Fragment>
            <Formik 
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log(values)
                    setPayment(values) 
                    handleNext()
                }}
            >
                <div style={{width: '345px', maxWidth: '320px', margin: "0 auto", overflow: 'hidden' }}>
                <Form>
                <Field as={TextField} classes={{root: classes.textBox}} name='card' variant='outlined' label='Card Number' fullWidth />
                <ErrorMessage name='card' >
                    {(msg) => (<span className={classes.error} >{msg}</span>)}
                </ErrorMessage>
                <Field as={TextField} classes={{root: classes.textBox}}  name='cvc' variant='outlined' label='CVC' fullWidth />
                <ErrorMessage name='cvc' >
                    {(msg) => (<span className={classes.error}>{msg}</span>)}
                </ErrorMessage>   
                <br/>
                <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
                <Button type='submit' variant="contained" color="primary"  >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>                          
            </Form>
             </div>
            </Formik>
        </Fragment>
    )
}
