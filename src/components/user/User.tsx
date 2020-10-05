import React, { FC } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Button, makeStyles, createStyles, Theme } from "@material-ui/core";
import * as Yup from 'yup';
 
interface initialValue {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
}

interface UserProps {
    activeStep: number
    handleNext: () => void
    handleBack: () => void
    setUser: (initialValue: initialValue) => void
    user: initialValue
    steps: string[]
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textBox: {
        margin: '10px 0px'
    },
    button: {
        marginRight: theme.spacing(1),
    },
    error: {
        color: 'tomato',
        fontSize: '12px',
        paddingLeft: '5px'
    },
  }),
);

const validationSchema = Yup.object().shape<initialValue>({
    firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
    lastName: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .min(8, 'Must be at least 8 characters')
        .max(15, )
        .matches(/^.*[A-Z].*$/, 'At Least One Upper Case')
        .matches(/^.*[0-9].*$/, 'At Least One Number')
        .required('Rquired'),
    confirmPassword: Yup.string()
        .min(8, 'Must be at least 8 characters')
        .oneOf([Yup.ref('password')], 'Password must match')
        .required('Required')
})

export const User: FC<UserProps> = ({ user, setUser, steps, activeStep, handleNext, handleBack }) => {
    const initialValue: initialValue = user
    const classes = useStyles()
    
    return (
        <div>
            <Formik
                initialValues={initialValue}
                validationSchema={validationSchema}
                onSubmit={( values ) => {
                    console.log(values)
                    setUser(values)
                    handleNext()
                }
            }
            > 
            <div style={{width: '345px', maxWidth: '320px', margin: "0px auto", textAlign: 'left', overflow: 'hidden' }}>
            <Form>
                <Field as={TextField} name='firstName' variant='outlined' label='First Name' fullWidth />
                <ErrorMessage name='firstName' >
                    {(msg) => (<span className={classes.error} >{msg}</span>)}
                </ErrorMessage>
                <Field as={TextField} name='lastName' variant='outlined' label='Last Name' fullWidth />
                <ErrorMessage name='lastName' >
                    {(msg) => (<span className={classes.error}>{msg}</span>)}
                </ErrorMessage>
                <Field as={TextField} name='email' variant='outlined' label='Email' fullWidth />
                <ErrorMessage name='email' >
                    {(msg) => (<span className={classes.error}>{msg}</span>)}
                </ErrorMessage>
                <Field as={TextField} name='password' variant='outlined' label='Password' fullWidth  />
                <ErrorMessage name='password' >
                    {(msg) => (<span className={classes.error}>{msg}</span>)}
                </ErrorMessage>
                <Field as={TextField} name='confirmPassword' variant='outlined' label='Confirm Password' fullWidth />
                <ErrorMessage name='confirmPassword' >
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
                <Button type='submit' variant="contained" color="primary">
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
              
          </Form>  
            </div>
            </Formik>
        </div>
    )
}
